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
import { fetchEvents } from '../actions/apiActions'


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

  static contextTypes = {
    store: React.PropTypes.object
  }

  getEventInfo() {
    var agc = new apigClient({
       accessKey: "ASIAIWLMRNXEYMGNS43Q",
       secretKey: "EDvDAEWC66fhnXxaAHMtca4eZwFbWhXCpHzsmqwG",
       sessionToken: "AgoGb3JpZ2luELr//////////wEaCXVzLXdlc3QtMiKAAjFsy6LmwXe8vF90RfEtlGUxgHa6LhdTidHlXH0x4EBXzCpx6M37yAH4wg8xTxROauOuG+9phGJ5c4wtpPHi/CKo631ASVLUtLNaOq9KvI/zmjeEn8BFODfOzO4UX4kQBcjAETi6k2kQWPgmlYciIKUhWesz+VAeNSoUU4E2o6iZYnv8UcBgrnlej01IIquU1bFH+wUoZHrcC0XL9PJgHtHYNwxQn6q4qet4Ab0iq3Tamb6uL4A7GFmpvf5DoECxii+dIR/aIOwaHLWAouudOO9hwhbERjEav/AsXdLBOhCRW+0aP1md6+gzztksqdF2hBzbTu5CeGRN7BzUL0ExzaIq1AQIj///////////ARAAGgw2ODI2NzY2NTk0ODQiDB/iPooR71oKCuGMwyqoBHbIMebYEUqEpW8uPQ9Cpq9J5S0Exk3Bju9YxjaoRoBRO2S2yuZURgKDI9ZFFyV1j/PwzvKcCRcj9YHMwL86L2rCB5PWvHdaY0Fe0X+6fIe+yasGUKw2TDjEC6k3f6++J2HEtzfrCiingP4k2vEjXTx7c+btiPxOdO5oJ+H9gdc3C9oGXhl3oqJfdd51Y8BTelSNA7LUPvR1C4qlNuNEPewbATExb2dqRPda7HhFgLOZCYApgXlVUPJRH3Ijg7i2WdrnCNvd/ooGpysbpHFYj7SaTqYOOOJGNTeE0e3T8d0WNxvuv/RhO+tV31xjWNExLJwgCmA+bHSPDKC+u7AztFhbbWQ5lEMAzyBUvWl8TT/1ZFqdpP7XWfLxU2S7djVc0GC1P4Ad0V+xfoPARDxPOVTLk44z/rFIt4N4MBh7E6Z5a/uD1ogg0IL7Id9rxccDDPXHOm9qt5yOp23di5oegESQ2QJI9pTjU4te7Q6iYxalwu5kzYeKVC46dA5lJ0c85M/fvURR2GtyPxjZxCRKS9JVRs9HA53t9WLqd6Mu+oABokXC23cZNWg9b3QyDJToHtwLQ3B12nLDD4EX70RG+0aRdVMxEHxRD2wnoBkhtvDp8kW+xCkIYWjmu2ckFvvzwtRBByYZqTN/otv1+fCRJv2tPSMDA/zw3jEJcLnnljFCvnl/93z5wO6c2HV+OzIO8TckRcPVOS7QZFzGhIC7fQnmci4ekBl/TTD/hLPABQ==",
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

  getMoreEvents() {
    let { dispatch } = this.context.store
    var params = {}
    var body = {}
    var additionalParams = {
      headers: {},
      queryParams: {}
    }
    dispatch(fetchEvents(params, body, additionalParams))
    console.log(this.context.store.getState())
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
       <TouchableOpacity onPress={ _ => this.getMoreEvents() } style={styles.button}>
        <Text>POST</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ _ => console.log(this.context.store.getState()) } style={styles.button}>
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
