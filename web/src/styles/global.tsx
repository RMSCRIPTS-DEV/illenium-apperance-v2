import { createGlobalStyle } from 'styled-components';
import nexafont from '../fonts/Nexa-Book.ttf';
import { getPreviewBodyBackgroundCss } from './previewBackground';

const isDev = !import.meta.env.PROD;
const { dev: previewBodyCssDev, prod: previewBodyCssProd } = getPreviewBodyBackgroundCss();

export default createGlobalStyle<{theme: any}>`
  @font-face {
    font-family: 'Nexa-Book';
    src: url(${nexafont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    user-select: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  body {
    font-family: 'Nexa-Book', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    color: ${({ theme }) => `rgb(${theme.fontColor || '255, 255, 255'})`};
    
    /* Dev mode background - Thomas boilerplate FiveM POV image (no dark overlay) */
    ${isDev ? previewBodyCssDev : previewBodyCssProd}
  }

  button {
    cursor: pointer;
    outline: 0;
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  p {
    margin: 0;
    padding: 0;
    font-family: 'Nexa-Book', sans-serif;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    display: none;
  }
`;
