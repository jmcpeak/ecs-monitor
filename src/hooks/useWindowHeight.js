import { useMemo } from 'react';
import useWindowResize from './useWindowResize';

const useWindowHeight = (offset = 0) => {
  const windowSize = useWindowResize();

  return useMemo(() => {
    return {
      height: windowSize.height - offset,
    };
  }, [offset, windowSize.height]);
};

export default useWindowHeight;
