import { useEffect, useRef } from 'react';

const useUnmount = (fn: () => void) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    return () => fnRef.current();
  }, []);
};

export default useUnmount;
