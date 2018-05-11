import React, { Component } from 'react';

class Event extends Component {
  state = {};

  render() {
    const { isActive } = this.props;

    let isActiveClass = '';
    if (isActive) {
      isActiveClass = 'active'
    }

    return (
      <article id="event" className={isActiveClass}>
        <h2 className="major">Event</h2>
        <h2>Nikah</h2>
        <h3>14 June 2018, 6.00pm</h3>
        <span className="image main">
          <img src="assets/images/nikah.jpg" alt="" />
        </span>
        <p>Although the courthouse will have our signatures on the dotted line, we know it won’t be real in our eyes until you help us make the commitment. After some lip-locking, a Pablo Neruda poem and the string-quartet version of `Into the Mystic,’ we think the deal will be sealed.</p>
        <h2>Reception</h2>
        <h3>14 June 2018, 7.30pm</h3>
        <span className="image main">
          <img src="assets/images/reception.jpg" alt="" />
        </span>
        <p>No need to front, this is what we all have been waiting for. Enjoy a margarita or glass of prosecco at the Electric Eel while wifey & hubby (wait, us?) snap some photos in the teepee, then gather back ‘round in the garden for a lantern-lit fiesta.</p>
        <h2>Brunch</h2>
        <h3>15 June 2018, 11.00am</h3>
        <span className="image main">
          <img src="assets/images/brunch.jpg" alt="" />
        </span>
        <p>We’re all going to feel like we were hit by a tractor trailer truck that was hauling 150 cases of Moet, but according to history we will live to see work on Monday. With that in mind, let’s have two fried eggs, buttery toast and a bloody mary to carry us over.</p>
        <div className="close">Close</div>
      </article>
    )
  }
}

export default Event;
