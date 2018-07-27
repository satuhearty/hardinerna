import React, { Component } from 'react';
import {render} from 'react-dom';
import * as firebase from 'firebase';
import config from './components/firebase-config';
import ReactTable from 'react-table';
import Modal from 'react-responsive-modal';

const MIN_WIDTH_FOR_RSVP_DETAILS = 50;
const RSVP_CODE_SINGLE = 'S0109';
const RSVP_CODE_PLUS_ONE = 'P0109';
const RSVP_CODE_FAMILY = 'F0109';

class App extends Component {
  constructor() {
    super();
    firebase.initializeApp(config);
  }

  state = {
    data: [],
    open: false,
    currentData: {},
    headCount: 0
  };

  componentDidMount() {
    this.getGuestList();
    this.setHeadCount();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  setHeadCount = () => {
    let headCount = 0;
    this.reactTable.getResolvedState().sortedData.forEach(guest => {
      headCount += parseInt(guest.attending);
    });
    this.setState({ headCount });
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
      let index = 0;
      let headCount = 0;
      Object.keys(guests).forEach((key) => {
        const guest = guests[key];
        guestList.push({
          'index': ++index,
          'code': guest.code,
          'name': guest.name,
          'invite': guest.invite,
          'rsvpAttending': guest.rsvpAttending,
          'origin': guest.origin,
          'arrivalDate': guest.arrivalDate,
          'attending': guest.attending,
          'extraGuests': guest.extraGuests
        });
        headCount += parseInt(guest.attending);
      });
      this.setState({ data: guestList, headCount  });
    });
  };

  getCodeDisplay = (props) => {
    switch (props.value) {
      case RSVP_CODE_PLUS_ONE:
        return 'Plus 1';
      case RSVP_CODE_FAMILY:
        return 'Family';
      default:
        return 'Single';
    }
  };

  getCodeFilters = (filter, onChange) => {
    return (
      <select
        onChange={e => onChange(e.target.value)}
        style={{width: '100%'}}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">All</option>
        <option value={RSVP_CODE_SINGLE}>Single</option>
        <option value={RSVP_CODE_PLUS_ONE}>Plus 1</option>
        <option value={RSVP_CODE_FAMILY}>Family</option>
      </select>
    );
  };

  filterCode = (filter, row) => {
    if (filter.value === 'all') {
      return true;
    } else {
      return filter.value === String(row[filter.id]);
    }
  };

  getInviteDisplay = (props) => {
    return props.value.charAt(0).toUpperCase() + props.value.slice(1);
  };

  getInviteFilters = (filter, onChange) => {
    return (
      <select
        onChange={e => onChange(e.target.value)}
        style={{width: '100%'}}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">All</option>
        <option value="groom">Groom</option>
        <option value="bride">Bride</option>
        <option value="both">Both</option>
      </select>
    );
  };

  filterInvite = (filter, row) => {
    if (filter.value === 'all') {
      return true;
    } else {
      return filter.value === String(row[filter.id]);
    }
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
    const { data, currentData, headCount } = this.state;

    const columns = [
      {
        Header: 'No.',
        accessor: 'index'
      },
      {
        Header: 'RSVP',
        accessor: 'code',
        Cell: props => this.getCodeDisplay(props),
        Filter: ({ filter, onChange }) => this.getCodeFilters(filter, onChange),
        filterMethod: (filter, row) => this.filterCode(filter, row)
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Invite',
        accessor: 'invite',
        Cell: props => this.getInviteDisplay(props),
        Filter: ({ filter, onChange }) => this.getInviteFilters(filter, onChange),
        filterMethod: (filter, row) => this.filterInvite(filter, row)
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
          ref={(r) => { this.reactTable = r; }}
          onFilteredChange={this.setHeadCount}
          getTdProps={(state, rowInfo) => {
            return {
              onClick: (e, handleOriginal) => {
                if (!rowInfo) {
                  return;
                }

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
