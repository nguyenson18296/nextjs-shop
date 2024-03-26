import { useState, useEffect } from "react";

// useDebounce hook that accepts a value of generic type T and a delay in milliseconds
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called on component unmount
      // or if value or delay changes. It clears the timeout.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value or delay changes
    [value, delay]
  );

  return debouncedValue;
}

export default useDebounce;
