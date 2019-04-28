import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendMessage } from '../../actions/messageActions';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.props.queue, this.state.message);
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" name="message" rows="3" onChange={this.onChange} />
            <input type="submit" value="Send Message" className="btn btn-info btn-block mt-4" />
          </div>
        </form>
      </Fragment>
    );
  }
}

SendMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  queue: PropTypes.string.isRequired,
};

export default connect(null, { sendMessage })(SendMessage);
