import React from 'react';
import { shallow, mount, render } from '../../enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    const wrapper = mount(
      <MockedProvider addTypename={false}>
       <LaunchDetail />
      </MockedProvider>,
    );

    expect(wrapper).not.toBeNull();
  });

  it('renders without error enzyme method', () => {
    let mocks = [
      {
        request: { query: LaunchDetail, variables: { launchId: '1' } },
        result: { data: { launch: LaunchDetail } },
      },
    ];

    var wrapper = mount(
        <LaunchDetail
            id={'1'}
            site={'earth'}
            rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
        />,
    );

    expect(wrapper.find('Card')).not.toBeNull();
    expect(wrapper.html()).toContain('that one');
  });
});



