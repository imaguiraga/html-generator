import React from 'react';
import ReactDOM from 'react-dom';
import CarbonComponent from './CarbonComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CarbonComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
