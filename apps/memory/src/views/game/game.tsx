import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePairs, useScore } from '../../hooks';
import { Grid } from '../../common/grid/grid';
import { State } from '../../types/models';
import { getCards } from '../../utils/random-cards';
import { resetCards, setCards } from '../../store/slices/cards-slice';

export const Game = () => {
  const navigate = useNavigate();
  const [newGame, setNewGame] = useState(false);
  const dispatch = useDispatch();
  const { list } = useSelector((state: State) => state.cards);
  const { name } = useSelector((state: State) => state.user);

  if (!name) {
    navigate('/');
  }

  useEffect(() => {
    const pairedCards = getCards();
    dispatch(setCards(pairedCards));
  }, [dispatch, newGame]);

  usePairs();

  useScore();

  const restart = () => {
    dispatch(resetCards());
    setNewGame(!newGame);
  };

  return (
    <>
      <button className='btn' onClick={restart}>New Game</button>
      {list.length === 0 ? <div>...Loading</div> : <Grid list={list} />}
    </>
  );
};
