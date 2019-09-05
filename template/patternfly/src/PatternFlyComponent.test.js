import React from 'react';
import ReactDOM from 'react-dom';
import PatternFlyComponent from './PatternFlyComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PatternFlyComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
