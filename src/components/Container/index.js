import React from 'react';
import './index.css';
const Container = ({ children, ...props }) => (
  <div className="Container" {...props}>
    {children}
  </div>
);

export default Container;
