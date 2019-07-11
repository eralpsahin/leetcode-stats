import React from 'react';
import { render } from 'react-dom';
import './assets/css/App.css';
import App from './app/App';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';

let iconLink = document.createElement('link');
let robotoLink = document.createElement('link');

iconLink.rel = 'stylesheet';
iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';

robotoLink.rel = 'stylesheet';
robotoLink.href =
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: orange[200],
      main: orange[500],
      dark: orange[900]
    },
    secondary: {
      ligh: green[200],
      main: green[500],
      dark: green[900]
    }
  },
  typography: {
    caption: {
      fontSize: 10
    }
  },
  spacing: 8
});

document.getElementsByTagName('head')[0].append(robotoLink, iconLink);

let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
