import React from 'react';
import './index.css';

const Lead = ({ children, ...props }) => (
  <p className="Lead" {...props}>
    {children}
  </p>
);

export default Lead;
