import React from 'react';
import MenuItem from '../menu-item';
import Footer from '../footer';
import { MockedProvider } from '@apollo/client/testing';
import { mount } from '../../enzyme';

describe('Menu Item', () => {
  it('Renders Menu Item', () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <MenuItem to='/wow' />
        </MockedProvider>
    );

    expect(wrapper.exists()).toBeDefined();
    expect(wrapper.find('wow').exists()).toBeDefined();
    expect(wrapper.length).toBe(1);
  });

  it('Renders Menu Items with in footer', async () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <Footer />
        </MockedProvider>
    );

    expect(wrapper.exists()).toBeDefined();
    expect(wrapper.find('#footer-menu').exists()).toBeDefined();
    expect(wrapper.find('#footer-menu').children().length).toBe(5);
    expect(wrapper.find('#footer-menu').find('a').length).toBe(3);
    expect(wrapper.find('#footer-menu').find('a[href="/"]').length).toBe(1);
    expect(
        wrapper.find('#footer-menu').find('a[href="/"]').contains('Home')
    ).toBe(true);
    expect(wrapper.find('#footer-menu').find('a[href="/cart"]').length).toBe(1);
    expect(
        wrapper.find('#footer-menu').find('a[href="/cart"]').contains('Cart')
    ).toBe(true);

    expect(wrapper.find('#footer-menu').find('a[href="/profile"]').length).toBe(
        1
    );
    expect(
        wrapper
            .find('#footer-menu')
            .find('a[href="/profile"]')
            .contains('Profile')
    ).toBe(true);

    expect(
        wrapper
            .find('#footer-menu')
            .find('[data-testid="logout-button"]')
            .exists()
    ).toBe(true);

    expect(
        wrapper
            .find('#footer-menu')
            .find('[data-testid="logout-button"]')
            .contains('Logout')
    ).toBe(true);
  });

  it('Renders Menu Items with in footer button test', () => {
    const wrapper = mount(
        <MockedProvider addTypename={false}>
          <Footer />
        </MockedProvider>
    );

    jest.spyOn(window.localStorage.__proto__, 'removeItem');
    window.localStorage.__proto__.removeItem = jest.fn();

    wrapper.find('#footer-menu').find('button').simulate('click');
    expect(localStorage.removeItem).toBeCalledTimes(2);
  });
});
