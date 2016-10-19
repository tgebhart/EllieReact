import React, { Component } from 'react';
import {

  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Nav from './global-widgets/nav'
import FlipCard from 'react-native-flip-card'
import LoginButton from './LoginButton/LoginButton'

import apigClient from '../lib/ellieAPI/apigClient'


export default class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      friends: 1098,
      accessKey: '',
      secretKey: '',
      sessionToken: '',
      region: 'us-west-2'
    }

  }

  getEventInfo() {
    var agc = new apigClient({
       accessKey: "ASIAILEBVUTQQPCAO4KQ",
       secretKey: "gnLyG0XDoco+tSqes2lmdMGvo7jdSS9Ue4iJkYZG",
       sessionToken: "AgoGb3JpZ2luEE8aCXVzLXdlc3QtMiKAAhBt6zQ3nnSZ9ZjtRm+KqmSBmYnIMwQIQ1cTlqsZc5yvJ3GJaUUWs6P4LktYThP5ojEyY5S6sz44pqpPhh/SqWpClK2YTlVXl9Mf5AexN5Muw5px999vxTrARf7nHTf4GVRPQvSR1yjpVwfgBs8z1umNNKOavYnTd9DtEaB8P72sEoIg8D+98sWnrILnGle+mZCE0e4kEWFW5OSiHQCrdG6B7q0zhRunJDJRiOGGAbEqtpR4KhcPPtM+gclizph1+OmXPOK/ASZsQxLxI6YougElzR1pF2upaoU0QTRocQxVGQ/fgrEBVYDrB24fq18WUH6ofH4V9jxS1DC7MvbgowcqywQIJRAAGgw2ODI2NzY2NTk0ODQiDAt9WjvSKA+/ynWTMCqoBMn4WKy528YEIpNwvxLa0BGiKYNqITJfzFunBJwZJM+vSjj9DHOpoZTNLy8uvQcxbYMzWS/M1A1PD7Chs6vBPDrycDhbbx3E4F22vjcDcWvq5pIVdFf5CUf89+2wyeg6sn7Kj3Nfn8y7lpLAJhkRAP0HRS19AkOBhX+dPDeEnHqvMYaBVyVqH1ovkHdVVofVr+DfeH1OxZsaQZuF9s80ApU7ZHzSVynlOagqCkabG8PZg6/acHa6NJ9kAV4YJoryY/64xWAo2v8qcaByhx2VsVnHZPOs7n7tvG6qjNh+5FUK1WhGXeybk0b6HRXcD02vZJJ2aS0dpupuPjHHaqH+tsuKzp+0/kRsZUpX/wZ8JQKLSh16sN7KuNKjWS1+4VOk/qwNabMRml9InJSoXbPtOTFreWyOalIggZmjBSynaz+gJiNUzFjBhyBDk/FXXUlcQq+74UUJoK9AEPezIJz3LVum6Bj2z0Qixt8pf+zLMvTq6MPEQ/7xkf9fOnJkO+PqXxTMHtsvi0b9mD7xN5KezHiJJkhfTBDXz+x6IkwOwFz+brXHgNUos/9hJMHdGYdbo4qLj/t4QD+j5stxRAQS/6578Smsj556XZbZ69FvzJLzM6WrKBbX1Pmf1QnNdBJzj5pBybxNaQYeqvxXkNvV0Ij5WRq8pd+79KbJ82IZzOLlvjMZqwnVNbSU636eIXzDNRqt91cTbL9PBO0lvkUW/JQm18pnDVI0JTD11ZvABQ==",
       region: 'us-west-2'
     });

    var params = {};
    var body = {};
    var additionalParams = {
      headers: {},
      queryParams: {}
    };

    console.log(agc)

    agc.meGet(params, body, additionalParams)
     .then(function(result){
     console.log(result);
   }).catch((error) => {
     console.error(error);
   });
  }

  _onPressButtonPOST() {
    console.log("pressed")
      fetch('https://api.aivibe.com/fb-login/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fbat: 'EAAVw8nRhUZBsBAEOBCYl0ZAUfa09uHb5dm1wI452075R7Sk6WFUtX9MQ6xPU4llIOF68JDLPEMhURcAv68UCQiEHgHZAcYDmSX3aYCeQZCa8UHg3GUjWvUp25M02IupfPpZCywbISlRiHsjt2vKF7wGlNGgyAFQqmSYRhWpUojU39qLL5DvdhQXuTHMXZAvIc6ZBawVYgzTLFPRUYPZCG5eLVfTklZCkc58oZD',
          })
        }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }




  render() {
    return (
      <View style={{flex:1}}>
      <Nav  type = "profile" onPress = {() => this.props.navigator.replace({id:'home'})} />
      <ScrollView style={styles.container}>
      <LoginButton/>
      <Image source ={require('../assets/images/profile.png')} resizeMode="center" style={{height:350, width:width}} />
       <View style={[styles.row, {marginTop:15}]}>
       <Text style = {{fontSize:19, fontWeight:'400'}}>Bruce Wayne, </Text><Text style={{fontSize:21, fontWeight:'300', marginBottom:-2}}>23</Text>
       </View>
       <TouchableOpacity onPress={this.getEventInfo()} style={styles.button}>
        <Text>POST</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this._onPressButtonPOST()} style={styles.button}>
       <Text>Login</Text>
     </TouchableOpacity>

      <View style={styles.row}>
       <Text style={{color:'#444', fontSize:15}}>Same Sweater Productions</Text>
       </View>
       <View style={styles.row}>
       <Text style={{color:'#777', fontSize:11}}></Text>
       </View>
       <View style={styles.description}>
       <Text style={{color:'#555'}}>The hero Gotham deserves</Text>
       </View>
       <View style ={styles.commons}>
       <Text style = {styles.title}>
      {this.state.friends} Friends
       </Text>
       <Text style={{marginTop:10, fontSize:14, color:'#666', fontWeight:"400"}}>We stay up to date with what your friends are doing so you don't have to!</Text>
       </View>
       <View style ={styles.commons}>
       <Text style = {styles.title}>
      Instagram Photos
       </Text>
       <ScrollView
       horizontal = {true}
       >
       <View style ={{}}>
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       <View style ={{}}>
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
             <Image source ={require('../assets/images/profile.png')} resizeMode="stretch" style={{height:100, width:100, margin:5}} />
       </View>
       </ScrollView>
       </View>
        </ScrollView>
        </View>
    )
}
}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  row: {
    flexDirection:'row',
    margin:15,
    marginBottom:0,
    marginTop:5,
    alignItems:'flex-end'
  },
  title:{
    fontSize:14,
    fontWeight:'600',
    color:'#333'
  },
  commons:{
    padding:15
  },
  buttons:{
    width:80,
    height:80,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40
  },
  description:{
    padding:15,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#e3e3e3',
    marginTop:10,
    marginBottom:10
  },
  buttonSmall:{
    width:50,
    height:50,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  },
  mapContainer: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
 },

});
