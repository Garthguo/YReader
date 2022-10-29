import {useState, useLayoutEffect} from 'react';
import {getListFromSource} from 'src/util/Reader';
const useSearchNovel = (text: string): any[] => {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    getListFromSource(text).then(res => {
      setData(res);
    });
  }, [text]);
  return data;
};
export default useSearchNovel;
