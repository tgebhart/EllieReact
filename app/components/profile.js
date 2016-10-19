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
       accessKey: "ASIAJVOM3LHCEMAOICBA",
       secretKey: "zO+kRLhNYgzuSrjSdHF1QGnsfjWBDoF3OJBe5Kkh",
       sessionToken: "AgoGb3JpZ2luEGMaCXVzLXdlc3QtMiKAAlJL0rEQfhQLiosEDbztF5seEfw1S1BeR8W6Cutv1iafCI15Aa5OOH89iY6qd9c9A9VzHiygnFJkf9hl8gFFTMRJ6/dicV5BdcRoOfsbcT78s3WQnYRmKvzmIURMflNsDOWC//33JQrWri6faCA7LlvKZkf1xTAZ93EzM5SU19NgpxMuAE0JJTDHWn3JA/cT26yLIjuKrVdUhFeFIX0IEgXWXEm2Ae1pWdN+RTVTInbu+hfeVv4+zmLadHbQ2LmVx+wSuHcbToK03oAI0cY+1EnasMj2MA9K/NbiwJ9lb1pkobO/R3I/cxahhTVae62bJa/EsMphYTU6nA8Zwzc4XnwqywQIOBAAGgw2ODI2NzY2NTk0ODQiDHv8/VbCNq3tKXqYPiqoBIH2XYOlCYAB6AG5ix6wkxxdpXlQ6h/mhNL7Mpt25M7rxaDR2XasUPNSN9Wa1eoAOCVjaUl4+SnVnw+q94fuAlJuAc0/2E4f54w+3unmxwS6+vJyiKrmkjaSdoH7GMAb0MWMZukwZDWfHNECL8pcp4CHtbKkY2p1vfaUPT2C1QsiUBj3gyIKQ9tgqePHQ897tMFkZZNxIpYLUsA/0mu2tlAhAAD+5Rd16RMJYYD0fczfBDPLQYItBxB0BJlfVsGZ+xwfsCwnE0M/58UMwk/xIhR5uS+4CYWIe/RbHTuT01f6wRcUA1B0Q0xwysWcIIka0w1DXAczSGxrA9fSIoN4zjsJjBUo9XN27Ugpj9DKptp2VI7BPwdug5GIOnpnOaTI7O307lhdwpELjiahg/IOZkZilvD20c871z30XyJ1qZ7SBrNE9S1TKzJej119j9/FkqI1rG/HXw45LicjA13xMTf6t1QdhE2DfDG0OX5eCzzYeZ74u40VdRnmCIqH20aKodvCpO3Ww/G+6h0lomzGxh1wrw6q/dv7sv2iuCdVq+10fStE1mh/TK1c5ctRYdkthYYJeso/Ip97KUX3PgyluRadBcqpYeJXssWi+q4FZ1E7rv0XZIC9VsY8InS2rvAzj95FNACwzWzllzXb34/KWbFNMR1wFO1MXN3eQ0cOveeaEe1zB5z4PIWlM8bHhmUHEcRMJanTij6sme2B4E2FuWDjyPgV0ronuTDp75/ABQ==",
       region: 'us-west-2'
     });

    var params = {};
    var body = {};
    var additionalParams = {
      headers: {},
      queryParams: {}
    };

    console.log(agc)

    agc.eventsGet(params, body, additionalParams)
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
