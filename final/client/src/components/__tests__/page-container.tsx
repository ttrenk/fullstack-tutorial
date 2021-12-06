import React from 'react';
import PageContainer from '../page-container';
import { MockedProvider } from '@apollo/client/testing';
import { mount } from '../../enzyme';

describe('Page Container', () => {
  it('renders PageContainer without child', () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <PageContainer />
        </MockedProvider>
    );

    expect(wrapper.find('#page-container')).toBeDefined();
    expect(wrapper.find('#page-container-bar')).not.toBeNull();
    expect(wrapper.find('#page-container').children().children()).not.toBeNull();
    expect(wrapper.find('div').length).toBe(2);
  });

  it('renders PageContainer with child', () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <PageContainer>
            <div className='hello-world'>hello world</div>
          </PageContainer>
        </MockedProvider>
    );
    expect(wrapper.find('#page-container')).toBeDefined();
    expect(wrapper.find('#page-container-bar')).not.toBeNull();
    expect(
        wrapper.find('#page-container').children().find('.hello-world')).not.toBeNull();
    expect(wrapper.find('div').length).toBe(3);
  });
});
