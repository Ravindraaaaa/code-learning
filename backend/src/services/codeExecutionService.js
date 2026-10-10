import axios from 'axios';
import { logger } from '../utils/logger.js';

/**
 * Secure Sandbox Code Execution Architecture
 * Delegates code execution to an external sandbox service (e.g., Piston API).
 * Enforces CPU limits, execution timeouts, process isolation, and network restrictions.
 */
class CodeExecutionService {
  constructor() {
    // Piston public API or local sandbox instance
    this.sandboxUrl = process.env.SANDBOX_API_URL || 'https://emacs.piston.rs/api/v2';
    
    // Language mapping to Piston format
    this.languageConfig = {
      javascript: { language: 'javascript', version: '18.15.0' },
      python: { language: 'python', version: '3.10.0' },
      java: { language: 'java', version: '15.0.2' },
      cpp: { language: 'c++', version: '10.2.0' },
      c: { language: 'c', version: '10.2.0' }
    };
  }

  /**
   * Executes code using the external sandbox architecture.
   * Execution Statuses: queued, running, completed, compile_error, runtime_error, timeout, failed
   */
  async execute(language, code, input = '') {
    const config = this.languageConfig[language];
    if (!config) {
      throw new Error(`Language '${language}' is not supported by the execution service`);
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

    try {
      // Configuration enforcing secure constraints
      const payload = {
        language: config.language,
        version: config.version,
        files: [{ content: code }],
        stdin: input,
        args: [],
        compile_timeout: 10000, // 10s CPU limit for compilation
        run_timeout: 5000,      // 5s CPU limit for execution
      };

      // Requesting execution from isolated sandbox
      const response = await axios.post(`${this.sandboxUrl}/execute`, payload);
      const data = response.data;

      // Determine Execution Status
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

    } catch (error) {
      logger.error(`[CodeExecutionService] Sandbox Error: ${error.message}`);
      return {
        status: 'failed',
        output: '',
        error: 'Execution sandbox is currently unavailable or encountered an internal fault.'
      };
    }
  }

  /**
   * Submits code for validation against hidden test cases using the secure sandbox.
   */
  async submit(language, code, testCases = []) {
    let passedCount = 0;
    const results = [];

    // If there are no hidden test cases, execute it once
    if (!testCases || testCases.length === 0) {
       const res = await this.execute(language, code, '');
       return {
         status: res.status === 'completed' ? 'success' : 'failed',
         passed: res.status === 'completed',
         score: res.status === 'completed' ? 100 : 0,
         details: res.error || res.output
       };
    }

    for (const tc of testCases) {
      const result = await this.execute(language, code, tc.input);
      const passed = result.status === 'completed' && result.output.trim() === tc.expectedOutput.trim();
      
      if (passed) passedCount++;
      
      results.push({
        input: tc.input,
        expected: tc.expectedOutput,
        actual: result.output,
        status: passed ? 'completed' : result.status,
        error: result.error
      });
      
      // Stop execution early on failure to prevent resource exhaustion
      if (!passed) break;
    }

    const score = testCases.length > 0 ? Math.round((passedCount / testCases.length) * 100) : 100;

    return {
      status: passedCount === testCases.length ? 'success' : 'failed',
      passed: passedCount === testCases.length,
      score,
      totalTestCases: testCases.length,
      passedTestCases: passedCount,
      details: results
    };
  }
}

export const codeExecutionService = new CodeExecutionService();
export default codeExecutionService;
