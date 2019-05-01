import React from 'react';
import { mount, shallow } from 'enzyme';

// SuT
import DurationInputMask from './DurationInputMask';

jest.useFakeTimers();

describe('Default behaviour', () => {
  it('renders an input', () => {
    const wrapper = shallow(<DurationInputMask />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('renders component prop', () => {
    const component = 'textarea';
    const wrapper = shallow(<DurationInputMask component={component} />);
    expect(wrapper.find(component)).toHaveLength(1);
  });

  it('sets state.value', () => {
    const value = 121;
    const wrapper = shallow(<DurationInputMask value={value} />);
    const event = { target: { value } };

    wrapper.simulate('change', event);
    expect(wrapper.state('value')).toEqual(value);
  });
});

describe('Handles props', () => {
  it('missing props.value is handled gracefully', () => {
    const wrapper = shallow(<DurationInputMask />);

    expect(wrapper.prop('value')).toEqual('');
  });

  it('props.value (number) is masked', () => {
    const value = 121;
    const wrapper = shallow(<DurationInputMask value={value} />);

    expect(wrapper.state('value')).toEqual('2m 1s');
  });

  it('props.value (string) is masked', () => {
    const value = '2m 1s';
    const wrapper = shallow(<DurationInputMask value={value} />);

    expect(wrapper.state('value')).toEqual(value);
  });

  it('props.value (string no units) is masked', () => {
    const value = '121';
    const wrapper = shallow(<DurationInputMask value={value} />);

    expect(wrapper.state('value')).toEqual('2m 1s');
  });

  it('spreads in the style prop', () => {
    const wrapper = shallow(<DurationInputMask style={{ color: 'blue' }} />);
    expect(wrapper.prop('style')).toMatchObject({
      color: 'blue',
    });
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

  it('invalid units are discarded', () => {
    const value = '2d 1x';
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

  it('event.target.value=undefined handled gracefully', () => {
    const value = 61;
    const wrapper = shallow(<DurationInputMask value={value} />);
    const event = { target: { value: undefined } };

    wrapper.simulate('change', event);

    expect(wrapper.state('value')).toEqual();
  });

  it('props value is masked on setTimeout', (done) => {
    const value = 61;
    const delay = 250;
    const delayInMilliseconds = delay / 1000;
    const nextValue = '1m 1s';
    const wrapper = shallow(
      <DurationInputMask maskDelay={delay} value={value} />,
    );
    const mockHandleMaskDelay = jest.spyOn(wrapper.instance(), 'handleMaskDelay');

    const before = performance.now();

    wrapper.simulate('change', { target: { value } });

    mockHandleMaskDelay(value, nextValue);

    const after = performance.now();

    expect(wrapper.state('value')).toEqual(nextValue);
    expect(after - before).toBeGreaterThan(delayInMilliseconds);
    done();
  });

  it('props value is masked immediately onBlur even if maskDelay is set', () => {
    const value = 61;
    const delay = 1000;
    const nextValue = '1m 1s';
    const wrapper = shallow(
      <DurationInputMask maskDelay={delay} value={value} />,
    );

    wrapper.simulate('blur');

    expect(wrapper.state('value')).toEqual(nextValue);
  });
});

describe('Calls handlers', () => {
  it('props.handleBlur called', () => {
    const mockHandler = jest.fn();
    const value = 121;
    const maskedValue = '2m 1s';
    const parsedValue = value;
    const rawValue = maskedValue;
    const wrapper = mount(<DurationInputMask value={value} handleBlur={mockHandler} />);

    wrapper.simulate('blur');

    expect(mockHandler).toHaveBeenCalledWith(parsedValue, maskedValue, rawValue);
  });

  it('props.handleChange called', () => {
    const mockHandler = jest.fn();
    const value = 61;
    const nextValue = '1m 61s';
    const maskedNextValue = '2m 1s';
    const parsedNextValue = 121;
    const wrapper = shallow(<DurationInputMask value={value} handleChange={mockHandler} />);
    const event = { target: { value: nextValue } };

    wrapper.simulate('change', event);

    expect(mockHandler).toHaveBeenCalledWith(parsedNextValue, maskedNextValue, nextValue);
  });

  it('handleMaskDelay called when props.maskOnDelay is set', (done) => {
    const value = 61;
    const delay = 250;
    const mockHasChangeFunction = false;
    const nextValue = '1m 1s';
    const wrapper = shallow(
      <DurationInputMask maskDelay={delay} value={value} />,
    );
    const mockHandleMaskDelay = jest.spyOn(wrapper.instance(), 'handleMaskDelay');

    wrapper.simulate('change', { target: { value } });

    expect(mockHandleMaskDelay).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(delay);

    expect(mockHandleMaskDelay).toHaveBeenCalledTimes(1);
    expect(mockHandleMaskDelay).toHaveBeenCalledWith(value, nextValue, mockHasChangeFunction);
    done();
  });

  it('props.handleChange callback called when set with maskDelay', (done) => {
    const mockHandleChange = jest.fn();
    const delay = 250;
    const value = 121;
    const nextValue = '2m 1s';
    const maskedNextValue = nextValue;
    const parsedNextValue = value;
    const wrapper = shallow(
      <DurationInputMask value={value} maskDelay={delay} handleChange={mockHandleChange} />,
    );

    wrapper.simulate('change', { target: { value } });

    jest.advanceTimersByTime(delay);

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith(parsedNextValue, maskedNextValue, value);
    done();
  });

  it('props.onKeyDown called', () => {
    const mockHandler = jest.fn();
    const value = '2m 1s';
    const wrapper = mount(<DurationInputMask value={value} onKeyDown={mockHandler} />);

    wrapper.simulate('keydown', { which: 13, target: { value } });

    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'keydown',
        nativeEvent: expect.any(Object),
      }),
    );
  });

  it('props.onKeyUp called', () => {
    const mockHandler = jest.fn();
    const value = '';
    const nextValue = '1';
    const wrapper = mount(<DurationInputMask value={value} onKeyUp={mockHandler} />);

    wrapper.simulate('keyup', { target: { value: nextValue } });

    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'keyup',
        nativeEvent: expect.any(Object),
      }),
    );
  });

  describe('Handles timer', () => {
    it('should clear timer onBlur', () => {
      const delay = 1000;
      const value = 61;

      const wrapper = shallow(
        <DurationInputMask value={value} maskDelay={delay} />,
      );
      wrapper.simulate('change', { target: { value } });

      const mockClearTimeout = jest.spyOn(window, 'clearTimeout');

      wrapper.simulate('blur');

      expect(mockClearTimeout).toHaveBeenCalledTimes(1);
    });

    it('should clear timer onChange', () => {
      const delay = 1000;
      const value = 61;
      const nextValue = 121;

      const wrapper = shallow(
        <DurationInputMask value={value} maskDelay={delay} />,
      );
      wrapper.simulate('change', { target: { value } });

      jest.advanceTimersByTime(500);

      wrapper.simulate('change', { target: { value: nextValue } });

      const mockClearTimeout = jest.spyOn(window, 'clearTimeout');

      expect(mockClearTimeout).toHaveBeenCalledTimes(1);
    });
  });
});
