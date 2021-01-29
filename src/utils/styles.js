import { css } from '@emotion/react';

export const marginBottom = (props) =>
  typeof props.marginBottom === 'number'
    ? css`
        margin-bottom: ${props.marginBottom}px;
      `
    : null;

export const textAlign = (props) =>
  typeof props.textAlign === 'string'
    ? css`
        text-align: ${props.textAlign};
      `
    : null;

export const globals = css`
  html,
  body,
  #___gatsby,
  #gatsby-focus-wrapper {
    min-height: 100vh;
  }

  #gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
  }

  body {
    color: #595959;
    font-family: 'Gotham', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  a {
    color: #290070;
    text-decoration: none;
  }
`;
