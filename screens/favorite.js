import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  WebView,
  TextInput,
  AsyncStorage
} from 'react-native';

export default class FavoriteScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
      return {
        title: 'Favorite',
      };
    };

    PasDeVideo(favorite){
      if (favorite.length === 0) {
          <Text style={{marginTop : 10}}>Vous n'avez pas de video</Text>
      }
    }

    render() {
      const { params } = this.props.navigation.state;

      const favorite = params ? params.favorite : [];

      if (favorite.length === 0) {
        return (
          <View style={styles.container}>
            <Text style={{marginTop : 10}}>Vous n'avez pas de video Likez</Text>
          </View>
        )

      }

      return (
        <View style={styles.container}>
        <ScrollView>
        <View style={styles.body}>
        {favorite.map((item) =>
          <TouchableOpacity  style={styles.card} key={item.id.videoId} >
          <View >
          <Image
          source={{uri: item.snippet.thumbnails.medium.url}}
          style={{width: 300, height: 150}}/>
          <View >
          <Text style={{marginTop : 10}}>{item.snippet.title}</Text>
          </View>
          </View>
          </TouchableOpacity>
        )}
        </View>
        </ScrollView>


        </View>
      )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30
  },
  card : {
    marginBottom: 50,

  },

})
