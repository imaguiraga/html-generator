import React from 'react';
import ReactDOM from 'react-dom';
import PatternflyComponent from './PatternflyComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PatternflyComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
