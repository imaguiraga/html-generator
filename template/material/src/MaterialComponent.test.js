import React from 'react';
import ReactDOM from 'react-dom';
import MaterialComponent from './MaterialComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MaterialComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
