import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteQueue } from '../../actions/queueActions';
import SendMessage from '../sendMessage/sendMessage';


class QueueInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: props.match.params.name,
    };
    this.deleteQueue = this.deleteQueue.bind(this);
  }

  deleteQueue() {
    this.props.deleteQueue(this.state.queue, this.props.history);
  }

  render() {
    return (
      <Fragment>
        <h2>{this.state.queue}</h2>
        <button className="btn" onClick={this.deleteQueue}>Delete</button>
        <Link to="/" className="btn">Back</Link>
        <SendMessage queue={this.state.queue} />
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
};

export default connect(null, { deleteQueue })(QueueInfo);
