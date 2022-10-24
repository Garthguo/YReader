import {useEffect, useRef} from 'react';
const useFirstRender = () => {
  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);
  return first.current;
};
export default useFirstRender;
