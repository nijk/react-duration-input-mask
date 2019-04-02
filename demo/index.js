import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DurationInputMask from '../src/DurationInputMask';

class App extends Component {
  state = {
    title: 'foo',
  };

  handleChange = (value) => {
    console.log('change', value);
    this.setState({ title: value });
  };

  handleEvent = (ev, value) => {
    ev.persist();
    console.log(ev.type, ev, value);
  };

  render() {
    return (
      <div className="App">
        <DurationInputMask
          value={this.state.title}
          autoFocus
          onBlur={this.handleEvent}
          onChange={this.handleChange}
          onKeyDown={this.handleEvent}
          onKeyUp={this.handleEvent}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
