import { useState } from 'react';
import useEventListener from './useEventListener';

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEventListener(
    'resize',
    () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    },
    window
  );

  return windowSize;
};

export default useWindowResize;
