import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
