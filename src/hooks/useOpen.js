import { useMemo, useState } from 'react';
import { handleStopPropagation } from './utils';

const useOpen = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);

  return useMemo(() => {
    const toggle = (event) => {
      handleStopPropagation(event);
      setOpen(!open);
    };

    return [open, toggle, setOpen];
  }, [open]);
};

export default useOpen;
