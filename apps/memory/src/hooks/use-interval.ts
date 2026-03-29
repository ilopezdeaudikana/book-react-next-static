import { IntervalRef } from '../types/models';
import { useCallback, useEffect, useRef } from 'react';

export const useInterval = (
  callback: Function,
  delay: number,
) => {
 
  const durationIntervalRef: IntervalRef = useRef(null);

  const durationRef = useRef(0);

  const handler = useCallback(() => {
    callback(durationRef);
  }, [callback, durationRef]);

  useEffect(() => {
    const durationInterval: ReturnType<typeof setInterval> = setInterval(
      handler,
      delay
    );
    durationIntervalRef.current = durationInterval;
    return () => {
      clearInterval(durationInterval);
    };
  }, [delay, handler]);

  return [durationIntervalRef, durationRef];
};
