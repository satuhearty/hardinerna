import React, { Component } from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import Rsvp from './components/Rsvp';

firebase.initializeApp(config);

class RsvpPage extends Component {
  render() {
    return (
      <Rsvp firebase={firebase} />
    )
  }
}

render(<RsvpPage />, document.getElementById('rsvp'));
