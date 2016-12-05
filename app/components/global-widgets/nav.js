import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

const styles = require('./styles')

export default class Nav extends Component {

  home(){
    return (
      <View  style={styles.container}>
        <TouchableOpacity>
          <Image source = {{uri: this.props.picture_url}} style={styles.profileImageCircle}></Image>
        </TouchableOpacity>
        <Text style={{fontSize:12, fontWeight:'300', color:'#444', margin:5}}>{this.props.name}</Text>
      </View>
    );
  }
  profile(){
    return (
      <View  style={styles.container}>
      <TouchableOpacity onPress ={this.props.onPress}>
        <Image source ={require('../../assets/images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
      </TouchableOpacity>
      </View>
    );
  }
  likedlist(){
    return (
      <View  style={styles.likedlistContainer}>
      <TouchableOpacity onPress ={this.props.onPress}>
        <Icon name="arrow-back" color='rgb(0,0,0)' height="25" style={{fontSize: 30, margin: 10}} />
      </TouchableOpacity>
      <View style = {{width:25, height:25, margin:10}}/>
      </View>
    );
  }
  render() {
    if(this.props.type == "message"){
        return (
          <View>{this.message()}</View>
        );}
        else if (this.props.type == "profile"){
          return (
          <View>{this.profile()}</View>
        );}
        else if (this.props.type == "likedlist"){
          return (
          <View>{this.likedlist()}</View>
        );}
        else{
        return (
          <View>{this.home()}</View>
        );}
  }
}
