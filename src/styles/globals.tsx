import { createGlobalStyle } from 'styled-components';
import { playfair_display, montserrat, merriweather } from './fonts';
import { device } from '@/styles/device';

export default createGlobalStyle`



${device.mobileS} {
  html {
    font-size: 50%;

  }
}
${device.mobileL} {
  html {
    font-size: 52.5%;
  }
}
${device.tablet} {
  html {
    font-size: 57.5%;
  }
}


${device.laptop} {
  html {
    font-size: 62.5%;
  }
}

  html, body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    min-height: fill-available;
    min-height: -webkit-fill-available;

   
    & * {
      box-sizing: border-box;
    }

    a {
      text-decoration: none;
    }

    ul,ol{
      padding-inline-start: 0px;
      margin-block-start:0px;
      margin-block-end:0px;
    }
		
		li {
			font-family: ${montserrat.style.fontFamily}, serif;
	
		}
		input {
			font-family: ${merriweather.style.fontFamily}, serif;
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

    .ProseMirror {
      > * + * {
        margin-top: 0.75em;
      }
    }

    blockquote {
      border-left: 3px solid rgba(13, 13, 13, 0.1) !important;
      padding-left: 1rem !important;
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-size:15px;
      font-style:italic;
    }


  }

 
blockquote p::before {
  content:'“ ';
}
blockquote p::after {
  content:' ”';
}
  
`;
