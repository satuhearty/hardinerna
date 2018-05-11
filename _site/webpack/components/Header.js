import React, { Component } from 'react';

class Header extends Component {
  state = {};

  render() {
    const { showSection } = this.props;

    return (
      <header id="header">
        <div className="logo">
          <span className="icon" />
        </div>
        <div className="content">
          <div className="inner">
            <h1>Shafeeq & Nadia</h1>
            <p>We are getting married!</p>
          </div>
        </div>
        {/* NOTE: Remove the `use-middle` class and `is-middle` class if there are odd li elements. */}
        <nav className="use-middle">
          <ul>
            <li>
              <a href="#about" onClick={showSection}>About</a>
            </li>
            <li>
              <a href="#story" onClick={showSection}>Story</a>
            </li>
            <li>
              <a href="#event" onClick={showSection}>Event</a>
            </li>
            <li className="is-middle">
              <a href="#rsvp" onClick={showSection}>RSVP</a>
            </li>
            <li>
              <a href="#photos" onClick={showSection}>Photos</a>
            </li>
            <li>
              <a href="#guestbook" onClick={showSection}>Guestbook</a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;
