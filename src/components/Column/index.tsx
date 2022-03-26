import { FC } from 'react';

import './styles.css';

const Column: FC = ({ children }) => {
  return (
    <div className="column">
      {children}
    </div>
  );
};

export default Column;
