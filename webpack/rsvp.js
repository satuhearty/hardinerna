import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import Memories from './components/Memories';
import Rsvp from './components/Rsvp';

firebase.initializeApp(config);

class Pictures extends Component {
  render() {
    return (
      <Memories />
    )
  }
}

class RsvpPage extends Component {
  render() {
    return (
      <Rsvp firebase={firebase} />
    )
  }
}

render(<Pictures />, document.getElementById('pictures'));
render(<RsvpPage />, document.getElementById('rsvp'));
