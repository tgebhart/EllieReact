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
       accessKey: "ASIAI5VGBQLJ626YG3XQ",
       secretKey: "L12tBy2RtUZG4yu/IcgxcYIAY4WkPfQWCG4X+VE4",
       sessionToken: "AgoGb3JpZ2luEEwaCXVzLXdlc3QtMiKAAmhfZz9y9BiQ+h7Z9pUR/SXPUWwfiURfcv2qqhGQouhfHTETY1Hlz2/ZSuLyfZA90GLSZiDaEqjbOQ7q0DxZ9EtWH+mhupljSjdvCYTlRfiqqwicxilSJ66w18oguMrcqDGFxdCbmnAwP4MvBGRktv1orlD6ZRprh3Eu7OUN9RTzQ10HlS8EdM6mBZvk/xlsEfSXfzaPOsOsCzO5pdxV7c537D7Ue/heG/QPiwZQWmVILoni1ZXoKBAr+UqvfrJm3803VN2a0psOzhX2Of240nTKNXpy6eaNzFah+WR+n4NEznL28RRj4fba460U2hsU/JK/Nk70aD776zRyECewvSIqywQIIhAAGgw2ODI2NzY2NTk0ODQiDBE0EwvbjxfISazYgiqoBM3WHn3B9KyDgyZee89ken0s3szYg8anhKsKy+aw0r7UN33291dzk/GqAWYT41lef1I2rvSJ3ZeEq9ZaZdSiWxYUL5Hr14Uq2Q6OEemHFIvUJi1wKAcd2GnKHgu7C4bVqLim2oD8jSpmqGX8uRvG0cCdRaf2fRuO9JZlKtd64aqKQiwDRUQkjd+UtlGlJ4WT9WvkI84y+WMpUFOAVuWCB6jVDGEZXWE9kQY7kd0z8Hi9usXZcYfSElG1zF/Z8QrGb3wFxMiXSWzuBDplijad0wj7JGJGXaIln7xrW+PjLyKy+VFHwgTLJGSf1N1liheOg+1nTEjEsDUUpmLtcBiraUE5QaFd4loRpBk6uwigG0/slluhXj5sgH76cTlnwC65dmF0nC6LwzsIL41o3dZBMsuWA0giAHWn872vlbksgyBcXRS1gQdYatLr+QirraCwePk2OUeECYCPiqHLuJAourH8UcW3mO57zmShDzEjdt92vsWNFn78yTJWrXU4HXsAIrfiGK6yrNSjYVhQG4NdggWq8YDD6BbFGf3929hwR7Z2GpiLMse9y80ZJdNf/oogtU25G3DoMdvF8F3E99ixXt0mrS0OI3bQcr0o0EuOvGNCpBvWNcS+yaR643rH+i1FIxHwteHjUvmf7UdtqhF97SUqODW2VatVCBS8RPlfAzgZPdMaEwDaiSlcJYeeWf1daeEOO/W8ZvUibeKPntZqVomin/BQhVh2HjD7/JrABQ==",
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
     console.log(result)
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
            fbat: 'EAAVw8nRhUZBsBAKGkj1S4E3dsbZCivZAiEoanovZCVWzgTyWaTcg7eweVoDbF0ZByU6n7mEpNlzyNfFMnnObUXIhWbsq51Vf37VZA10pzZC3FyMdhMFMdYZBku1BHCUcpZCjM85YRXrudbcnNk60je17MxBHA404GYnyE9SYVUHhwAl0zO2MgP8bfIl7k99uaPy6x69bMyrcXGia6ZC4yqBHNzE3KZCCuLttV8ZD',
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
