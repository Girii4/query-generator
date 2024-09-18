import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    position: relative;

    background-color: ${props => props.theme.colors.bgGreySecondary};

    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
  }

  html, body {
    min-height: 100%;
  }

  button {
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;
