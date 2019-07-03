import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import QueueListItem from './queueListItem';
import { getQueues } from '../../actions/queueActions';

class QueueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
    };
    this.searchFilterChange = this.searchFilterChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getQueues();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getQueues(this.state.q);
  }

  searchFilterChange(e) {
    this.setState({ q: e.target.value });
  }

  render() {
    const { queues } = this.props.queue;

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center">
                <Link to="/" className="btn"><h1>SQS Client</h1></Link>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    onChange={this.searchFilterChange}
                    value={this.state.q}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">Search</button>
                  </div>
                </div>
              </form>
              <ul className="list-group">
                {queues.map(q => <QueueListItem key={q} queue={q} />)}
              </ul>
              <Link to="/create" className="btn btn-primary btn-block mt-4">New Queue</Link>
              <Link to="/config" className="btn btn-secondary btn-block mt-4">Configuration</Link>
            </div>
          </div>
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
