import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Test from './components/test';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h2>Welcome to React!</h2>
          <Test />
        </div>
      </Provider>
    );
  }
}

export default App;
