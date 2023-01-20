import { useEffect, useRef } from 'react';

const useMount = (fn: () => void) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    fnRef.current();
  }, []);
};

export default useMount;
