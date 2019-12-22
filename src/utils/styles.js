import { css } from "@emotion/core";

export const marginBottom = props =>
  typeof props.marginBottom === "number"
    ? css`
        margin-bottom: ${props.marginBottom}px;
      `
    : null;

export const textAlign = props =>
  typeof props.textAlign === "string"
    ? css`
        text-align: ${props.textAlign};
      `
    : null;
