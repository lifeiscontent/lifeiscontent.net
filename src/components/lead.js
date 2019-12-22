import PropTypes from "prop-types"
import styled from '@emotion/styled';

const Lead = styled.p`
  font-size: 16px;
`

Lead.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Lead
