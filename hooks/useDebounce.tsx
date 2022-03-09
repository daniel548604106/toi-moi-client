import React, { useEffect, useState } from 'react';

const useDebounce = (value, delay = 166) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
