import PropTypes from "prop-types"
import styled from '@emotion/styled';

const Container = styled.div`
  box-sizing: border-box;
  max-width: 768px;
  padding-left: 36px;
  padding-right: 36px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
