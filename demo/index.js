import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DurationInputMask from '../src/DurationInputMask';

class App extends Component {
  state = {
    value: 3600 * 24 * 1.2,
  };

  handleChange = (value) => {
    console.log('change', value);
    this.setState({ value });
  };

  handleEvent = (ev, value) => {
    ev.persist();
    console.log(ev.type, ev, value);
  };

  render() {
    const { value } = this.state;

    return (
      <DurationInputMask
        // autoFocus
        // onBlur={this.handleEvent}
        // onChange={this.handleChange}
        // onKeyDown={this.handleEvent}
        // onKeyUp={this.handleEvent}
        value={value}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
