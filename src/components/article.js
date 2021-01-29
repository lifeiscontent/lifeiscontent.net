import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Article = styled.article`
  max-width: 100%;
`;

Article.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Article;
