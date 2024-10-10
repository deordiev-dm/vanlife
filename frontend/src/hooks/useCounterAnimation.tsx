import { useCallback, useEffect, useRef, useState } from "react";

export function useCounterAnimation(finalValue: number) {
  const startValue = 0;
  const durationMs = 300;

  const [currentValue, setCurrentValue] = useState<number>(startValue);
  const requestFrameRef = useRef<number | null>(null);
  const startTimestamp = useRef<number | null>(null);

  const step = useCallback(
    (timestamp: number) => {
      if (!startTimestamp.current) {
        startTimestamp.current = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTimestamp.current) / durationMs,
        1,
      );
      const newValue = Math.floor(
        progress * (finalValue - startValue) + startValue,
      );

      setCurrentValue(newValue);

      if (progress < 1) {
        requestFrameRef.current = requestAnimationFrame(step);
      }
    },
    [finalValue, startValue, durationMs],
  );

  useEffect(() => {
    startTimestamp.current = null;

    requestFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (requestFrameRef.current) {
        cancelAnimationFrame(requestFrameRef.current);
      }
    };
  }, [finalValue, step]);

  return currentValue;
}
