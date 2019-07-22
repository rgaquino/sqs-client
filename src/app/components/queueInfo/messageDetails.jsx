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
    log.info(`deleting ${this.props.id} from queue=${this.props.queue.queue}`);
    this.props.deleteMessage(this.props.queue.queue, this.props.id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
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
        </div>
      </div>
    );
  }
}

MessageDetails.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
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
