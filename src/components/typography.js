import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { textAlign, marginBottom } from "../utils/styles";

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
  textAlign: PropTypes.oneOf(["left", "center"]).isRequired
};

Typography.defaultProps = {
  marginBottom: 0,
  textAlign: "left"
};

export default Typography;
