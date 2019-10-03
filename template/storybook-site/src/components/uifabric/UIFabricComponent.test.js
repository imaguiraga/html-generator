import React from 'react';
import ReactDOM from 'react-dom';
import UIFabricComponent from './UIFabricComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UIFabricComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
