import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createQueue } from '../../actions/queueActions';

class CreateQueue extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createQueue(this.state.name, this.props.history);
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} name="name" placeholder="Queue Name" />
          <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
        </form>
        <Link to="/">Back</Link>
      </Fragment>
    );
  }
}

CreateQueue.propTypes = {
  createQueue: PropTypes.func.isRequired,
};

export default connect(null, { createQueue })(CreateQueue);
