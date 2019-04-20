import React, { Component } from 'react';
import axios from 'axios';
import log from 'electron-log/electron-log';

class QueueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queues: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5010/queues')
      .then((res) => {
        this.setState({
          queues: res.data.queues,
        });
      })
      .catch((err) => {
        log.error(err);
      });
  }

  render() {
    return (
      <ul className="list-group">
        {this.state.queues.map(queue =>
          (<li
            key={queue}
            className="list-group-item d-flex justify-content-between align-items-center"
          >{queue}
            <span className="badge badge-primary badge-pill">14</span>
          </li>))}
      </ul>
    );
  }
}

export default QueueList;
