import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Story from './Story';
import Event from './Event';
import Photos from './Photos';

const DELAY_TIME = 325;

class MainApp extends Component {
  state = {
    showHeaderFooter: true,
    showMain: false,
    showAbout: false,
    showStory: false,
    showEvent: false,
    showPhotos: false,
    isAboutActive: false,
    isStoryActive: false,
    isEventActive: false,
    isPhotosActive: false,
    locked: false
  };

  componentDidMount() {
    setTimeout(() => {
      document.getElementsByTagName('body')[0].classList.remove('is-loading');
    }, 100);
  }

  showSection = (sectionName, initial) => {
    const body = document.getElementsByTagName('body')[0];
    if (this.state.locked || typeof initial !== 'undefined' && initial === true) {
      body.classList.add('is-switching');
      body.classList.add('is-article-visible');
      this.setState({
        showAbout: false,
        showStory: false,
        showEvent: false,
        showPhotos: false
      });
      const setState = {
        showHeaderFooter: false,
        showMain: true,
        locked: false
      };
      switch (sectionName) {
        case 'about':
          setState.showAbout = true;
          break;
        case 'story':
          setState.showStory = true;
          break;
        case 'event':
          setState.showEvent = true;
          break;
        case 'photos':
          setState.showPhotos = true;
          break;
        default:
          break;
      }
      this.setState(setState);
      setTimeout(() => {
        body.classList.remove('is-switching');
      }, (initial ? 1000 : 0));
      return;
    }

    this.setState({ locked: true });

    if (body.classList.contains('is-article-visible')) {
      this.setState({
        showAbout: false,
        showStory: false,
        showEvent: false,
        showPhotos: false
      });
      setTimeout(() => {
        const setState = {};
        switch (sectionName) {
          case 'about':
            setState.showAbout = true;
            break;
          case 'story':
            setState.showStory = true;
            break;
          case 'event':
            setState.showEvent = true;
            break;
          case 'photos':
            setState.showPhotos = true;
            break;
          default:
            break;
        }
        this.setState(setState);
        setTimeout(() => {
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.setState({ locked: false });
          }, DELAY_TIME);
        }, 25);
      }, DELAY_TIME)
    } else {
      body.classList.add('is-article-visible');
      setTimeout(() => {
        const setState = {
          showHeaderFooter: false,
          showMain: true
        };
        switch (sectionName) {
          case 'about':
            setState.showAbout = true;
            break;
          case 'story':
            setState.showStory = true;
            break;
          case 'event':
            setState.showEvent = true;
            break;
          case 'photos':
            setState.showPhotos = true;
            break;
          default:
            break;
        }
        this.setState(setState);
        setTimeout(() => {
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.setState({ locked: false });
          }, DELAY_TIME);
        }, 25);
      }, DELAY_TIME);
    }
  };

  hideSection = (addState) => {
    const body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains('is-article-visible')) {
      return;
    }
    if (typeof addState !== 'undefined' && addState === true) {
      history.pushState(null, null, '#');
    }

    if (this.state.locked) {
      body.classList.add('is-switching');
      this.setState({
        isAboutActive: false,
        isStoryActive: false,
        isEventActive: false,
        isPhotosActive: false,
        showHeaderFooter: true,
        showMain: false,
        showAbout: false,
        showStory: false,
        showEvent: false,
        showPhotos: false
      });
      body.classList.remove('is-article-visible');
      this.setState({ locked: false });
      body.classList.remove('is-switching');
      window.scrollTo(0, 0);
      return;
    }

    this.setState({ locked: true });

    this.setState({
      isAboutActive: false,
      isStoryActive: false,
      isEventActive: false,
      isPhotosActive: false
    });

    setTimeout(() => {
      this.setState({
        showAbout: false,
        showStory: false,
        showEvent: false,
        showPhotos: false,
        showMain: false,
        showHeaderFooter: true
      });
      setTimeout(() => {
        body.classList.remove('is-article-visible');
        window.scrollTo(0, 0);
        setTimeout(() => {
          this.setState({ locked: false });
        }, DELAY_TIME);
      }, 25);
    }, DELAY_TIME);
  };

  render() {
    const {
      showHeaderFooter, showMain, showAbout, showStory, showEvent, showPhotos,
      isAboutActive, isStoryActive, isEventActive, isPhotosActive
    } = this.state;
    return (
      <div id="wrapper">
        {showHeaderFooter &&
          <Header showSection={this.showSection} />
        }
        {showMain &&
          <div id="main">
            {showAbout &&
              <About isActive={isAboutActive} />
            }
            {showStory &&
              <Story isActive={isStoryActive} />
            }
            {showEvent &&
              <Event isActive={isEventActive} />
            }
            {showPhotos &&
              <Photos isActive={isPhotosActive} />
            }
          </div>
        }
        {showHeaderFooter &&
          <Footer />
        }
      </div>
    )
  }
}

export default MainApp;
