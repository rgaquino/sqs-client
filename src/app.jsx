import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import QueueList from './app/components/queueList/queueList';
import CreateQueue from './app/components/createQueue/createQueue';
import QueueInfo from './app/components/queueInfo/queueInfo';

import { configureStore, history } from './store';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={QueueList} />
            <Route exact path="/create" component={CreateQueue} />
            <Route exact path="/queue/:name" component={QueueInfo} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
