import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Tags = styled.ul`
  display: block;
  list-style: none;
  margin-left: 0;
  margin-right: 0;
  padding: 0;

  li {
    color: #ffffff;
    font-size: 0.85em;
    display: inline-block;
    margin: 3px;
    padding: 4px 8px;
    background-color: #290070;
  }

  li:first-of-type {
    margin-left: 0;
  }

  li:last-of-type {
    margin-right: 0;
  }
`;

Tags.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tags;
