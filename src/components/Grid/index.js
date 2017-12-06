import React from 'react';
import './index.css';

const Grid = ({ children, className, extensions = [], ...props }) => (
  <div
    className={[
      'Grid',
      ...extensions.map(extension => `Grid--${extension}`),
      className
    ]
      .filter(x => x)
      .join(' ')}
  >
    {children}
  </div>
);

Grid.Cell = ({ children, sm, className, ...props }) => {
  return (
    <div
      className={['Grid-cell', sm && `sm-Grid-cell--${sm}`, className]
        .filter(x => x)
        .join(' ')}
    >
      {children}
    </div>
  );
};

export default Grid;
