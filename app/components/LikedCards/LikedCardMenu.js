import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

const styles = require('./styles');




class LikedCardMenu extends Component {
  constructor(props){
    super(props)
  }

  facebookRSVP(eventId) {

    if (eventId !== "") {

      const rsvpRequestConfig = {
        httpMethod: 'POST',
        version: 'v2.5',
        parameters: {}
        //accessToken: token.toString()
      }
      const responseCallback = ((error, result) => {
          if (error) {
            console.log(error)
          } else {
            console.log(result)
          }
        });

      const rsvpRequest = new GraphRequest(
        '/'.concat(eventId, '/attending'),
        rsvpRequestConfig,
        responseCallback,
      )

      // Start the graph request.
      new GraphRequestManager().addRequest(rsvpRequest).start();

    }
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
              <TouchableOpacity onPress = {() => this.facebookRSVP(this.props.facebook_event_id)}>
                <View style={{width: 50, height: 50, borderRadius: 50/2, backgroundColor: this.props.buttonColor}}>
                  {/* <Image style={{width:20, height:20, margin:15}} source={require('../../assets/icons/share_blank.png')} /> */}
                  <Text style={{width: 40 ,fontSize:14, color:'#000000', marginLeft: 6, marginTop:15}}>RSVP</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress = {() => ''}>
                <View style={{width: 50, height: 50, borderRadius: 50/2, backgroundColor: this.props.buttonColor}}>
                  <Text style={{width: 30 ,fontSize:16, color:'#000000', marginLeft: 10, marginTop:15}}>{this.props.price}</Text>
                </View>
              </TouchableOpacity>
            </View>
      </View>
    )
  }
}

export default LikedCardMenu;
