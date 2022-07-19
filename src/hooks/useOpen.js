import { handleStopPropagation } from './utils';
import { useMemo, useState } from 'react';

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
