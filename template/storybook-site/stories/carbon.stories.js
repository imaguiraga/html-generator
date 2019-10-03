import React from 'react';
import CarbonComponent from '../src/components/carbon/CarbonComponent';
export default {
  title: 'Carbon',
};

export const CarbonStorybook = () => (
  <CarbonComponent />
);

CarbonStorybook.story = {
  name: 'Carbon Component',
};
