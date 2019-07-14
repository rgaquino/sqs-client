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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.onSubmit}>
                <div className="d-flex justify-content-center">
                  <Link to="/queues" className="btn"><h2>New Queue</h2></Link>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Queue Name</label>
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Queue Name"
                    onChange={this.onChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Only alphanumeric characters allowed.
                  </small>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                <Link to="/queues" className="btn btn-secondary btn-block">Back</Link>
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
  history: PropTypes.object.isRequired,
};

export default connect(null, { createQueue })(CreateQueue);
