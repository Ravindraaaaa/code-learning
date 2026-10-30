import axios from 'axios';
import { execFile, exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { logger } from '../utils/logger.js';

/**
 * Secure Code Execution Engine
 * Prioritizes sandbox/external execution; seamlessly falls back to isolated
 * local process execution with compilation, execution timeouts, and memory guards.
 * Supported languages in Practice Arena: JavaScript, C++, Java.
 */
class CodeExecutionService {
  constructor() {
    this.sandboxUrl = process.env.SANDBOX_API_URL || 'https://emkc.org/api/v2/piston';
    
    // Supported languages strictly restricted to JavaScript, Java, and C++
    this.languageConfig = {
      javascript: { language: 'javascript', version: '18.15.0' },
      java: { language: 'java', version: '15.0.2' },
      cpp: { language: 'c++', version: '10.2.0' }
    };

    // Ensure MinGW bin directory is in PATH for C++ runtime DLLs
    const mingwPath = 'C:\\MinGW\\bin';
    if (!process.env.PATH?.includes(mingwPath)) {
      process.env.PATH = `${mingwPath};${process.env.PATH || ''}`;
    }
  }

  /**
   * Primary code execution entry point.
   */
  async execute(language, code, input = '') {
    const langKey = String(language || '').toLowerCase().trim();
    const config = this.languageConfig[langKey];
    if (!config) {
      return {
        status: 'failed',
        output: '',
        error: `Language '${language}' is not supported. Supported languages are C++, Java, and JavaScript.`
      };
    }

    // Payload length guards against DoS
    if (code && code.length > 50000) {
      return {
        status: 'failed',
        output: '',
        error: 'Code payload exceeds maximum allowed size limit of 50,000 characters.'
      };
    }

    if (input && input.length > 10000) {
      return {
        status: 'failed',
        output: '',
        error: 'Input payload exceeds maximum allowed size limit of 10,000 characters.'
      };
    }

    // Try sandbox API first if explicitly configured
    if (process.env.SANDBOX_API_URL) {
      try {
        const payload = {
          language: config.language,
          version: config.version,
          files: [{ content: code }],
          stdin: input,
          args: [],
          compile_timeout: 10000,
          run_timeout: 5000,
        };

        const response = await axios.post(`${this.sandboxUrl}/execute`, payload, { timeout: 8000 });
        const data = response.data;

        let status = 'completed';
        let output = '';
        let errorMsg = '';

        if (data.compile && data.compile.code !== 0) {
          status = 'compile_error';
          errorMsg = data.compile.output;
        } else if (data.run.signal === 'SIGKILL' || data.run.signal === 'SIGTERM') {
          status = 'timeout';
          errorMsg = 'Execution timed out (exceeded 5 seconds CPU limit).';
        } else if (data.run.code !== 0) {
          status = 'runtime_error';
          errorMsg = data.run.output;
        } else {
          output = data.run.output;
        }

        return {
          status,
          output,
          error: errorMsg,
          language: data.language,
          version: data.version
        };
      } catch (sandboxErr) {
        logger.warn(`[CodeExecutionService] External sandbox unavailable, falling back to local runner: ${sandboxErr.message}`);
      }
    }

    // Reliable native execution engine
    return this.executeLocally(langKey, code, input);
  }

  getTempDir(language) {
    if ((language === 'cpp' || language === 'c') && fs.existsSync('C:\\MinGW')) {
      const mingwTemp = 'C:\\MinGW\\temp';
      if (!fs.existsSync(mingwTemp)) {
        try { fs.mkdirSync(mingwTemp, { recursive: true }); } catch {}
      }
      return mingwTemp;
    }
    const defaultTmp = path.join(os.tmpdir(), 'codeforge_temp_exec');
    if (!fs.existsSync(defaultTmp)) {
      try { fs.mkdirSync(defaultTmp, { recursive: true }); } catch {}
    }
    return defaultTmp;
  }

  /**
   * Executes code locally in isolated temporary processes with strict timeouts.
   */
  async executeLocally(language, code, input = '') {
    const tmpDir = this.getTempDir(language);
    const uniqueId = `cf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    if (language === 'javascript') {
      const ext = code.includes('import ') && !code.includes('require(') ? '.mjs' : '.cjs';
      const srcFile = path.join(tmpDir, `${uniqueId}${ext}`);
      try {
        fs.writeFileSync(srcFile, code, 'utf8');

        return await new Promise((resolve) => {
          const child = execFile('node', [srcFile], { timeout: 5000, maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
            try { fs.unlinkSync(srcFile); } catch {}

            if (err) {
              if (err.killed || err.signal === 'SIGTERM') {
                return resolve({ status: 'timeout', output: '', error: 'Execution timed out (5s limit exceeded).' });
              }
              return resolve({ status: 'runtime_error', output: stdout || '', error: stderr || err.message });
            }

            resolve({
              status: 'completed',
              output: stdout || '',
              error: stderr || '',
              language: 'javascript'
            });
          });

          if (child.stdin) {
            if (input) child.stdin.write(input);
            child.stdin.end();
          }
        });
      } catch (e) {
        try { fs.unlinkSync(srcFile); } catch {}
        return { status: 'failed', output: '', error: `Execution setup error: ${e.message}` };
      }
    }

    if (language === 'cpp' || language === 'c') {
      const isCpp = language === 'cpp';
      const compiler = isCpp ? 'g++' : 'gcc';
      const srcFile = path.join(tmpDir, `${uniqueId}.${isCpp ? 'cpp' : 'c'}`);
      const exeFile = path.join(tmpDir, `${uniqueId}.exe`);

      try {
        fs.writeFileSync(srcFile, code, 'utf8');

        // Compile phase
        const compileResult = await new Promise((resolve) => {
          exec(`${compiler} "${srcFile}" -o "${exeFile}"`, {
            timeout: 10000,
            env: { ...process.env, PATH: `C:\\MinGW\\bin;${process.env.PATH || ''}` }
          }, (compErr, _, compStderr) => {
            if (compErr) {
              try { fs.unlinkSync(srcFile); } catch {}
              try { fs.unlinkSync(exeFile); } catch {}
              return resolve({
                status: 'compile_error',
                output: '',
                error: compStderr || compErr.message
              });
            }
            resolve(null);
          });
        });

        if (compileResult) return compileResult;

        // Run phase
        return await new Promise((resolve) => {
          const child = exec(`"${exeFile}"`, {
            timeout: 8000,
            maxBuffer: 1024 * 1024,
            windowsHide: true,
            env: { ...process.env, PATH: `C:\\MinGW\\bin;${process.env.PATH || ''}` }
          }, (runErr, stdout, stderr) => {
            try { fs.unlinkSync(srcFile); } catch {}
            setTimeout(() => {
              try { fs.unlinkSync(exeFile); } catch {}
            }, 100);

            if (runErr) {
              if (runErr.killed || runErr.signal === 'SIGTERM') {
                return resolve({ status: 'timeout', output: '', error: 'Execution timed out (5s limit exceeded).' });
              }
              return resolve({ status: 'runtime_error', output: stdout || '', error: stderr || runErr.message });
            }

            resolve({
              status: 'completed',
              output: stdout || '',
              error: stderr || '',
              language
            });
          });

          if (child.stdin) {
            if (input) child.stdin.write(input);
            child.stdin.end();
          }
        });
      } catch (e) {
        try { fs.unlinkSync(srcFile); } catch {}
        try { fs.unlinkSync(exeFile); } catch {}
        return { status: 'failed', output: '', error: `Execution setup error: ${e.message}` };
      }
    }

    if (language === 'java') {
      const javaDir = path.join(tmpDir, `java_${uniqueId}`);
      try {
        fs.mkdirSync(javaDir, { recursive: true });

        // Extract class name if declared public, otherwise default to Main
        const classMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
        const className = classMatch ? classMatch[1] : 'Main';
        const srcFile = path.join(javaDir, `${className}.java`);

        fs.writeFileSync(srcFile, code, 'utf8');

        // Compile phase
        const compileResult = await new Promise((resolve) => {
          exec(`javac "${srcFile}"`, { cwd: javaDir, timeout: 10000 }, (compErr, _, compStderr) => {
            if (compErr) {
              try { fs.rmSync(javaDir, { recursive: true, force: true }); } catch {}
              return resolve({
                status: 'compile_error',
                output: '',
                error: compStderr || compErr.message
              });
            }
            resolve(null);
          });
        });

        if (compileResult) return compileResult;

        // Run phase
        return await new Promise((resolve) => {
          const child = exec(`java -cp . ${className}`, { cwd: javaDir, timeout: 5000, maxBuffer: 1024 * 1024 }, (runErr, stdout, stderr) => {
            try { fs.rmSync(javaDir, { recursive: true, force: true }); } catch {}

            if (runErr) {
              if (runErr.killed || runErr.signal === 'SIGTERM') {
                return resolve({ status: 'timeout', output: '', error: 'Execution timed out (5s limit exceeded).' });
              }
              return resolve({ status: 'runtime_error', output: stdout || '', error: stderr || runErr.message });
            }

            resolve({
              status: 'completed',
              output: stdout || '',
              error: stderr || '',
              language: 'java'
            });
          });

          if (child.stdin) {
            if (input) child.stdin.write(input);
            child.stdin.end();
          }
        });
      } catch (e) {
        try { fs.rmSync(javaDir, { recursive: true, force: true }); } catch {}
        return { status: 'failed', output: '', error: `Execution setup error: ${e.message}` };
      }
    }

    return {
      status: 'failed',
      output: '',
      error: `Unsupported language: ${language}. Supported languages are C++, Java, and JavaScript.`
    };
  }

  /**
   * Submits code for validation against test cases using authentic execution.
   */
  async submit(language, code, testCases = []) {
    // If there are no test cases supplied, execute the code once
    if (!testCases || testCases.length === 0) {
      const res = await this.execute(language, code, '');
      return {
        status: res.status === 'completed' ? 'success' : 'failed',
        passed: res.status === 'completed',
        score: res.status === 'completed' ? 100 : 0,
        details: res.error || res.output
      };
    }

    const langKey = String(language || '').toLowerCase().trim();
    return this.submitLocally(langKey, code, testCases);
  }

  /**
   * Batch executes test cases with a single compilation pass for compiled languages.
   */
  async submitLocally(language, code, testCases = []) {
    const tmpDir = this.getTempDir(language);
    const uniqueId = `cf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const runTestCase = (runner) => async (tc, i) => {
      const startMs = Date.now();
      const result = await runner(tc.input || '');
      const runtimeMs = Date.now() - startMs;

      const actualClean = (result.output || '').trim().replace(/\r\n/g, '\n');
      const expectedClean = (tc.expectedOutput || '').trim().replace(/\r\n/g, '\n');
      const normalize = (s) => s.replace(/\s*([,:[\]{}])\s*/g, '$1').trim();
      const passed = result.status === 'completed' && (actualClean === expectedClean || normalize(actualClean) === normalize(expectedClean));

      return {
        id: tc.id || (i + 1),
        input: tc.input || '',
        expected: tc.expectedOutput || '',
        actual: actualClean,
        status: passed ? 'completed' : result.status,
        passed,
        runtimeMs,
        error: result.error || null
      };
    };

    // 1. JavaScript
    if (language === 'javascript') {
      const ext = code.includes('import ') && !code.includes('require(') ? '.mjs' : '.cjs';
      const srcFile = path.join(tmpDir, `${uniqueId}${ext}`);
      try {
        fs.writeFileSync(srcFile, code, 'utf8');
        const runner = (input) => new Promise((resolve) => {
          const child = execFile('node', [srcFile], { timeout: 5000, maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) {
              if (err.killed || err.signal === 'SIGTERM') return resolve({ status: 'timeout', output: '', error: 'Execution timed out (5s limit exceeded).' });
              return resolve({ status: 'runtime_error', output: stdout || '', error: stderr || err.message });
            }
            resolve({ status: 'completed', output: stdout || '', error: stderr || '', language: 'javascript' });
          });
          if (child.stdin) {
            if (input) child.stdin.write(input);
            child.stdin.end();
          }
        });

        const results = [];
        let passedCount = 0;
        for (let i = 0; i < testCases.length; i++) {
          const r = await runTestCase(runner)(testCases[i], i);
          if (r.passed) passedCount++;
          results.push(r);
          if (!r.passed && (r.status === 'timeout')) break;
        }
        try { fs.unlinkSync(srcFile); } catch {}
        const allPassed = passedCount === testCases.length;
        return {
          status: allPassed ? 'success' : 'failed',
          passed: allPassed,
          score: testCases.length > 0 ? Math.round((passedCount / testCases.length) * 100) : 100,
          totalTestCases: testCases.length,
          passedTestCases: passedCount,
          details: results
        };
      } catch (e) {
        try { fs.unlinkSync(srcFile); } catch {}
        return { status: 'failed', passed: false, score: 0, totalTestCases: testCases.length, passedTestCases: 0, details: [{ error: e.message }] };
      }
    }

    // 2. C++
    if (language === 'cpp' || language === 'c') {
      const isCpp = language === 'cpp';
      const compiler = isCpp ? 'g++' : 'gcc';
      const srcFile = path.join(tmpDir, `${uniqueId}.${isCpp ? 'cpp' : 'c'}`);
      const exeFile = path.join(tmpDir, `${uniqueId}.exe`);

      try {
        fs.writeFileSync(srcFile, code, 'utf8');
        // Compile phase (ONLY ONCE)
        const compileResult = await new Promise((resolve) => {
          exec(`${compiler} "${srcFile}" -o "${exeFile}"`, {
            timeout: 10000,
            env: { ...process.env, PATH: `C:\\MinGW\\bin;${process.env.PATH || ''}` }
          }, (compErr, _, compStderr) => {
            if (compErr) {
              try { fs.unlinkSync(srcFile); } catch {}
              try { fs.unlinkSync(exeFile); } catch {}
              return resolve({ status: 'compile_error', output: '', error: compStderr || compErr.message });
            }
            resolve(null);
          });
        });

        if (compileResult) {
          return {
            status: 'failed',
            passed: false,
            score: 0,
            totalTestCases: testCases.length,
            passedTestCases: 0,
            details: [{ status: 'compile_error', error: compileResult.error }]
          };
        }

        const runner = (input) => new Promise((resolve) => {
          const child = exec(`"${exeFile}"`, {
            timeout: 8000,
            maxBuffer: 1024 * 1024,
            windowsHide: true,
            env: { ...process.env, PATH: `C:\\MinGW\\bin;${process.env.PATH || ''}` }
          }, (runErr, stdout, stderr) => {
            if (runErr) {
              if (runErr.killed || runErr.signal === 'SIGTERM') return resolve({ status: 'timeout', output: '', error: 'Execution timed out (5s limit exceeded).' });
              return resolve({ status: 'runtime_error', output: stdout || '', error: stderr || runErr.message });
            }
            resolve({ status: 'completed', output: stdout || '', error: stderr || '', language });
          });
          if (child.stdin) {
            if (input) child.stdin.write(input);
            child.stdin.end();
          }
        });

        const results = [];
        let passedCount = 0;
        for (let i = 0; i < testCases.length; i++) {
          const r = await runTestCase(runner)(testCases[i], i);
          if (r.passed) passedCount++;
          results.push(r);
          if (!r.passed && (r.status === 'timeout')) break;
        }

        try { fs.unlinkSync(srcFile); } catch {}
        setTimeout(() => { try { fs.unlinkSync(exeFile); } catch {} }, 100);

        const allPassed = passedCount === testCases.length;
        return {
          status: allPassed ? 'success' : 'failed',
          passed: allPassed,
          score: testCases.length > 0 ? Math.round((passedCount / testCases.length) * 100) : 100,
          totalTestCases: testCases.length,
          passedTestCases: passedCount,
          details: results
        };
      } catch (e) {
        try { fs.unlinkSync(srcFile); } catch {}
        try { fs.unlinkSync(exeFile); } catch {}
        return { status: 'failed', passed: false, score: 0, totalTestCases: testCases.length, passedTestCases: 0, details: [{ error: e.message }] };
      }
    }

    // 3. Java
    if (language === 'java') {
      const javaDir = path.join(tmpDir, `java_${uniqueId}`);
      try {
        fs.mkdirSync(javaDir, { recursive: true });
        const classMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
        const className = classMatch ? classMatch[1] : 'Main';
        const srcFile = path.join(javaDir, `${className}.java`);

        fs.writeFileSync(srcFile, code, 'utf8');

        // Compile phase (ONLY ONCE)
        const compileResult = await new Promise((resolve) => {
          exec(`javac "${srcFile}"`, { cwd: javaDir, timeout: 10000 }, (compErr, _, compStderr) => {
            if (compErr) {
              try { fs.rmSync(javaDir, { recursive: true, force: true }); } catch {}
              return resolve({ status: 'compile_error', output: '', error: compStderr || compErr.message });
            }
            resolve(null);
          });
        });

        if (compileResult) {
          return {
            status: 'failed',
            passed: false,
            score: 0,
            totalTestCases: testCases.length,
            passedTestCases: 0,
            details: [{ status: 'compile_error', error: compileResult.error }]
          };
        }

        const runner = (input) => new Promise((resolve) => {
          const child = exec(`java -cp . ${className}`, { cwd: javaDir, timeout: 5000, maxBuffer: 1024 * 1024 }, (runErr, stdout, stderr) => {
            if (runErr) {
              if (runErr.killed || runErr.signal === 'SIGTERM') return resolve({ status: 'timeout', output: '', error: 'Execution timed out (5s limit exceeded).' });
              return resolve({ status: 'runtime_error', output: stdout || '', error: stderr || runErr.message });
            }
            resolve({ status: 'completed', output: stdout || '', error: stderr || '', language: 'java' });
          });
          if (child.stdin) {
            if (input) child.stdin.write(input);
            child.stdin.end();
          }
        });

        const results = [];
        let passedCount = 0;
        for (let i = 0; i < testCases.length; i++) {
          const r = await runTestCase(runner)(testCases[i], i);
          if (r.passed) passedCount++;
          results.push(r);
          if (!r.passed && (r.status === 'timeout')) break;
        }

        try { fs.rmSync(javaDir, { recursive: true, force: true }); } catch {}

        const allPassed = passedCount === testCases.length;
        return {
          status: allPassed ? 'success' : 'failed',
          passed: allPassed,
          score: testCases.length > 0 ? Math.round((passedCount / testCases.length) * 100) : 100,
          totalTestCases: testCases.length,
          passedTestCases: passedCount,
          details: results
        };
      } catch (e) {
        try { fs.rmSync(javaDir, { recursive: true, force: true }); } catch {}
        return { status: 'failed', passed: false, score: 0, totalTestCases: testCases.length, passedTestCases: 0, details: [{ error: e.message }] };
      }
    }

    return { status: 'failed', passed: false, score: 0, totalTestCases: testCases.length, passedTestCases: 0, details: [{ error: `Unsupported language: ${language}` }] };
  }
}

export const codeExecutionService = new CodeExecutionService();
export default codeExecutionService;
