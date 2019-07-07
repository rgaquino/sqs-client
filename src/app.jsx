import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import QueueList from './app/components/queueList';
import CreateQueue from './app/components/createQueue';
import QueueInfo from './app/components/queueInfo';

import { configureStore, history } from './store';
import { initConfig } from './app/config/configStore';
import Configuration from './app/components/configuration';

const store = configureStore();

class App extends Component {

  componentWillMount() {
    initConfig();
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={QueueList} />
            <Route exact path="/config" component={Configuration} />
            <Route exact path="/create" component={CreateQueue} />
            <Route exact path="/queue/:name" component={QueueInfo} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
