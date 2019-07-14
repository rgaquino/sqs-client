import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteQueue, getQueue } from '../../actions/queueActions';
import { clearMessages } from '../../actions/messageActions';
import SendMessage from './sendMessage';
import MessageDetails from './messageDetails';


class QueueInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: props.match.params.name,
    };
    this.deleteQueue = this.deleteQueue.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
  }

  componentWillMount() {
    this.props.getQueue(this.state.queue);
  }

  deleteQueue() {
    this.props.deleteQueue(this.state.queue, this.props.history);
  }

  clearMessages() {
    this.props.clearMessages(this.state.queue);
  }

  render() {
    const { messages } = this.props.message;
    const messageList = Object.keys(messages)
      .map(key => (
        <div key={key} className="col-md-12">
          <MessageDetails id={key} body={messages[key]} />
        </div>
      ));

    return (
      <Fragment>
        <div className="container-fluid">
          {/* Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex justify-content-center">
                <Link to="/queues" className="btn"><h2>Queue Information</h2></Link>
              </div>
            </div>
          </div>
          {/* Queue Information */}
          <div className="row">
            <div className="col-sm-12">
              <form>
                <div className="form-group row">
                  <label htmlFor="queueName" className="col-sm-2 col-form-label">Name:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      name="queueName"
                      onChange={this.onChange}
                      value={this.state.queue}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="queueName" className="col-sm-2 col-form-label">Count:</label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      name="queueName"
                      onChange={this.onChange}
                      value="14"
                      readOnly
                    />
                  </div>
                </div>
                {/* TODO: Add more information */}
              </form>
            </div>
          </div>
          {/* Queue Action Buttons */}
          <div className="row mb-4">
            <div className="col-sm-6">
              <button className="btn btn-danger btn-block" onClick={this.deleteQueue}>
                Delete
              </button>
            </div>
            <div className="col-sm-6">
              <button className="btn btn-warning btn-block" onClick={this.clearMessages}>
                Purge
              </button>
            </div>
          </div>
          {/* Message Box */}
          <div className="row">
            <div className="col-md-12">
              <SendMessage queue={this.state.queue} />
            </div>
          </div>
          {/* Message Box */}
          <div className="row">
            {messageList}
          </div>
        </div>
      </Fragment>
    );
  }
}

QueueInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  deleteQueue: PropTypes.func.isRequired,
  getQueue: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps, { deleteQueue, getQueue, clearMessages })(QueueInfo);
