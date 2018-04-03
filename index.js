import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import RouterComponent from './src/Router';


class index extends Component {
  render() {
    return (
     <Provider store={createStore(reducers)}>
      <View style={{ flex: 1, marginBottom: 20, }} >
        <RouterComponent />
      </View>
     </Provider>
    );
  }

}

AppRegistry.registerComponent('reminder', () => index);
