import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Markdown = styled.div`
  max-width: 100%;

  a {
    text-decoration: underline;
  }

  p {
    line-height: 1.5em;
  }

  p > code {
    background-color: #f2f2f2;
    color: #130033;
    padding: 3px 6px;
  }

  pre {
    overflow: auto;
    background-color: #130033;
    color: #dfccff;
    padding: 12px;
  }
`;

Markdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Markdown;
