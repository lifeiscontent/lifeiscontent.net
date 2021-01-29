import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { marginBottom, textAlign } from '../utils/styles';

const sm = (props) =>
  typeof props.sm === 'number'
    ? css`
        @media screen and (min-width: 768px) {
          & {
            width: ${typeof props.sm === 'number'
              ? `${props.sm * 100}%`
              : null};
          }
        }
      `
    : null;

const GridCell = styled.div`
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  ${marginBottom}
  ${sm}
  ${textAlign}
`;

GridCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GridCell;
