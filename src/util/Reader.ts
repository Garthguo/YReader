import cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import source from '../assets/json/shuyuan.json';
import {toDBC} from './parse';
import {getBookListWithRule} from './parseWithRule';
export const getNovelContent = async (url: string) => {
  let content = '';
  let title = '';
  await fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      let clean = sanitizeHtml(data, {
        allowedAttributes: false,
        exclusiveFilter: function (frame: any) {
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
export const getListFromSource = async (text: string) => {
  const info = source[0];
  const url = info.searchUrl
    .replace(/\{\{(.+?)\}\}/g, str => {
      return text;
    })
    .split(',')[0];
  const data = await fetch(info.bookSourceUrl + url).then(function (response) {
    return response.text();
  });
  const $ = cheerio.load(data);
  const res = getBookListWithRule($, info.bookSourceUrl);
  return res;
};
