import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter() });

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setUp
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setUp = (props={}, state=null) => {
  const wrapper =  shallow(<App {...props} />);
  if(state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrappper to search within.
 * @param {strin} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

it('renders without errors', () => {
  const wrapper = setUp();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

it('renders increment button', () => {
  const wrapper = setUp();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

it('renders counter display', () => {
  const wrapper = setUp();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

it('counter starts at 0', () => {
  const wrapper = setUp();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

it('clicking button increments counter display', () => {
  const counter = 9;
  const wrapper = setUp(null, { counter });

  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});
