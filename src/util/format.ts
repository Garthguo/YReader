import stripAnsi from 'strip-ansi';
import isFullwidthCodePoint from 'is-fullwidth-code-point';
import {isUpper, isLower, isLorI, isThinCode} from './helper';

export const formatContent = (str: string) => {
  str = str.replace(/^"/, '“').replace(/"$/, '”');
  str = str.replace(/^'/, '‘').replace(/'$/, '’');
  return str;
};

// Clean the line and set two indentions
const indentText = (str: string): any => {
  let lines = str.split('\n');

  const newLines: Array<string> = [];

  lines.forEach(line => {
    const cleanLine = line.trim();
    if (cleanLine.length > 0) {
      newLines.push(`\u3000\u3000${cleanLine}`);
      // newLines.push(`    ${cleanLine}`);
    }
  });

  return newLines.join('\n');
};

// Computed the width of string
const stringWidth = (str: string) => {
  if (typeof str !== 'string' || str.length === 0) {
    return 0;
  }

  // These numbers represent these `“” ——(8213)`
  const stringMap: any = {
    8213: 2,
    8220: 1.1,
    8221: 1.1,
  };

  let width = 0;

  const stripAnsiStr = stripAnsi(str);

  const code = stripAnsiStr.charCodeAt(0);
  /*
   * 1. Returns the corresponding value in stringMap when the string is  ``“”——`
   * 2. The width is 2    when the string is full width, they are usually words and symbols
   * 3. The width is 0.5  when the string is `L `or `I` or `i`
   * 4. The width is 0.80 when the string is thin code, like `f, t, r`
   * 5. The width is 1.05 when the string is lower word
   * 6. The width is 1.5  when the string is upper words or number
   * 7. The Others width is 0.5
   */

  if (stringMap[code]) {
    return stringMap[code];
  } else if (isFullwidthCodePoint(code) || str === '…') {
    width = 2;
  } else if (isLorI(stripAnsiStr)) {
    width = 0.5;
  } else if (isThinCode(stripAnsiStr)) {
    width = 0.8;
  } else if (isLower(stripAnsiStr)) {
    width = 1.07;
  } else if (isUpper(stripAnsiStr) || Number(stripAnsiStr) !== NaN) {
    width = 1.5;
  } else {
    width = 0.5;
  }
  // if (str == "…") {
  //   console.log("…", width);
  // }

  return width;
};

export const parseContent = (
  str: string,
  halfWidth: number,
  linesNum: number,
  firstPageTitleLineCount: number,
) => {
  const startTime: any = new Date();
  const width = halfWidth * 2;
  if (!str || str.trim() === '' || typeof str !== 'string') {
    return [];
  }

  // console.log("print", width, linesNum);

  // Two indent
  const cleanStr = indentText(str);

  let chunks = [];
  let currentChunk = '';
  let currentLineWidth = 0;
  let currentLinesNum = 0;

  for (let i in cleanStr) {
    try {
      let s = cleanStr[i];
      let code = s.charCodeAt();

      // Push the current line when meet the `\n` or `\r`
      if (code === 10 || code === 13) {
        currentChunk += '\n';
        currentLinesNum++;
        currentLineWidth = 0;
        continue;
      }

      // Computed the width of the word
      const sWidth = stringWidth(s);
      // if (s == "“") {
      //   s = "  “";
      // } else if (s == "”") {
      //   s = "”  ";
      // }

      // console.log(s, sWidth);

      // Push the `\n` to the current chunk when width of current line will wider then line width
      if (currentLineWidth + sWidth > width) {
        currentChunk += '\n';
        // console.log(currentLineWidth, "\n", currentChunk.split("\n")[currentChunk.split("\n").length - 2]);
        currentLinesNum++;
        currentLineWidth = 0;
      }
      // Push the curretn chunk to the chunks when currnet lines num will more than the lines num
      if (
        currentLinesNum + 1 > linesNum ||
        (chunks.length === 0 &&
          currentLinesNum + 1 > linesNum - firstPageTitleLineCount)
      ) {
        // console.log();
        chunks.push(currentChunk);
        currentChunk = '';
        currentLineWidth = 0;
        currentLinesNum = 0;
      }

      currentChunk += s;
      currentLineWidth += sWidth;
    } catch (error) {
      console.log(error);
    }
  }

  // Push the last line
  chunks.push(currentChunk);

  const endTime: any = new Date();
  const diff = endTime.getTime() - startTime;
  console.log('time diff', diff);
  // chunks.map(text => {
  //   console.log("----------------------\n" + text);
  // });
  return chunks;
};
