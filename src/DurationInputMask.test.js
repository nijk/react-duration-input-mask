import React from 'react';
import { mount, shallow } from 'enzyme';
import styled from 'styled-components';

// SuT
import DurationInput from './DurationInputMask';

// Helpers
const focusThenBlur = (wrapper, element = 'div') =>
  wrapper
    .find(element)
    .simulate('focus')
    .simulate('blur');

// Styled components
const Wrapper = styled.div``;

describe('Default behaviour', () => {
  it('renders an input', () => {
    const wrapper = shallow(<DurationInput />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('onInput sets state.value', () => {
    const mockHandler = jest.fn();
    const wrapper = shallow(<DurationInput value="foo" onChange={mockHandler} />);
    const nextValue = 'foo bar';

    wrapper.simulate('change', { target: { value: nextValue } });
    expect(mockHandler).toHaveBeenCalledWith(nextValue);
  });
});

describe('Handles props', () => {
  it('spreads in the style prop', () => {
    const wrapper = shallow(<DurationInput style={{ color: 'blue' }} />);
    expect(wrapper.prop('style')).toMatchObject({
      color: 'blue',
    });
  });

  it('renders the props.value', () => {
    const value = 'foo';
    const wrapper = shallow(<DurationInput value={value} />);

    expect(wrapper.prop('value')).toEqual(value);
  });

  it('renders an updated props.value', () => {
    const value = 'foo';
    const nextValue = 'foo bar';
    const wrapper = shallow(<DurationInput value={value} />);

    wrapper.setProps({ value: nextValue });

    expect(wrapper.render().prop('value')).toEqual(nextValue);
  });

  it('attributes and customProps are passed down', () => {
    const wrapper = shallow(<DurationInput foo="bar" />);
    expect(wrapper.prop('foo')).toEqual('bar');
  });

  it('props.value change updates state', () => {
    const value = '';
    const nextValue = 'foo';
    const wrapper = shallow(<DurationInput value={value} />);

    wrapper.setProps({ value: nextValue });
    expect(wrapper.state('value')).toEqual(nextValue);
  });

  it('props.autoFocus sets focus on mount', () => {
    const wrapper = mount(<DurationInput autoFocus />);
    const instance = wrapper.instance();
    const ref = instance.ref;
    jest.spyOn(ref, 'focus');

    instance.componentDidMount();

    expect(ref.focus).toHaveBeenCalled();
  });
});

describe('Calls handlers', () => {
  it('props.onBlur called', () => {
    const mockHandler = jest.fn();
    const value = 'foo';
    const wrapper = mount(<DurationInput value={value} onBlur={mockHandler} />);

    wrapper.simulate('blur');

    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'blur',
      }),
      value,
    );
  });

  it('props.onChange called', () => {
    const mockHandler = jest.fn();
    const wrapper = shallow(<DurationInput value="foo" onChange={mockHandler} />);
    const nextValue = 'foo bar';

    wrapper.simulate('change', { target: { value: nextValue } });

    expect(mockHandler).toHaveBeenCalledWith(nextValue);
  });

  it('props.onKeyDown called', () => {
    const mockHandler = jest.fn();
    const value = 'foo';
    const wrapper = mount(<DurationInput value={value} onKeyDown={mockHandler} />);

    wrapper.simulate('keydown', { which: 13, target: { value } });

    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'keydown',
        nativeEvent: expect.any(Object),
      }),
      value,
    );
  });

  it('props.onKeyUp called', () => {
    const mockHandler = jest.fn();
    const value = '';
    const nextValue = 'f';
    const wrapper = mount(<DurationInput value={value} onKeyUp={mockHandler} />);

    wrapper.simulate('keyup', { target: { value: nextValue } });

    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'keyup',
        nativeEvent: expect.any(Object),
      }),
      nextValue,
    );
  });
});
