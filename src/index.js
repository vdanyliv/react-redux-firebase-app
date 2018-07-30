import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {createStore, compose} from 'redux';
import {rootReducer} from './reducers';

import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase} from 'react-redux-firebase';
import {reduxFirestore} from 'redux-firestore';


import './index.css';


// Initialize firebase instance
firebase.initializeApp({
  apiKey: 'AIzaSyCmJM68qwyllAb5HoHleDrur2keohKPbD8',
  authDomain: 'react-redux-3669c.firebaseapp.com',
  databaseURL: 'https://react-redux-3669c.firebaseio.com',
  projectId: 'react-redux-3669c',
  storageBucket: 'react-redux-3669c.appspot.com',
  messagingSenderId: '50212926782'
});

firebase.firestore();

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  enableLogging: true
};

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig), reduxFirestore(firebase))(createStore);
const store = createStoreWithFirebase(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


store.firebaseAuthIsReady.then(() => {
  console.error('authorized');
});

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
