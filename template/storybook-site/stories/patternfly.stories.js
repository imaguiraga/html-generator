import React from 'react';
import PatternflyComponent from '../src/components/patternfly/PatternflyComponent';
export default {
  title: 'Patternfly',
};

export const PatternflyStorybook = () => (
  <PatternflyComponent />
);

PatternflyStorybook.story = {
  name: 'Patternfly Component',
};
