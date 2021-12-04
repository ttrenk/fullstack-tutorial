import React from 'react';
import { shallow, mount, render } from '../../enzyme';
import { MockedProvider } from '@apollo/client/testing';

import { cleanup } from '../../test-utils';
import Header from '../header';

describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
       <Header />
      </MockedProvider>,
    );

    expect(wrapper.find('header')).not.toBeNull();
  });

  it('should have container element', () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <Header />
        </MockedProvider>,
    );

    expect(wrapper.find('container')).not.toBeNull();
  });

  it('should have image element', () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <Header />
        </MockedProvider>,
    );

    expect(wrapper.find('#image')).not.toBeNull();
  });
});
