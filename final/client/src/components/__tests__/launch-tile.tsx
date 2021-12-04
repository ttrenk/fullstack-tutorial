import React from 'react';
import { shallow, mount, render } from '../../enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup } from '../../test-utils';
import LaunchTile from '../launch-tile';
import Launches from '../../pages/launches';

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  describe('renders without error', () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
      <Launches/>
      </MockedProvider>,
    );
    it('renders without error enzyme method', () => {
      expect(wrapper.find('svg')).not.toBeNull();
      expect(wrapper.html()).toContain('logo.svg');
    
    }); 
  });
});
