import { shallow, mount, render } from '../../enzyme';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { cleanup } from '../../test-utils';
import Header from '../header';

describe('Header', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  describe('renders without error', () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
       <Header />
      </MockedProvider>,
    );
    it('should have space dog  element', () => {
      expect(wrapper.find('Container')).not.toBeNull();
      expect(wrapper.html()).toContain('Space dog');
    
    });  
  });
});
