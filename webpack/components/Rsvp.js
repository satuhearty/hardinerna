import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Notifications, {notify} from 'react-notify-toast';
import axios from 'axios';

const MODAL_TIMEOUT = 3000;
const RSVP_CODE = 'shafeeqnadia';

class Rsvp extends Component {
  state = {
    code: '',
    name: '',
    invite: '',
    arrivalDate: '',
    origin: '',
    attending: 0,
    extraGuests: [],
    rsvpAttending: false,
    open: false,
    showForm: true,
    formSubmitted: false,
    attendingArray: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {name, invite, rsvpAttending, arrivalDate, origin, attending, extraGuests} = this.state;
    const guest = {name, invite, rsvpAttending, arrivalDate, origin, attending, extraGuests};
    this.props.firebase.database().ref('rsvp').push(guest);
    axios.post('https://formspree.io/nikamirulmukmeen@gmail.com', guest);
    this.onOpenModal();
    setTimeout(() => {
      this.onCloseModal();
    }, MODAL_TIMEOUT);
    this.setState({ formSubmitted: true });
  };

  handleCodeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.code === RSVP_CODE) {
      this.createNotification('Success!', 'success');
      this.setState({ showForm: true });
    } else {
      this.createNotification('Incorrect RSVP Code.', 'error');
    }
  };

  createNotification = (message, type) => {
    notify.show(message, type, MODAL_TIMEOUT);
  };

  updateCode = (e) => {
    this.setState({ code: e.target.value });
  };

  updateName = (e) => {
    this.setState({ name: e.target.value });
  };

  updateGuests = (e) => {
    const extraGuests = this.state.extraGuests;
    const guestIndex = e.target.dataset.guestIndex;
    extraGuests[guestIndex] = e.target.value;
    this.setState({ extraGuests: extraGuests });
  };

  updateInvite = (e) => {
    this.setState({ invite: e.target.value });
  };

  updateRsvp = () => {
    this.setState({ rsvpAttending: !this.state.rsvpAttending });
  };

  updateOrigin = (e) => {
    this.setState({ origin: e.target.value });
  };

  updateArrivalDate = (e) => {
    this.setState({ arrivalDate: e.target.value });
  };

  updateAttending = (e) => {
    this.setState({
      attending: e.target.value,
      attendingArray: Array(e.target.value - 1).fill(1)
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, attending, attendingArray, showForm, formSubmitted, rsvpAttending } = this.state;

    return (
      <div>
        <Notifications />
        {!showForm &&
          <div>
            <header className="major">
              <h2>RSVP</h2>
            </header>
            <p>Please enter the RSVP code.</p>
            <form className="alt" method="post" action="">
              <div className="row uniform">
                <div className="12u$">
                  <input type="text" name="code" id="code" placeholder="RSVP Code" onChange={this.updateCode} />
                </div>
                <div className="12u$">
                  <ul className="actions">
                    <input type="submit" value="Submit" className="special" onClick={this.handleCodeSubmit} />
                  </ul>
                </div>
              </div>
            </form>
          </div>
        }
        {showForm &&
          <div>
            <header className="major">
              <h2>RSVP</h2>
            </header>
            <p>Let us know if you are coming!</p>
            <form method="post" action="">
              <div className="row uniform">
                <div className="12u$">
                  <input type="text" name="name" id="name" placeholder="Name *" onChange={this.updateName} />
                </div>
                <div className="12u$">
                  <div className="select-wrapper">
                    <select name="invite" id="invite" onChange={this.updateInvite}>
                      <option value="">Invitation? *</option>
                      <option value="bride">Bride - Erna Ghazali</option>
                      <option value="groom">Groom - Hardin Mohammad</option>
                      <option value="both">Both Bride & Groom</option>
                    </select>
                  </div>
                </div>
                <div className="12u$">
                  <h3>Attending?</h3>
                </div>
                <div className="6u 12u$(xsmall)">
                  <input type="radio" id="attending-yes" name="attending-yes" checked={rsvpAttending} onChange={this.updateRsvp} />
                  <label htmlFor="attending-yes">Yes</label>
                </div>
                <div className="6u 12u$(xsmall)">
                  <input type="radio" id="attending-no" name="attending-no" checked={!rsvpAttending} onChange={this.updateRsvp} />
                  <label htmlFor="attending-no">No</label>
                </div>
                {rsvpAttending &&
                  <div className="12u$">
                    <input type="text" name="origin" id="origin" placeholder="Where are you coming from? *" onChange={this.updateOrigin} />
                  </div>
                }
                {rsvpAttending &&
                  <div className="12u$">
                    <h3>Date of Arrival</h3>
                    <p>For the ones outside of Kuching.</p>
                    <input type="date" name="arrival" id="arrival" placeholder="Date of Arrival" onChange={this.updateArrivalDate} />
                  </div>
                }
                {rsvpAttending &&
                  <div className="12u$">
                    <div className="select-wrapper">
                      <select name="attending" id="attending" onChange={this.updateAttending}>
                        <option value=""># of pax</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                }
                {attendingArray.map((x, i) => {
                  return (
                    <div className="12u$" key={i}>
                      <input
                        type="text"
                        name={`guest-${i}`}
                        placeholder={`Guest ${i + 1} Name *`}
                        data-guest-index={i}
                        onChange={this.updateGuests}
                      />
                    </div>
                  )
                })}
                <div className="12u$">
                  <ul className="actions">
                    <li>
                      <input type="submit" value="RSVP" className="special" onClick={this.handleSubmit} disabled={formSubmitted} />
                    </li>
                  </ul>
                </div>
              </div>
            </form>
            <Modal
              open={open}
              onClose={this.onCloseModal}
              little
              classNames={{ overlay: 'custom-overlay', modal: 'custom-modal', closeIcon: 'custom-close' }}
            >
              <div style={{ textAlign: 'center', padding: '25px 15px' }}>
                <h2>RSVP sent successfully!</h2>
                <p style={{ textAlign: 'center', margin: 0 }}>{attending} people attending.</p>
              </div>
            </Modal>
          </div>
        }
      </div>
    )
  }
}

export default Rsvp;
