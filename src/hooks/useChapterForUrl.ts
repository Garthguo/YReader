import {useLayoutEffect, useEffect, useState, useRef} from 'react';
import {getNovelContent} from 'src/util/Reader';
type ChapterContent = {content?: string; title?: string};
const cache: Map<string, ChapterContent> = new Map();
const useChapterForUrl = (url: string) => {
  // console.log(url);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const isGet = useRef(false);
  useLayoutEffect(() => {
    if (cache.has(url)) {
      const data: ChapterContent = cache.get(url) || {};
      console.log('data', data.title);
      setContent(data.content ?? '');
      setTitle(data.title ?? '');
      isGet.current = true;
    } else {
      getNovelContent(url, []).then(res => {
        setContent(res.content);
        setTitle(res.title);
        cache.set(url, {content: res.content, title: res.title});
        isGet.current = true;
      });
    }
  }, [url]);
  return {content, title, get: isGet.current};
};
export default useChapterForUrl;
