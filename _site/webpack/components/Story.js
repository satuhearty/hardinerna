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
      <article id="story" className={isActiveClass}>
        <h2 className="major">Story</h2>
        <h3>Here's our story.</h3>
        <div className="timeline-container" id="timeline-1">
          <div className="timeline">
            <div className="timeline-item" data-text="THE INTRODUCTION">
              <div className="timeline__content">
                <img className="timeline__img" src="assets/images/nikah.jpg"/>
                <h2 className="timeline__content-title">2016</h2>
                <p className="timeline__content-desc">On April 23, 1920, the GrandNational Assembly was inaugurated. Mustafa Kemal Pasha was elected to its Presidency. Fighting on many fronts, he led his forces to victory against rebels and invadingarmies. Following the Turkish triumph at the two major battles at Inonu in Western Turkey,the Grand National Assembly conferred on Mustafa Kemal Pasha the title ofCommander-in-Chief with the rank of Marshal.</p>
              </div>
            </div>
            <div className="timeline-item" data-text="HOW I MET YOUR MOTHER">
              <div className="timeline__content">
                <img className="timeline__img" src="assets/images/reception.jpg"/>
                <h2 className="timeline__content-title">2016</h2>
                <p className="timeline__content-desc">On April 23, 1920, the GrandNational Assembly was inaugurated. Mustafa Kemal Pasha was elected to its Presidency. Fighting on many fronts, he led his forces to victory against rebels and invadingarmies. Following the Turkish triumph at the two major battles at Inonu in Western Turkey,the Grand National Assembly conferred on Mustafa Kemal Pasha the title ofCommander-in-Chief with the rank of Marshal.</p>
              </div>
            </div>
            <div className="timeline-item" data-text="THE PARENT TRAP">
              <div className="timeline__content">
                <img className="timeline__img" src="assets/images/brunch.jpg"/>
                <h2 className="timeline__content-title">2016</h2>
                <p className="timeline__content-desc">On April 23, 1920, the GrandNational Assembly was inaugurated. Mustafa Kemal Pasha was elected to its Presidency. Fighting on many fronts, he led his forces to victory against rebels and invadingarmies. Following the Turkish triumph at the two major battles at Inonu in Western Turkey,the Grand National Assembly conferred on Mustafa Kemal Pasha the title ofCommander-in-Chief with the rank of Marshal.</p>
              </div>
            </div>
            <div className="timeline-item" data-text="ENGAGEMENT DAY">
              <div className="timeline__content">
                <img className="timeline__img" src="assets/images/ring.jpg"/>
                <h2 className="timeline__content-title">2017</h2>
                <p className="timeline__content-desc">On April 23, 1920, the GrandNational Assembly was inaugurated. Mustafa Kemal Pasha was elected to its Presidency. Fighting on many fronts, he led his forces to victory against rebels and invadingarmies. Following the Turkish triumph at the two major battles at Inonu in Western Turkey,the Grand National Assembly conferred on Mustafa Kemal Pasha the title ofCommander-in-Chief with the rank of Marshal.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="close">Close</div>
      </article>
    )
  }
}

export default Story;
