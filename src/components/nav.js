import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Nav = styled.nav`
  max-width: 100%;
  padding: 6px;

  a {
    padding: 6px;
    text-decoration: underline;
    font-size: 1.2em;
  }
`;

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nav;
