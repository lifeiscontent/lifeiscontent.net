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
    background-color: rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    color: #130033;
    padding: 3px 6px;
    overflow-wrap: break-word;
  }

  pre {
    overflow: auto;
    background-color: #130033;
    color: #dfccff;
    padding: 12px;
    box-sizing: border-box;
    max-width: 100%;
  }

  blockquote {
    padding: 3px 12px;
    margin-left: 0;
    margin-right: 0;
    border-left: 6px solid #290070;
    background-color: rgba(0, 0, 0, 0.05);
    color: #130033;

    > p {
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
`;

Markdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Markdown;
