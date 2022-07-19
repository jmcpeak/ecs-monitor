import { useMemo } from 'react';
import useWindowResize from './useWindowResize';

const useWindowHeightWidth = (offset = 0, widthOffset = 0) => {
  const windowSize = useWindowResize();

  return useMemo(() => {
    return {
      height: windowSize.height - offset,
      width: windowSize.width - widthOffset,
    };
  }, [offset, widthOffset, windowSize.height, windowSize.width]);
};

export default useWindowHeightWidth;
