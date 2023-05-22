const rule = {
  id: 'dshnfikahdsifka',
  baseUrl: 'http://www.pfzw.net',
  getSearchUrl: function (context, text) {
    return this.baseUrl + '/modules/article/search.php?searchkey=' + text;
  },
  getNovelSearchResult: function (context, url) {
    console.log(
      '%c [ url ]-13',
      'font-size:13px; background:pink; color:#bf2c9f;',
      url,
    );
    const {loadHTML} = context;
    return loadHTML(url).then(([$, html]) => {
      console.log(
        '%c [ html ]-15',
        'font-size:13px; background:pink; color:#bf2c9f;',
        html,
      );
      return [{title: '', author: '', cover: '', url: ''}];
    });
  },
  getNovelInfo: function () {},
  getNovelChapterUrlList: function () {},
};
export default rule;
