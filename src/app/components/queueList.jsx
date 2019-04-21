import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QueueListItem from './queueListItem';
import { getQueues } from '../actions/queueActions';

class QueueList extends Component {
  componentDidMount() {
    this.props.getQueues();
  }

  render() {
    const { queues } = this.props.queue;

    return (
      <ul className="list-group">
        {queues.map(q => <QueueListItem key={q} queue={q} />)}
      </ul>
    );
  }
}

QueueList.propTypes = {
  getQueues: PropTypes.func.isRequired,
  queue: PropTypes.shape({
    queues: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = state => ({
  queue: state.queue,
});

export default connect(mapStateToProps, { getQueues })(QueueList);
