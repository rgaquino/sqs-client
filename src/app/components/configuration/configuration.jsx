import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessKey: '',
      secretAccessKey: '',
      region: '',
      endpoint: '',
    };
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //
  // onSubmit(e) {
  //   e.preventDefault();
  //   // this.props.createQueue(this.state.name, this.props.history);
  // }

  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <form>
                <div className="d-flex justify-content-center">
                  <Link to="/" className="btn"><h2>Configuration</h2></Link>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">AWS Access Key</label>
                  <input
                    className="form-control"
                    name="accessKey"
                    placeholder="AWS Access Key"
                    onChange={this.onChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    This is only stored locally.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">AWS Secret Access Key</label>
                  <input
                    className="form-control"
                    name="secretAccessKey"
                    placeholder="AWS Secret Access Key"
                    onChange={this.onChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    This is only stored locally.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Region</label>
                  <input
                    className="form-control"
                    name="region"
                    placeholder="Region"
                    onChange={this.onChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    e.g. eu-west-2
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Endpoint</label>
                  <input
                    className="form-control"
                    name="endpoint"
                    placeholder="Endpoint"
                    onChange={this.onChange}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    e.g. http://127.0.0.1:9324
                  </small>
                </div>
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

export default Configuration;
