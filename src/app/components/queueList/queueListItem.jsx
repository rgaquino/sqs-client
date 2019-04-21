import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class QueueListItem extends Component {
  render() {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <Link to={`/queue/${this.props.queue}`}>{this.props.queue}</Link>
        <span className="badge badge-primary badge-pill">14</span>
      </li>
    );
  }
}

QueueListItem.propTypes = {
  queue: PropTypes.string.isRequired,
};

export default connect(null, null)(QueueListItem);
