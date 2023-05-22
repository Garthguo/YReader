import {load} from 'cheerio';

const context = {
  loadHTML: (url: string) =>
    fetch(url)
      .then(res => res.text())
      .then(html => [load(html), html])
      .catch(_ => [load('<html></html>'), '']),
};
export default context;
