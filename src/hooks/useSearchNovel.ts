import {useState, useLayoutEffect} from 'react';
import context from 'src/util/context';
// import {getListFromSource} from 'src/util/Reader';
import rule from 'src/util/ruleHandler/rule';
const useSearchNovel = (text: string): any[] => {
  const [data, setData] = useState([]);
  const rules = Array.isArray(rule) ? rule : [rule];
  useLayoutEffect(() => {
    Promise.all(
      rules.map(rule =>
        rule.getNovelSearchResult(context, rule.getSearchUrl(context, text)),
      ),
    )
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.log(
          '%c [ err ]-18',
          'font-size:13px; background:pink; color:#bf2c9f;',
          err,
        );
      });
  }, [text]);
  return data;
};
export default useSearchNovel;
