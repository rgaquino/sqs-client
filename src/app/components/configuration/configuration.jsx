import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getConnectionConfig, setConnectionConfig } from '../../actions/configActions';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessKeyId: '',
      secretAccessKey: '',
      region: '',
      endpoint: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getConnectionConfig();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.config) {
      this.setState({
        accessKeyId: nextProps.config.accessKeyId,
        secretAccessKey: nextProps.config.secretAccessKey,
        region: nextProps.config.region,
        endpoint: nextProps.config.endpoint,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.setConnectionConfig(this.state, this.props.history);
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center">
                <h2>Configuration</h2>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="accessKey">AWS Access Key</label>
                  <input
                    className="form-control"
                    name="accessKeyId"
                    placeholder="AWS Access Key"
                    onChange={this.onChange}
                    value={this.state.accessKeyId}
                  />
                  <small id="accessKeyHelp" className="form-text text-muted">
                    This is only stored locally.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="secretAccessKey">AWS Secret Access Key</label>
                  <input
                    className="form-control"
                    name="secretAccessKey"
                    placeholder="AWS Secret Access Key"
                    onChange={this.onChange}
                    value={this.state.secretAccessKey}
                  />
                  <small id="secretAccessKeyHelp" className="form-text text-muted">
                    This is only stored locally.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="region">Region</label>
                  <input
                    className="form-control"
                    name="region"
                    placeholder="Region"
                    onChange={this.onChange}
                    value={this.state.region}
                  />
                  <small id="regionHelp" className="form-text text-muted">
                    e.g. eu-west-2
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="endpoint">Endpoint</label>
                  <input
                    className="form-control"
                    name="endpoint"
                    placeholder="Endpoint"
                    onChange={this.onChange}
                    value={this.state.endpoint}
                  />
                  <small id="endpointHelp" className="form-text text-muted">
                    e.g. http://127.0.0.1:9324
                  </small>
                </div>
                <input type="submit" value="Connect" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Configuration.propTypes = {
  getConnectionConfig: PropTypes.func.isRequired,
  setConnectionConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  config: state.config.connection,
});

const mapDispatchToProps = { getConnectionConfig, setConnectionConfig };

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
