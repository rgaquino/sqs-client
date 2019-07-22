import React, { Component } from 'react';
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
    log.info(`deleting ${this.props.id} from queue=${this.props.queue.queue}`);
    this.props.deleteMessage(this.props.queue.queue, this.props.id);
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card mb-3">
          <div className="card-header">
            <button className="btn-sm btn-danger float-right" onClick={this.deleteMessage}>
              Delete
            </button>
            <span>Message ID: {this.props.id}</span>
            <br />
            <span>Sent on: {this.props.message.timestamp}</span>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.message.body}</p>
          </div>
        </div>
      </div>
    );
  }
}

MessageDetails.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  queue: PropTypes.shape({
    queue: PropTypes.string,
    queues: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = state => ({
  queue: state.queue,
});

export default connect(mapStateToProps, { deleteMessage })(MessageDetails);
