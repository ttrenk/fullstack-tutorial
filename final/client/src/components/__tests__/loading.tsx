import React from 'react';
import { render } from '../../enzyme';
import { cleanup } from '../../test-utils';
import Loading from '../loading';

describe('Loading', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = render(<Loading />);
  });
});
