import { MemoryCard } from '../card/card';
import { Card } from '../../types/models';
export const Grid: React.FC<{ list: Card[] }> = ({ list }) => {
  return (
    <div className='container'>
      {list.map((item: Card) => (
        <MemoryCard key={item.id} id={item.id} value={item.value} />
      ))}
    </div>
  );
};
