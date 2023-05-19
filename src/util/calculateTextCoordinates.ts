import {Dimensions} from 'react-native';

interface Position {
  id: number;
  pos: {
    x: number;
    y: number;
  };
}

interface Page {
  positions: Position[];
  //   width: number;
  //   height: number;
}

interface Config {
  fontSize: number;
  lineHeight: number;
  linePadding: number;
  getTextWidth: (text: string) => number;
  getGlyphIDs: (text: string) => number[];
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}
function calculateTextCoordinates(textContent: string, config: Config): Page[] {
  const {fontSize, lineHeight, linePadding, getTextWidth, getGlyphIDs, margin} =
    config;
  const canvasWidth = Dimensions.get('window').width; // 屏幕宽度
  const canvasHeight = Dimensions.get('window').height; // 屏幕高度
  const textWidth = canvasWidth - (margin?.right ?? 0) - (margin?.left ?? 0);
  const textHeight = canvasHeight - (margin?.top ?? 0) - (margin?.bottom ?? 0);
  const pages: Page[] = [];
  let currentPage: Page = {
    positions: [],
  };
  const maxLinesPerPage = Math.floor(
    (textHeight + linePadding) / (lineHeight + linePadding),
  );

  const initYPos =
    (margin?.top ?? 0) + textHeight / maxLinesPerPage / 2 + lineHeight / 2;
  let xPos = margin?.left ?? 0;
  let yPos = initYPos;
  let currentLine = 0;

  textContent.split('\n').forEach(text => {
    const ids = getGlyphIDs(text);
    const lines: Position[] = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charWidth = getTextWidth(char);

      if (xPos + charWidth - (margin?.left ?? 0) > textWidth) {
        const emptyWidth =
          (textWidth - xPos + (margin?.left ?? 0)) / (lines.length - 1);
        lines.forEach((charData, idx) => {
          // 不是统一偏移，而是越后面偏移越多
          charData.pos.x += emptyWidth * idx;
        });

        yPos += lineHeight + linePadding;
        xPos = margin?.left ?? 0;
        checkMaxLines(lines);
      }
      const glyphId = ids[i];
      const position: Position = {
        id: glyphId,
        pos: {x: xPos, y: yPos},
      };
      xPos += charWidth;
      lines.push(position);
    }

    if (lines.length) {
      yPos += lineHeight + linePadding;
      checkMaxLines(lines);
    }
    xPos = margin?.left ?? 0;
  });

  if (currentPage.positions.length) {
    pages.push(currentPage);
  }

  function checkMaxLines(lines: Position[]) {
    currentLine++;
    currentPage.positions.push(...lines);
    if (currentLine >= maxLinesPerPage) {
      if (currentPage) {
        pages.push(currentPage);
      }
      yPos = initYPos;
      currentLine = 0;
      currentPage = {
        positions: [],
      };
    }
    lines.length = 0;
  }
  return pages;
}

export default calculateTextCoordinates;
