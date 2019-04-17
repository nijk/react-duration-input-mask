import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DurationInputMask from '../src/DurationInputMask';

class App extends Component {
  state = {
    value: 61,
  };

  handleEvent = (event, value) => {
    event.persist && event.persist();

    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <DurationInputMask
        autoFocus
        // onBlur={this.handleEvent}
        // onChange={this.handleEvent}
        // onKeyDown={this.handleEvent}
        // onKeyUp={this.handleEvent}
        value={value}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
