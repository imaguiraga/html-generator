import React from 'react';
import AggridComponent from '../src/components/aggrid/AggridComponent';
export default {
  title: 'AgGrid',
};

export const AgGridStorybook = () => (
  <AggridComponent />
);

AgGridStorybook.story = {
  name: 'AgGrid Component',
};
