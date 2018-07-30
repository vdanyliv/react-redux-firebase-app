import React, {Component} from 'react';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {withHandlers} from 'recompose'

import './App.css';

class App extends Component {
  createTestData() {
    this.props.addData();
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.createTestData()}>Create test data</button>
      </div>
    );
  }
}

const getActions = () => {
  return {
    addData: props => () => {
      props.firestore.add({collection: 'test'}, {name: Math.random()});
    }
  }
};

export default compose(
  firestoreConnect(['test']),
  withHandlers(getActions())
)(App);
