import React from 'react';
import ReactDOM from 'react-dom';
import AggridComponent from './AggridComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AggridComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
