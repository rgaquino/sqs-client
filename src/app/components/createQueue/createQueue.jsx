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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.onSubmit}>
                <input
                  className="form-control"
                  name="name"
                  placeholder="Queue Name"
                  onChange={this.onChange}
                />
                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                <Link to="/" className="btn btn-secondary btn-block">Back</Link>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

CreateQueue.propTypes = {
  createQueue: PropTypes.func.isRequired,
};

export default connect(null, { createQueue })(CreateQueue);
