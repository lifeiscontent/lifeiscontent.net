import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Page = styled.main`
  flex-grow: 1;
`;

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
