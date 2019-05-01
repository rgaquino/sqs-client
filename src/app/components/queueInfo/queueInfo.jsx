import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import log from 'electron-log';

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
    const messageList = messages.map(m => (
      <div className="col-md-12">
        <MessageDetails key={m.id} id={m.id} body={m.body} />
      </div>
    ));

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Link to="/" className="btn"><h2>{this.state.queue}</h2></Link>
              <button className="btn btn-danger" onClick={this.deleteQueue}>Delete</button>
              <button className="btn btn-warning" onClick={this.clearMessages}>Purge</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <SendMessage queue={this.state.queue} />
            </div>
          </div>
          <div className="row">
            { messageList }
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
  message: PropTypes.shape({
    messages: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps, { deleteQueue, getQueue, clearMessages })(QueueInfo);
