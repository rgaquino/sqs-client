import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageDetails from './messageDetails';

class QueueMessages extends Component {
  render() {
    const messages = this.props.messages;
    return Object.keys(messages).reverse()
      .map(key => (
        <MessageDetails id={key} key={key} message={messages[key]} />
      ));
  }
}

QueueMessages.propTypes = {
  messages: PropTypes.object.isRequired,
};

export default QueueMessages;
