/**
 * CodeForge PDF Generator Utility
 * Generates genuine, readable, multi-page standard PDF 1.4 documents containing:
 * - Topic overview, reading time, and difficulty
 * - Core concepts, syntax patterns, and detailed explanations
 * - Formatted code examples and expected browser outputs
 * - Common mistakes with corrections and root-cause explanations
 * - Try It Yourself playground tasks
 * - 3 Practice Challenges (Easy, Medium, Challenge) with requirements and solutions
 * - Knowledge check quiz questions with answer keys and explanations
 * - Verified YouTube learning references
 * Zero external libraries required.
 */

function escapePdfText(text) {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E\n]/g, ' '); // keep printable ASCII
}

function wrapText(text, maxChars = 75) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Build a valid multi-page PDF 1.4 binary string
 */
export function buildTopicPdf(topic, moduleName = 'HTML Foundational') {
  const pages = [];
  let currentCommands = [];
  let y = 790;

  const pushPage = () => {
    // Add page footer to current page
    currentCommands.push('0.5 0.5 0.5 RG');
    currentCommands.push('50 40 m 545 40 l S');
    currentCommands.push('BT /F1 8 Tf 50 30 Td (CodeForge Engineering Curriculum  |  https://codeforge.dev  |  Verified Student Notes) Tj ET');

    pages.push(currentCommands.join('\n'));
    currentCommands = [];
    y = 790;

    // Header banner on subsequent pages
    currentCommands.push('0.5 0.5 0.5 RG');
    currentCommands.push('1 w');
    currentCommands.push('50 805 m 545 805 l S');
    currentCommands.push(`BT /F1 8 Tf 50 812 Td (CODEFORGE  |  ${escapePdfText(topic.title).toUpperCase()}) Tj ET`);
  };

  const checkPageBreak = (neededSpace = 30) => {
    if (y - neededSpace < 55) {
      pushPage();
    }
  };

  // Header Banner Page 1
  currentCommands.push('0.5 0.5 0.5 RG');
  currentCommands.push('1 w');
  currentCommands.push('50 805 m 545 805 l S');
  currentCommands.push(`BT /F1 9 Tf 50 812 Td (CODEFORGE LEARNING PLATFORM  |  ${escapePdfText(moduleName).toUpperCase()} NOTES) Tj ET`);

  // Title
  y = 770;
  currentCommands.push(`BT /F1 20 Tf 50 ${y} Td (${escapePdfText(topic.title)}) Tj ET`);
  y -= 20;

  // Metadata
  currentCommands.push(`BT /F1 10 Tf 50 ${y} Td (Difficulty: ${escapePdfText(topic.difficulty)}   |   Reading Time: ${escapePdfText(topic.estimatedTime)}   |   Module: ${escapePdfText(moduleName)}) Tj ET`);
  y -= 25;

  // Horizontal divider
  currentCommands.push('0.8 0.8 0.8 RG');
  currentCommands.push(`50 ${y} m 545 ${y} l S`);
  y -= 20;

  // Summary
  if (topic.summary) {
    currentCommands.push(`BT /F1 12 Tf 50 ${y} Td (Overview & Objectives) Tj ET`);
    y -= 16;
    const summaryLines = wrapText(topic.summary, 80);
    for (const line of summaryLines) {
      checkPageBreak(16);
      currentCommands.push(`BT /F2 10 Tf 50 ${y} Td (${escapePdfText(line)}) Tj ET`);
      y -= 14;
    }
    y -= 12;
  }

  // Structured Notes Format
  if (topic.notes) {
    // 1. Concept
    if (topic.notes.concept) {
      checkPageBreak(50);
      currentCommands.push('0.2 0.2 0.2 RG');
      currentCommands.push(`BT /F1 13 Tf 50 ${y} Td (1. Core Concept) Tj ET`);
      y -= 16;

      const conceptLines = wrapText(topic.notes.concept, 80);
      for (const line of conceptLines) {
        checkPageBreak(16);
        currentCommands.push(`BT /F2 10 Tf 50 ${y} Td (${escapePdfText(line)}) Tj ET`);
        y -= 14;
      }
      y -= 10;
    }

    // 2. Syntax Structure
    if (topic.notes.syntax) {
      checkPageBreak(50);
      currentCommands.push('0.2 0.2 0.2 RG');
      currentCommands.push(`BT /F1 13 Tf 50 ${y} Td (2. Syntax Structure) Tj ET`);
      y -= 16;

      const syntaxLines = topic.notes.syntax.split('\n');
      for (const sLine of syntaxLines) {
        checkPageBreak(14);
        currentCommands.push(`BT /F3 9 Tf 60 ${y} Td (${escapePdfText(sLine)}) Tj ET`);
        y -= 12;
      }
      y -= 10;
    }

    // 3. In-Depth Explanation
    if (topic.notes.explanation) {
      checkPageBreak(50);
      currentCommands.push('0.2 0.2 0.2 RG');
      currentCommands.push(`BT /F1 13 Tf 50 ${y} Td (3. Detailed Explanation) Tj ET`);
      y -= 16;

      const expLines = topic.notes.explanation.split('\n');
      for (const rawLine of expLines) {
        const wrapped = wrapText(rawLine, 80);
        for (const line of wrapped) {
          checkPageBreak(16);
          currentCommands.push(`BT /F2 9.5 Tf 50 ${y} Td (${escapePdfText(line)}) Tj ET`);
          y -= 13;
        }
        y -= 3;
      }
      y -= 8;
    }

    // 4. Code Example
    if (topic.notes.codeExample) {
      checkPageBreak(60);
      currentCommands.push('0.2 0.2 0.2 RG');
      currentCommands.push(`BT /F1 13 Tf 50 ${y} Td (4. Code Example) Tj ET`);
      y -= 16;

      const codeLines = topic.notes.codeExample.split('\n');
      for (const cLine of codeLines) {
        checkPageBreak(14);
        currentCommands.push(`BT /F3 8.5 Tf 60 ${y} Td (${escapePdfText(cLine)}) Tj ET`);
        y -= 11;
      }
      y -= 10;
    }

    // 5. Expected Output
    if (topic.notes.expectedOutput) {
      checkPageBreak(45);
      currentCommands.push('0.2 0.2 0.2 RG');
      currentCommands.push(`BT /F1 12 Tf 50 ${y} Td (Expected Browser Output:) Tj ET`);
      y -= 15;

      const outLines = wrapText(topic.notes.expectedOutput, 80);
      for (const line of outLines) {
        checkPageBreak(15);
        currentCommands.push(`BT /F2 9.5 Tf 50 ${y} Td (${escapePdfText(line)}) Tj ET`);
        y -= 13;
      }
      y -= 10;
    }

    // 6. Common Mistakes
    if (topic.notes.commonMistakes && topic.notes.commonMistakes.length > 0) {
      checkPageBreak(60);
      currentCommands.push('0.2 0.2 0.2 RG');
      currentCommands.push(`BT /F1 13 Tf 50 ${y} Td (5. Common Mistakes to Avoid) Tj ET`);
      y -= 18;

      for (let i = 0; i < topic.notes.commonMistakes.length; i++) {
        const item = topic.notes.commonMistakes[i];
        checkPageBreak(45);
        currentCommands.push(`BT /F1 10 Tf 50 ${y} Td (${i + 1}. Mistake: ${escapePdfText(item.mistake)}) Tj ET`);
        y -= 13;
        currentCommands.push(`BT /F1 9 Tf 60 ${y} Td (Correction: ) Tj ET`);
        const corLines = wrapText(item.correction, 70);
        currentCommands.push(`BT /F2 9 Tf 120 ${y} Td (${escapePdfText(corLines[0])}) Tj ET`);
        y -= 12;
        for (let k = 1; k < corLines.length; k++) {
          checkPageBreak(13);
          currentCommands.push(`BT /F2 9 Tf 120 ${y} Td (${escapePdfText(corLines[k])}) Tj ET`);
          y -= 12;
        }

        const expW = wrapText(item.explanation, 76);
        for (const line of expW) {
          checkPageBreak(13);
          currentCommands.push(`BT /F2 8.5 Tf 60 ${y} Td (${escapePdfText(line)}) Tj ET`);
          y -= 11;
        }
        y -= 6;
      }
      y -= 10;
    }
  }

  // Try It Yourself
  if (topic.tryItYourself) {
    checkPageBreak(60);
    currentCommands.push('0.2 0.2 0.2 RG');
    currentCommands.push(`BT /F1 13 Tf 50 ${y} Td (Interactive Sandbox Practice) Tj ET`);
    y -= 16;
    const promptLines = wrapText(topic.tryItYourself.prompt, 80);
    for (const pLine of promptLines) {
      checkPageBreak(14);
      currentCommands.push(`BT /F2 9.5 Tf 50 ${y} Td (${escapePdfText(pLine)}) Tj ET`);
      y -= 13;
    }
    y -= 6;
    if (topic.tryItYourself.starterCode) {
      const sLines = topic.tryItYourself.starterCode.split('\n').slice(0, 15);
      for (const line of sLines) {
        checkPageBreak(13);
        currentCommands.push(`BT /F3 8.5 Tf 60 ${y} Td (${escapePdfText(line)}) Tj ET`);
        y -= 11;
      }
    }
    y -= 10;
  }

  // 3 Practice Questions (Easy, Medium, Challenge)
  if (topic.practiceQuestions && topic.practiceQuestions.length > 0) {
    checkPageBreak(70);
    currentCommands.push('0.2 0.2 0.2 RG');
    currentCommands.push(`BT /F1 14 Tf 50 ${y} Td (Hands-on Practice Challenges (3 Levels)) Tj ET`);
    y -= 20;

    for (const q of topic.practiceQuestions) {
      checkPageBreak(60);
      currentCommands.push(`BT /F1 11 Tf 50 ${y} Td ([${escapePdfText(q.level)}] ${escapePdfText(q.title)}) Tj ET`);
      y -= 15;

      const pLines = wrapText(q.prompt, 80);
      for (const p of pLines) {
        checkPageBreak(14);
        currentCommands.push(`BT /F2 9.5 Tf 55 ${y} Td (${escapePdfText(p)}) Tj ET`);
        y -= 13;
      }

      if (q.requirements && q.requirements.length > 0) {
        y -= 4;
        currentCommands.push(`BT /F1 9 Tf 55 ${y} Td (Requirements:) Tj ET`);
        y -= 12;
        for (const req of q.requirements) {
          checkPageBreak(13);
          currentCommands.push(`BT /F2 8.5 Tf 65 ${y} Td (- ${escapePdfText(req)}) Tj ET`);
          y -= 11;
        }
      }

      if (q.solutionCode) {
        y -= 4;
        currentCommands.push(`BT /F1 9 Tf 55 ${y} Td (Solution Code:) Tj ET`);
        y -= 12;
        const solLines = q.solutionCode.split('\n');
        for (const sLine of solLines) {
          checkPageBreak(13);
          currentCommands.push(`BT /F3 8 Tf 65 ${y} Td (${escapePdfText(sLine)}) Tj ET`);
          y -= 10;
        }
      }
      y -= 12;
    }
  }

  // Knowledge Check Quiz
  if (topic.quiz && topic.quiz.length > 0) {
    checkPageBreak(70);
    currentCommands.push('0.2 0.2 0.2 RG');
    currentCommands.push(`BT /F1 14 Tf 50 ${y} Td (Knowledge Check Quiz) Tj ET`);
    y -= 20;

    for (let i = 0; i < topic.quiz.length; i++) {
      const q = topic.quiz[i];
      checkPageBreak(50);
      currentCommands.push(`BT /F1 10.5 Tf 50 ${y} Td (Question ${i + 1}: ${escapePdfText(q.question)}) Tj ET`);
      y -= 15;

      for (let j = 0; j < q.options.length; j++) {
        const isCorrect = j === q.correctIndex;
        const prefix = isCorrect ? '[CORRECT] ' : '[ ] ';
        checkPageBreak(14);
        if (isCorrect) {
          currentCommands.push(`BT /F1 9 Tf 60 ${y} Td (${prefix}${escapePdfText(q.options[j])}) Tj ET`);
        } else {
          currentCommands.push(`BT /F2 9 Tf 60 ${y} Td (${prefix}${escapePdfText(q.options[j])}) Tj ET`);
        }
        y -= 12;
      }

      if (q.explanation) {
        y -= 3;
        currentCommands.push(`BT /F1 8.5 Tf 60 ${y} Td (Explanation:) Tj ET`);
        const expLines = wrapText(q.explanation, 75);
        for (const e of expLines) {
          y -= 11;
          checkPageBreak(13);
          currentCommands.push(`BT /F2 8.5 Tf 65 ${y} Td (${escapePdfText(e)}) Tj ET`);
        }
      }
      y -= 12;
    }
  }

  // Video Reference
  if (topic.video) {
    checkPageBreak(50);
    currentCommands.push('0.2 0.2 0.2 RG');
    currentCommands.push(`BT /F1 12 Tf 50 ${y} Td (Recommended Video Resource) Tj ET`);
    y -= 16;
    currentCommands.push(`BT /F2 9.5 Tf 50 ${y} Td (Title: ${escapePdfText(topic.video.title)} | Channel: ${escapePdfText(topic.video.channel)}) Tj ET`);
    y -= 14;
    currentCommands.push(`BT /F3 9 Tf 50 ${y} Td (URL: ${escapePdfText(topic.video.url)}) Tj ET`);
    y -= 20;
  }

  pushPage();

  // Construct PDF Objects
  let objCount = 0;
  const objects = [];
  const offsets = [];

  const addObj = (content) => {
    objCount++;
    offsets.push(null);
    objects.push({ num: objCount, content });
    return objCount;
  };

  // Obj 1: Catalog
  addObj('<< /Type /Catalog /Pages 2 0 R >>');

  // Obj 2: Pages (placeholder)
  const pagesObjNum = 2;
  objCount++;
  offsets.push(null);
  objects.push({ num: pagesObjNum, content: '' });

  // Obj 3, 4, 5: Fonts
  const f1Num = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
  const f2Num = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const f3Num = addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>');

  const pageObjNums = [];

  // Create page objects and stream objects
  for (const pageCmds of pages) {
    const streamContent = pageCmds;
    const streamLength = streamContent.length;
    const streamObjNum = addObj(`<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`);
    const pageObjNum = addObj(
      `<< /Type /Page /Parent ${pagesObjNum} 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 ${f1Num} 0 R /F2 ${f2Num} 0 R /F3 ${f3Num} 0 R >> >> /Contents ${streamObjNum} 0 R >>`
    );
    pageObjNums.push(pageObjNum);
  }

  // Fill in Pages object
  objects[1].content = `<< /Type /Pages /Kids [${pageObjNums.map((n) => `${n} 0 R`).join(' ')}] /Count ${pageObjNums.length} >>`;

  // Assemble full PDF
  let pdf = '%PDF-1.4\n';
  const computedOffsets = {};

  for (const obj of objects) {
    computedOffsets[obj.num] = pdf.length;
    pdf += `${obj.num} 0 obj\n${obj.content}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objCount + 1}\n0000000000 65535 f \n`;

  for (let i = 1; i <= objCount; i++) {
    const off = String(computedOffsets[i] || 0).padStart(10, '0');
    pdf += `${off} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

/**
 * Triggers an immediate browser download of the genuine PDF document.
 */
export function downloadTopicPdf(topic, moduleName = 'HTML Foundational') {
  try {
    const pdfData = buildTopicPdf(topic, moduleName);
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CodeForge_${topic.slug || 'topic'}_Notes.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch (err) {
    console.error('Failed to generate PDF:', err);
    return false;
  }
}
