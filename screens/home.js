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

import { connect } from 'react-redux'

import { CONFIG } from '../constants/index'
import { Icon } from 'react-native-elements'


class HomeScreen extends React.Component {
  state = {
    video: [],
    search : '',
    isSearch : false,
    favorite: []
  }



  static navigationOptions = ({navigation}) => {
    const { state, setParams, navigate } = navigation;
    // const params = state.params || {};

    return {
      headerTitle: 'YouTube',
      headerStyle: {
        backgroundColor: '#ff0000'
      },
      headerTitleStyle: {
        color: '#fff'
      },
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 20 }}>
        <Icon
        name='search'
        type='font-awesome'
        onPress={() => state.params.search()} />

        <Icon

        name='heartbeat'
        type='font-awesome'
        onPress={() => state.params.goToFavorite()} />

        <Icon
        name='user'
        type='font-awesome'
        onPress={() => console.log('fonctionnalité pas encore developper')} />

        <Icon
        name='settings'
        onPress={() => navigation.navigate("settings")} />

        < /View>

      )
    }


  }


  componentDidMount(){
    // fetch(`${CONFIG.YOUTUBE.BASE_URL}/search/?key=${CONFIG.YOUTUBE.API_KEY}&part=snippet,id&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}&regionCode=FR`)

    fetch(`${CONFIG.YOUTUBE.BASE_URL}/search/?key=${CONFIG.YOUTUBE.API_KEY}&part=snippet,id&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}&regionCode=FR`)
    .then(res => res.json())
    .then(res => {
      const video = []
      res.items.forEach(item => {
        video.push(item)
      })
      this.setState({
        video: video
      })
    })
    .catch(error => {
      console.error(error)
    })

    this.props.navigation.setParams({
      search: this._search,
      goToFavorite : this.goToFavorite
    })
  }

  // test
  goToFavorite = ( )  => {
    this.props.navigation.navigate("favorite", {favorite : this.state.favorite } )
  };
  // finTest

  // test
  goToSee = ( id , header )  => {
    let link = "https://www.youtube.com/watch?v="+id
    this.props.navigation.navigate("video", {link, header} )
  };
  // finTest
  // test
  _search  = ()  => {
    if (this.state.isSearch) {
      this.setState({isSearch : false})

    }
    else {
      this.setState({isSearch : true})
    }
  };

  GoFavorite  = (index)  => {

    Alert.alert(
            'Likez la video ',
            'Etes vous sur de vouloir enregistrer la video',
            [
              {text: 'Cancel',  valuer : true },

                {text: 'OK',  onPress: () => {
                  favorite = [...this.state.favorite]
                  favorite.push(this.state.video[index])
                  this.setState({favorite})
                }},
            ],
            { cancelable: false }
        )



  };



  Buttonsearch = ( )  => {
    fetch(`${CONFIG.YOUTUBE.BASE_URL}/search/?key=${CONFIG.YOUTUBE.API_KEY}&part=snippet,id&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}&q=${this.state.search}`)
    .then(res => res.json())
    .then(res => {
      const video = []
      res.items.forEach(item => {
        video.push(item)
      })
      this.setState({
        video: video
      })
    })
    .catch(error => {
      console.error(error)
    })

    console.log(this.state.search)
  };

  _toggleSearch(){
    if (this.state.isSearch) {
      return (
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(search) => this.setState({search})}
        value={this.state.text}
        onEndEditing={() => this.Buttonsearch( )}
        placeholder = "Recherchez"
        />
      )
    }
  }
  // finTest
  render() {


    return (

      <View style={styles.container}>
      {this._toggleSearch()}
      <ScrollView>
      <View style={styles.body}>
      {this.state.video.map((item, index) =>
        <TouchableOpacity  style={styles.card} key={item.id.videoId} onPress={() => this.goToSee(item.id.videoId , item.snippet.title )}  onLongPress={() => this.GoFavorite(index)}>
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

function mapStateToProps(state) {
  return {
    test: state.test
  }
}
export default connect(mapStateToProps)(HomeScreen)

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
