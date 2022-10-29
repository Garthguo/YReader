import {useLayoutEffect, useState, useRef} from 'react';
import {storage} from 'src/store/zustandStorage';
import {getNovelContent} from 'src/util/Reader';
type ChapterContent = {content?: string; title?: string};
const useChapterForUrl = (url: string) => {
  const [content, setContent] = useState<ChapterContent>({
    content: '',
    title: '',
  });

  const isGet = useRef(false);
  useLayoutEffect(() => {
    if (storage.contains(url)) {
      const data: ChapterContent = JSON.parse(storage.getString(url) || '{}');
      setContent(data ?? '');
      isGet.current = true;
    } else {
      getNovelContent(url).then(res => {
        setContent(res);
        storage.set(url, JSON.stringify(res));
        isGet.current = true;
      });
    }
  }, [url]);
  return {...content, get: isGet.current};
};
const getChapterForFun = async url => {
  let content = '';
  let title = '';
  if (storage.contains(url)) {
    const data: ChapterContent = JSON.parse(storage.getString(url) || '{}');
    console.log('data', data.title);
    content = data.content ?? '';
    title = data.title ?? '';
  } else {
    await getNovelContent(url, []).then(res => {
      content = res.content ?? '';
      title = res.title ?? '';
      storage.set(url, JSON.stringify(res));
    });
  }
  return {content, title};
};
export {getChapterForFun};
export default useChapterForUrl;
