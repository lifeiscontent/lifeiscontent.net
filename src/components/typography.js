import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { textAlign, marginBottom } from '../utils/styles';

const Typography = styled.div`
  h1& {
    font-size: 30px;
  }

  h2& {
    font-size: 24px;
  }

  h3& {
    font-size: 18px;
  }

  h1&,
  h2&,
  h3& {
    color: #222;
    text-transform: uppercase;
  }

  p& {
    font-size: 16px;
  }

  ${marginBottom}
  ${textAlign}
`;

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  marginBottom: PropTypes.number.isRequired,
  textAlign: PropTypes.oneOf(['left', 'center']).isRequired,
};

Typography.defaultProps = {
  marginBottom: 0,
  textAlign: 'left',
};

export default Typography;

export const H1 = Typography.withComponent('h1');
export const H2 = Typography.withComponent('h2');
export const H3 = Typography.withComponent('h3');
export const P = Typography.withComponent('p');
