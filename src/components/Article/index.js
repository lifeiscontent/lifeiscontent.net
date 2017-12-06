import React from 'react';
import './index.css';

const Article = ({ children, ...props }) => (
  <article className="Article" {...props}>
    {children}
  </article>
);

export default Article;
