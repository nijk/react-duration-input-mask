import React from 'react';
import { mount, shallow } from 'enzyme';

// SuT
import DurationInputMask from './DurationInputMask';

describe('Default behaviour', () => {
  it('renders an input', () => {
    const wrapper = shallow(<DurationInputMask />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('onChange sets state.value', () => {
    const mockHandler = jest.fn();
    const wrapper = shallow(<DurationInputMask value="foo" onChange={mockHandler} />);
    const nextValue = 'foo bar';
    const event = { target: { value: nextValue } };

    wrapper.simulate('change', event);
    expect(mockHandler).toHaveBeenCalledWith(event, nextValue);
  });
});

describe('Handles props', () => {
  it('spreads in the style prop', () => {
    const wrapper = shallow(<DurationInputMask style={{ color: 'blue' }} />);
    expect(wrapper.prop('style')).toMatchObject({
      color: 'blue',
    });
  });

  it('renders the props.value', () => {
    const value = 121;
    const wrapper = shallow(<DurationInputMask value={value} />);

    expect(wrapper.prop('value')).toEqual('2m 1s');
  });

  it('renders the props.value string', () => {
    const value = '2m 1s';
    const wrapper = shallow(<DurationInputMask value={value} />);

    expect(wrapper.prop('value')).toEqual(value);
  });

  it('duplicate units are discarded', () => {
    const value = '2d 1d';
    const wrapper = shallow(<DurationInputMask value={value} />);

    expect(wrapper.state('value')).toEqual('2d');
  });

  it('renders an updated props.value', () => {
    const value = 121;
    const nextValue = 330;
    const wrapper = shallow(<DurationInputMask value={value} />);

    wrapper.setProps({ value: nextValue });

    expect(wrapper.render().prop('value')).toEqual('5m 30s');
  });

  it('attributes and customProps are passed down', () => {
    const wrapper = shallow(<DurationInputMask foo="bar" />);
    expect(wrapper.prop('foo')).toEqual('bar');
  });

  it('props.value change updates state', () => {
    const value = 121;
    const nextValue = 330;
    const wrapper = shallow(<DurationInputMask value={value} />);

    wrapper.setProps({ value: nextValue });
    expect(wrapper.state('value')).toEqual('5m 30s');
  });

  it('props.autoFocus sets focus on mount', () => {
    const wrapper = mount(<DurationInputMask autoFocus />);
    const instance = wrapper.instance();
    const { ref } = instance;
    jest.spyOn(ref, 'focus');

    instance.componentDidMount();

    expect(ref.focus).toHaveBeenCalled();
  });
});

describe('Calls handlers', () => {
  it('props.onBlur called', () => {
    const mockHandler = jest.fn();
    const value = 121;
    const wrapper = mount(<DurationInputMask value={value} onBlur={mockHandler} />);

    wrapper.simulate('blur');

    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'blur',
      }),
      '2m 1s',
    );
  });

  it('props.onChange called', () => {
    const mockHandler = jest.fn();
    const value = 121;
    const nextValue = '3m 32s';
    const wrapper = shallow(<DurationInputMask value={value} onChange={mockHandler} />);
    const event = { target: { value: nextValue } };

    wrapper.simulate('change', event);

    expect(mockHandler).toHaveBeenCalledWith(event, nextValue);
  });

  it('props.onKeyDown called', () => {
    const mockHandler = jest.fn();
    const value = 'foo';
    const wrapper = mount(<DurationInputMask value={value} onKeyDown={mockHandler} />);

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
    const wrapper = mount(<DurationInputMask value={value} onKeyUp={mockHandler} />);

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
