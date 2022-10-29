const getBookListWithRule = ($, url) => {
  const ruleFn = new Function(
    '$',
    'url',
    `return $('.ul_b_list li')
  .map(function (index) {
    return {
      title: $('h2 a', this).text(),
      author: $('.state', this)
        .text()
        .match(/作者：(\\S*)/)[1],
      cover: url+$('img', this).attr('src'),
      url: url+$('h2 a', this).attr('href'),
    };
  })
  .get();`,
  );
  return ruleFn($, url);
};
// const getDomWithRule = ($, rule) => {
//   const rules: [] = rule.split('@').map(_ => _.split('.'));
//   const data = rules.reduce((pre, cur, index) => {
//     const res = getDomWithOneRule($, cur);
//   }, []);
//   console.log($, rules);
// };
// const getDomWithOneRule = ($, rules) => {
//   const type = rules.length === 3 ? 'node' : 'list';
//   //   if ((type = node)) {
//   //     switch (rules[0]) {
//   //       case 'class':
//   //         console.log(1);
//   //         break;
//   //       case 'tag':
//   //         console.log(1);
//   //         break;
//   //       case 'class':
//   //         console.log(1);
//   //         break;
//   //       case 'class':
//   //         console.log(1);
//   //         break;

//   //       default:
//   //         break;
//   //     }
//   //   }
//   //   const test = new Function('$', 'console.log($)');
//   //   test($);
//   return {type};
// };
export {getBookListWithRule};
