import React, {Component} from 'react';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import {withHandlers} from 'recompose'

import './App.css';

class App extends Component {
  createTestData() {
    this.props.addData();
  }

  signIn() {
    this.props.signIn();
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p><button onClick={() => this.createTestData()}>Create test data</button></p>
        <p><button onClick={() => this.signIn()}>SignIn</button></p>
      </div>
    );
  }
}

const getActions = () => {
  return {
    addData: props => () => {
      props.firestore.add({collection: 'test'}, {name: Math.random()});
    },
    signIn: props => () => {
      props.firebase.login({ provider: 'google', type: 'popup' })
    }
  }
};

export default compose(
  firestoreConnect(['test']),
  withHandlers(getActions())
)(App);
