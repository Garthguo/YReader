type IParseContent = (
  contentArr: string[],
  lineCount: number,
  title: string,
) => any[];
const parseContent: IParseContent = (contentArr, lineCount, title) => {
  const contents: any[] = [];
  let count = 0;
  let idx = 0;
  while (count < contentArr.length) {
    contents.push({
      content: contentArr.slice(count, count + lineCount).join(''),
      title: title + idx++,
    });
    count += lineCount;
  }
  return contents;
};

const reg =
  /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
function toDBC(str: string): string {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code === 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
    if (reg.test(str[i])) {
      result += ' ';
    }
  }
  return result.replace(/【/g, '[').replace(/】/g, ']').replace(/！/g, '!');
}
export {parseContent, toDBC};
