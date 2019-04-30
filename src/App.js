import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  incrementCounter = () => {
    const { counter } = this.state;
    this.setState({
      counter : counter + 1
    })
  }
  render() {
    const { counter } = this.state;
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {counter}</h1>
        <button data-test="increment-button" onClick={this.incrementCounter} >
          Increment Counter
        </button>
      </div>
    );
  }
}

export default App;
