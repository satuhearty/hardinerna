import React, { Component } from 'react';

class Story extends Component {
  state = {};

  render() {
    const { isActive } = this.props;

    let isActiveClass = '';
    if (isActive) {
      isActiveClass = 'active'
    }

    return (
      <article id="photos" className={isActiveClass}>
        <h2 className="major">Photos</h2>
        <span className="image main">
          <img src="assets/images/nikah.jpg" alt="" />
        </span>
        <span className="image main">
          <img src="assets/images/reception.jpg" alt="" />
        </span>
        <span className="image main">
          <img src="assets/images/brunch.jpg" alt="" />
        </span>
        <div className="close">Close</div>
      </article>
    )
  }
}

export default Story;
