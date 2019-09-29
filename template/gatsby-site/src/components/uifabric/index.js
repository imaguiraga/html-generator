import React from 'react';
import ReactDOM from 'react-dom';
import UIFabricComponent from './UIFabricComponent';
import { mergeStyles } from 'office-ui-fabric-react';
import * as serviceWorker from './serviceWorker';

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});

ReactDOM.render(<UIFabricComponent />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();