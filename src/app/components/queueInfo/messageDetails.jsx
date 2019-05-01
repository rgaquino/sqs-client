import React, { Component, Fragment } from 'react';

class MessageDetails extends Component {
  render() {
    return (
      <Fragment>
        <div className="card">
          <div className="card-header">
            Message ID: 5a4a8052-8304-4d91-b9f8-1963b3f1eb27
            <a href="#" className="btn-sm btn-danger float-right">Delete</a>
          </div>
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up
              the bulk of the card content.</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MessageDetails;
