import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import log from 'electron-log';

import { deleteMessage } from '../../actions/messageActions';

class MessageDetails extends Component {
  constructor(props) {
    super(props);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage() {
    log.info('Message deleted!');
  }

  render() {
    return (
      <Fragment>
        <div className="card">
          <div className="card-header">
            <span>Message ID: {this.props.id}</span>
            <button className="btn-sm btn-danger float-right" onClick={this.deleteMessage}>
              Delete
            </button>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.body}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

MessageDetails.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default connect(null, { deleteMessage })(MessageDetails);
