import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

// import {
//   MKButton,
// } from 'react-native-material-kit';

const styles = require('./styles');




class LikedCardMenu extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View>
          <View style={styles.menuButtonContainer} >
              <TouchableOpacity onPress = {() => ''}>
                <View style={{width: 50, height: 50, borderRadius: 50/2, backgroundColor: this.props.buttonColor}}>
                  <Image style={{width:20, height:20, margin:15}} source={require('../../assets/icons/dislike_blank.png')} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => ''}>
                <View style={{width: 50, height: 50, borderRadius: 50/2, backgroundColor: this.props.buttonColor}}>
                  <Image style={{width:20, height:20, margin:15}} source={require('../../assets/icons/share_blank.png')} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => ''}>
                <View style={{width: 50, height: 50, borderRadius: 50/2, backgroundColor: this.props.buttonColor}}>
                  <Text style={{width: 30 ,fontSize:16, color:'#000000', marginLeft: 10, marginTop:15}}>$15</Text>
                </View>
              </TouchableOpacity>
            </View>
      </View>
    )
  }
}

export default LikedCardMenu;
