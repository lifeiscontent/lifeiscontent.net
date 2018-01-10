import React from 'react';
import './index.css';

const Grid = ({ className, extensions = [], ...props }) => (
  <div
    className={['Grid', ...extensions.map(extension => `Grid--${extension}`), className]
      .filter(x => x)
      .join(' ')}
    {...props}
  />
);

Grid.Cell = ({ sm, className, ...props }) => {
  return (
    <div
      className={['Grid-cell', sm && `sm-Grid-cell--${sm}`, className].filter(x => x).join(' ')}
      {...props}
    />
  );
};

export default Grid;
