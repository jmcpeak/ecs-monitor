import { useState } from 'react';
import useSelectedTabPosition from './useSelectedTabPosition';

const useOnChange = () => {
  const initialPosition = useSelectedTabPosition();
  const [value, setValue] = useState(initialPosition);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return [value, handleChange];
};

export default useOnChange;
