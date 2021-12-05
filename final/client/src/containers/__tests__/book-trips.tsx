import React from 'react';
import BookTrips, { BOOK_TRIPS } from '../../containers/book-trips';
import { GET_LAUNCH } from '../../containers/cart-item';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { mount } from '../../enzyme';

const updateWrapper = async (wrapper: any, time = 0) => {
  await act(async () => {
    await new Promise((res) => setTimeout(res, time));
    await wrapper.update();
  });
};

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('Book Trips Item', () => {
  it('Renders BookTrips', () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <BookTrips cartItems={[]} />
        </MockedProvider>
    );
    expect(wrapper.find('[data-testid="book-button"]').exists()).toBe(true);
    expect(
        wrapper.find('button[data-testid="book-button"]').contains('Book All')
    ).toBe(true);
    expect(wrapper.find('button[data-testid="book-button"]').length).toBe(1);
  });

  it('Renders BookTrips with single item', async () => {
    let mocks = [
      {
        request: { query: BOOK_TRIPS, variables: { launchIds: ['1'] } },
        result: {
          data: {
            bookTrips: [{ success: true, message: 'success!', launches: [] }],
          },
        },
      },
      {
        // we need this query for refetchQueries
        request: { query: GET_LAUNCH, variables: { launchId: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <BookTrips cartItems={['1']} />
        </MockedProvider>
    );

    expect(wrapper.find('button[data-testid="book-button"]')).not.toBeNull();
    wrapper.find('button[data-testid="book-button"]').simulate('click');

    await updateWrapper(wrapper);

    expect(wrapper.find('[data-testid="message"]')).not.toBeNull();
    expect(wrapper.find('button[data-testid="book-button"]')).not.toBeNull();
  });
});
