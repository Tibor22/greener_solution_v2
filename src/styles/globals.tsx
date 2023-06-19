import { createGlobalStyle } from 'styled-components';
import { palette } from './common';
import { playfair_display, montserrat, merriweather } from './fonts';

export default createGlobalStyle`
  html {
    font-size: 162.5%;
  }

  html, body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    a {
      text-decoration: none;
    }

    h2 {
      font-family: ${playfair_display.style.fontFamily}, serif;
    }

    p {
      // font-family: ${montserrat.style.fontFamily}, serif;
      font-family: ${merriweather.style.fontFamily}, serif;
    }

    b {
      font-weight: bold;
    }
  }
`;
