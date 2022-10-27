import cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import {toDBC} from './parse';
export const getNovelContent = async (url: string) => {
  let content = '';
  let title = '';
  await fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log(data);

      let clean = sanitizeHtml(data, {
        allowedAttributes: false,
        exclusiveFilter: function (frame) {
          return frame.tag === 'script';
        },
      });

      const $ = cheerio.load(
        clean.replace(/<\s*br[^>]*>/gi, '\n').replace(/\n{2,}/g, '\n'),
      );
      const textContent = $('.box_box')
        .text()
        .trim()
        .split('\n')
        .map(_ => '\u3000\u3000' + _.trim())
        .join('\n');
      title = $('.box_con h1').text();
      content = toDBC(textContent);
    })
    .catch(function (err) {
      console.warn('Something went wrong.', err);
    });
  return {content, title};
};

/**
 * 按字符串长度切割字符串（支持汉字占2个长度）
 *
 * @param src
 * @param bytes
 * @return
 */
export function chineseSplitFunction(src, bytes) {
  if (src == null) {
    return null;
  }
  let splitList = [];
  let startIndex = 0; // 字符串截取起始位置
  let endIndex = bytes > src.length ? src.length : bytes; // 字符串截取结束位置
  while (startIndex < src.length) {
    let subString = src.substring(startIndex, endIndex);
    // 截取的字符串的字节长度大于需要截取的长度时，说明包含中文字符
    // 获取字符串的长度，如果有中文，则每个中文字符计为2位
    while (stringlenFunction(subString) > bytes) {
      --endIndex;
      subString = src.substring(startIndex, endIndex);
    }
    splitList.push(src.substring(startIndex, endIndex));
    startIndex = endIndex;
    // 判断结束位置时要与字符串长度比较(src.length)，之前与字符串的bytes长度比较了，导致越界异常。
    endIndex =
      startIndex + bytes > src.length ? src.length : startIndex + bytes;
  }
  return splitList;
}

function stringlenFunction(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if (
      (c >= 0x0001 && c <= 0x007e) ||
      (c >= 0xff60 && c <= 0xff9f) ||
      str[i] == ' '
    ) {
      len += 0.5;
    } else {
      len += 1;
    }
  }
  return len;
}
