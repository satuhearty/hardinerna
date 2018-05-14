import React, { Component } from 'react';
import Slider from 'react-slick';

class Memories extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      lazyLoad: 'ondemand',
      arrows: false
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-1.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-2.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-3.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-4.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-5.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-6.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-7.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-8.jpg" alt=""/></span></div>
            </div>
          </div>
          <div className="box alt">
            <div className="row uniform 50%">
              <div className="12u"><span className="image fit"><img src="assets/images/album-9.jpg" alt=""/></span></div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default Memories;
