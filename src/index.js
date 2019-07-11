import React from 'react';
import { render } from 'react-dom';
import App from './App';

let iconLink = document.createElement('link');
let robotoLink = document.createElement('link');

iconLink.rel = 'stylesheet';
iconLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';

robotoLink.rel = 'stylesheet';
robotoLink.href =
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';

document.getElementsByTagName('head')[0].append(robotoLink, iconLink);

let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render(<App />, document.getElementById('root'));
