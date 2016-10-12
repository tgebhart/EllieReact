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

export default class Nav extends Component {

  home(){
    return (
      <View  style={styles.container}>
        <TouchableOpacity  onPress ={this.props.toProfile}>
          <Iconz name="ios-person" color ="#888" size={30} style={{margin:5}}></Iconz>
        </TouchableOpacity>
        <Text style={{fontSize:12, fontWeight:'300', color:'#444', margin:5}}>Bruce Wayne</Text>
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
  message(){
    return (
      <View  style={styles.container}>
      <TouchableOpacity onPress ={this.props.onPress}>
      <Image source = {require('../../assets/images/tinder.png')} style = {{width:25, height:25, margin:10}}/>
      </TouchableOpacity>
      <Image source ={require('../../assets/images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
      <View style = {{width:25, height:25, margin:10}}/>
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
    console.log(this.props)
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

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection:'row',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
  likedlistContainer: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  }
});
