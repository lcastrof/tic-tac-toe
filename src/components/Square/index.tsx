import { FC } from 'react';

import './styles.css';

type SquareProps = {
  onClick: (row: number, col: number) => void;
  row: number;
  col: number;
  value: string;
  thereIsAWinner: boolean;
};

const Square: FC<SquareProps> = ({ onClick, row, col, value, thereIsAWinner }) => {

  const handleClick = () => {
    onClick(row, col);
  }

  return (
    <button className={`square ${(!!value || thereIsAWinner) && 'active'}`} onClick={handleClick}>
      {value}
    </button>
  );
}

export default Square;