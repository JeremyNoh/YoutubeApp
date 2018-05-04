import React from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import  HomeScreen  from './screens/home';
import  VideoScreen  from './screens/video';
import  SettingScreen  from './screens/settings';
import FavoriteScreen from './screens/favorite';

import { Provider } from 'react-redux'
import { createStore } from 'redux'


const initial_state = {
  isSearch : false
}


function reducer(prev_state = initial_state, action) {
  switch (action.type) {

    case 'SEARCH' :
      return Object.assign({}, prev_state , {
          isSearch: true
        })



  }
  return prev_state
}


const RootStack = StackNavigator(
    {
        home: {
            screen: HomeScreen,
        },
        video: {
            screen: VideoScreen,
        },
        settings: {
            screen: SettingScreen,
        },
        favorite: {
            screen: FavoriteScreen,
        }
    },
);

const store = createStore(reducer)


export default class App extends React.Component {
    render() {
        return (
          <Provider store={store}>
          <RootStack />
          </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
