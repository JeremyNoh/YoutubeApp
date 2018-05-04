import React from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    WebView,

    AsyncStorage
} from 'react-native';

export default class VideoScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
      return {
        title: params.header,
      };
    };


    render() {
      const { params } = this.props.navigation.state;

      const link = params ? params.link : null;
      const header = params ? params.header : null;


      return(
        <WebView
          source={{uri: `${link}`}}
          style={{marginTop: 20}}
        />

      );
    }



}
