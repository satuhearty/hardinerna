import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import ReactTable from 'react-table';
import Modal from 'react-responsive-modal';

const MIN_WIDTH_FOR_RSVP_DETAILS = 50;

class App extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    data: [],
    open: false,
    currentData: {}
  };

  componentDidMount() {
    this.getGuestList();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  getGuestRsvpData = (rsvp) => {
    return rsvp
      ? <i className="fa fa-check" aria-hidden="true" style={{color: 'green'}} />
      : <i className="fa fa-times" aria-hidden="true" style={{color: 'red'}} />
  };

  getGuestList = () => {
    firebase.database().ref('rsvp').on('value', snapshot => {
      const guestList = [];
      const guests = snapshot.val();
      Object.keys(guests).forEach((key) => {
        const guest = guests[key];
        guestList.push({
          'name': guest.name,
          'invite': guest.invite,
          'rsvpAttending': guest.rsvpAttending,
          'origin': guest.origin,
          'arrivalDate': guest.arrivalDate,
          'attending': guest.attending,
          'extraGuests': guest.extraGuests
        });
      });
      this.setState({ data: guestList });
    });
  };

  getRsvpDisplay = (props) => {
    return props.value
      ? <i className="fa fa-check" aria-hidden="true" style={{color: 'green'}} />
      : <i className="fa fa-times" aria-hidden="true" style={{color: 'red'}} />
  };

  getRsvpFilters = (filter, onChange) => {
    return (
      <select
        onChange={e => onChange(e.target.value)}
        style={{width: '100%'}}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    );
  };

  filterRsvp = (filter, row) => {
    if (filter.value === 'all') {
      return true;
    } else {
      return filter.value === String(row[filter.id]);
    }
  };

  render() {
    const { data, currentData } = this.state;

    let headCount = 0;

    data.forEach(guest => {
      headCount += parseInt(guest.attending);
    });

    const columns = [
      {
        Header: 'First Name',
        accessor: 'name'
      },
      {
        Header: 'Invite',
        accessor: 'invite'
      },
      {
        Header: 'Attending',
        accessor: 'rsvpAttending',
        minWidth: MIN_WIDTH_FOR_RSVP_DETAILS,
        Cell: props => this.getRsvpDisplay(props),
        Filter: ({ filter, onChange }) => this.getRsvpFilters(filter, onChange),
        filterMethod: (filter, row) => this.filterRsvp(filter, row)
      },
      {
        Header: 'Origin',
        accessor: 'origin'
      },
      {
        Header: 'Arrival Date',
        accessor: 'arrivalDate'
      },
      {
        Header: 'Pax',
        accessor: 'attending',
        minWidth: MIN_WIDTH_FOR_RSVP_DETAILS
      }
    ];

    return (
      <div>
        <div className="box">
          Head Count:<br />
          <h2>{headCount}</h2>
        </div>
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().indexOf(String(filter.value).toLowerCase()) !== -1}
          getTdProps={(state, rowInfo) => {
            return {
              onClick: (e, handleOriginal) => {
                this.setState({ currentData: rowInfo.original });
                this.onOpenModal();
                if (handleOriginal) {
                  handleOriginal()
                }
              }
            }
          }}
          columns={columns}
          defaultPageSize={50}
          className='-striped -highlight'
        />
        <Modal open={this.state.open} onClose={this.onCloseModal} little>
          <div style={{textAlign: 'center', padding: '25px 15px'}}>
            <h2>Guest Details</h2>
            <p style={{ margin: 0 }}><strong>Name:</strong> {currentData.name}</p>
            <p style={{ margin: 0 }}><strong>Invite:</strong> {currentData.invite}</p>
            <p style={{ margin: 0 }}><strong>Attending:</strong> {this.getGuestRsvpData(currentData.rsvpAttending)}</p>
            <p style={{ margin: 0 }}><strong>Origin:</strong> {currentData.origin}</p>
            <p style={{ margin: 0 }}><strong>Arrival Date:</strong> {currentData.arrivalDate}</p>
            <p style={{ margin: 0 }}><strong>Pax:</strong> {currentData.attending}</p>
            {currentData.extraGuests && currentData.extraGuests.map((guest, index) => {
              return (
                <p style={{ margin: 0 }} key={index}><strong>Guest {index + 1}:</strong> {guest}</p>
              )
            })}
          </div>
        </Modal>
      </div>
    );
  }
}

render(<App />, document.getElementById('guestlist'));
