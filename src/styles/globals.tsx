import { createGlobalStyle } from 'styled-components';
import { playfair_display, montserrat, merriweather } from './fonts';

export default createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  html, body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    a {
      text-decoration: none;
    }
		
		li {
			font-family: ${montserrat.style.fontFamily}, serif;
			list-style-type: none;
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
