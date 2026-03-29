import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State, DurationRef } from '../types/models';
import { useNavigate } from 'react-router-dom';
import { useInterval } from '../hooks';
import { setScore } from '../store/slices/score-slice';
import { resetCards } from '../store/slices/cards-slice';

export const useScore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paired, list } = useSelector((state: State) => state.cards);
  const [durationIntervalRef, durationRef] = useInterval(
    (durationRef: DurationRef) => {
      durationRef.current++;
    },
    1000,
  );
  useEffect(() => {
    if (!paired && !list) return
    if (paired.length > 0 && paired.length === list.length) {
      clearInterval(
        durationIntervalRef.current as ReturnType<typeof setInterval>
      );
      const currentDuration = durationRef ? durationRef.current: 0;
      dispatch(setScore({ value: Math.round((1 / (currentDuration as number) ) * 10000) }));

      const timeout = setTimeout(() => {
        navigate('/score');
        dispatch(resetCards());
      }, 1000);
      return () => clearInterval(timeout);
    }
  }, [paired, durationIntervalRef, list, dispatch, navigate, durationRef]);
};
