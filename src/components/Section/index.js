import React from 'react';
import './index.css';

const Section = ({ children, ...props }) => (
  <section className="Section" {...props}>
    {children}
  </section>
);

export default Section;
