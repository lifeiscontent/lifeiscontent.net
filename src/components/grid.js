import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import GridCell from './grid-cell';

const Grid = styled.div`
  display: block;
  margin-left: ${(props) =>
    typeof props.gutter === 'number' ? `-${props.gutter}px` : null};

  > ${GridCell} {
    padding-left: ${(props) =>
      typeof props.gutter === 'number' ? `${props.gutter}px` : null};
  }
`;

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  gutter: PropTypes.number,
};

export default Grid;
