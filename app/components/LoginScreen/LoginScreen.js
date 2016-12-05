import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
} = FBSDK;

import { receiveFbat, fetchSessionToken, fetchEmailSessionToken } from '../../actions/tokenActions'
import { fetchEvents } from '../../actions/apiActions'
import apigClient from '../../lib/ellieAPI/apigClient'

const styles = require('./styles');

var STORAGE_KEY = '@Ellie:fbllt';
var EMAIL_STORAGE_KEY = '@Ellie:email';
var PASSWORD_STORAGE_KEY = '@Ellie:password';

export default class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false,
      emailLoginVisible: false,
      email: "",
      password: ""
    }
  }

  componentWillMount() {}

  async prepareToEnter() {
    let { dispatch } = this.props.store
    var fbllt = this.props.store.getState().sessionTokens.fbllt
    console.log("fbllt: ", fbllt)
    if (fbllt) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, fbllt);
      } catch (error) {
        console.error(error)
      }
      dispatch(fetchSessionToken(fbllt)).then(() => {
        this.getInitialEvents().then(() => {
          this.props.navigator.replace({id:'home'})
        })
      })
      .catch((error) => {
        console.log("error in using fbllt to get API credentials", error)
        this.props.navigator.replace({id:'home'})
      })
    }
    else {
      console.log("did not store fbllt", this.props.store.getState())
    }
  }


  async emailPrepareToEnter() {
    this.setState({isLoading: true})
    let { dispatch } = this.props.store
    console.log("email, password: ", this.state.email, this.state.password)
    if (this.state.email != "" && this.state.password != "") {
      try {
        await AsyncStorage.setItem(EMAIL_STORAGE_KEY, this.state.email);
      } catch (error) {
        console.error(error)
      }
      try {
        await AsyncStorage.setItem(PASSWORD_STORAGE_KEY, this.state.password);
      } catch (error) {
        console.error(error)
      }
      dispatch(fetchEmailSessionToken(this.state.email, this.state.password)).then(() => {
        this.getInitialEvents().then(() => {
          this.props.navigator.replace({id:'home'})
        })
      })
      .catch((error) => {
        console.log("error in using email to get API credentials", error)
        this.setState({isLoading: false})
      })
    }
    else {
      console.log("Email or password not set", this.props.store.getState())
      this.setState({isLoading: false})
    }
  }

  enterHome() {
    this.props.navigator.replace({id:'home'})
  }

  getInitialEvents = async () => {
    let { dispatch } = this.props.store
    var params = {}
    var body = {}
    var additionalParams = {
      headers: {},
      queryParams: {}
    }
    await dispatch(fetchEvents(params, body, additionalParams))
  }

  setEmailLoginVisible(visible) {
    this.setState({emailLoginVisible: visible});
  }

  render() {
    let { dispatch } = this.props.store
    if (this.state.isLoading) {
      return <View style={{flex: 1, alignItems: 'center', marginTop: 300}}><Text>Loading Awesomeness ... </Text></View>
    }
    return(
      <Image style={styles.loginBackgroundImage} source={require('../../assets/images/loginBackground.png')}>
      <View style={styles.loginTitleTextContainer}>
        <Image source={require('../../assets/icons/Ellie.png')} style={styles.loginTitleImage}/>
      </View>
      <View style={styles.loginSubtitleTextContainer}>
        <Text style={styles.loginSubtitleText}>The simplest way to find local activities</Text>
      </View>
      <View style={styles.loginIconContainer}>
        <Image source={require('../../assets/icons/DancingParty.png')} style={styles.loginIcon}/>
        <Image source={require('../../assets/icons/TheatreMask.png')} style={styles.loginIcon}/>
        <Image source={require('../../assets/icons/WineGlass.png')} style={styles.loginIcon}/>
        <Image source={require('../../assets/icons/RockMusic.png')} style={styles.loginIcon}/>
        <Image source={require('../../assets/icons/Microphone.png')} style={styles.loginIcon}/>
        <Image source={require('../../assets/icons/FloatingGuru.png')} style={styles.loginIcon}/>
      </View>
      <View style={styles.loginButtonContainer}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          style={{width: 250, height: 50}}
          onLoginFinished = {
            (error, result) => {
              if (error) {
                alert("login has error: " + error);
                console.log(error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    this.setState({isLoading: true})
                    dispatch(receiveFbat(data))
                    console.log(this.props.store.getState())
                    console.log(data)
                    dispatch(fetchSessionToken(data.accessToken)).then(() => {
                    this.prepareToEnter().then(() => {
                        //this.enterHome()
                    });
                    })
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
      <View style={styles.loginEmailContainer}>
        <TouchableOpacity onPress = {() => this.setEmailLoginVisible(!this.state.emailLoginVisible)}>
          <Text style={styles.loginEmailText}>Login with Email</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType={"fade"}
        transparent={false}
        visible={this.state.emailLoginVisible}
        onRequestClose={() => {console.log("Modal has been closed.")}}
        >
        <View  style={styles.loginEmailNavContainer}>
          <TouchableOpacity onPress = {() => this.setEmailLoginVisible(false)}>
            <Icon name="arrow-back" color='rgb(0,0,0)' height="25" style={{fontSize: 30, margin: 10}} />
          </TouchableOpacity>
          <View style = {{width:25, height:25, margin:10}}/>
        </View>
        <Image style={styles.loginBackgroundImage} source={require('../../assets/images/loginBackground.png')}>
        <View style={styles.loginFormContainer}>
          <TextInput
            style={styles.loginTextInputContainer}
            onChangeText={(text) => this.setState({email: text})}
            placeholder={"Email"}
          />
          <TextInput
            style={styles.loginTextInputContainer}
            onChangeText={(text) => this.setState({password: text})}
            placeholder={"Password"}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress = {() => this.emailPrepareToEnter()} style={styles.emailLoginButtonContainer}>
          <Text style={styles.emailLoginButton}>Login to Ellie</Text>
        </TouchableOpacity>
      </Image>
    </Modal>



    </Image>
  );
  }
}
