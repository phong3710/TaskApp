/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import { Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import { typography } from './src/utils/typography'
import store from './src/store/store';
import { NativeBaseProvider } from 'native-base';

typography();
const AppWrapper = () => {
    return(
    <Provider store={store}>
      <NativeBaseProvider>
        <App/>
      </NativeBaseProvider>
    </Provider>
    )
  }
AppRegistry.registerComponent(appName, () => AppWrapper);
