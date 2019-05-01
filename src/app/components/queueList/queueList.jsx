import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import QueueListItem from './queueListItem';
import { getQueues } from '../../actions/queueActions';

class QueueList extends Component {
  componentDidMount() {
    this.props.getQueues();
  }

  render() {
    const { queues } = this.props.queue;

    return (
      <Fragment>
        <div className="container-fluid">
          <input className="form-control" type="text" placeholder="Search..." />
          <ul className="list-group">
            {queues.map(q => <QueueListItem key={q} queue={q} />)}
          </ul>
          <Link to="/create" className="btn btn-primary btn-block mt-4">Create queue</Link>
        </div>
      </Fragment>
    );
  }
}

QueueList.propTypes = {
  getQueues: PropTypes.func.isRequired,
  queue: PropTypes.shape({
    queue: PropTypes.string,
    queues: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = state => ({
  queue: state.queue,
});

export default connect(mapStateToProps, { getQueues })(QueueList);
