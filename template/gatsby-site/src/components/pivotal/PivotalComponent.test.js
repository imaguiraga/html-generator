import React from 'react';
import ReactDOM from 'react-dom';
import PivotalComponent from './PivotalComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PivotalComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
