var { StyleSheet, Platform, Dimensions } = require('react-native');

var sysWidth = Dimensions.get('window').width;
var sysHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({

loginScreenContainer: {
},
loginBackgroundImage: {
  flex: 1,
  resizeMode: 'cover',
  height: sysHeight,
  width: sysWidth
},
loginTitleTextContainer: {
  alignItems: 'center',
  marginTop: 150
},
loginTitleText: {
  fontSize: 32,
  fontWeight: 'bold',
  fontFamily: 'System'
},
loginTitleImage: {
},
loginSubtitleTextContainer: {
  alignItems: 'center',
  marginTop: 30,
},
loginSubtitleText: {
  fontSize: 14,
  fontWeight: '400',
},
loginIconContainer: {
  alignItems: 'center',
  alignSelf: 'center',
  flexDirection: 'row',
  marginTop: 30,
  justifyContent: 'space-between',
  width: sysWidth - 120,
},
loginIcon: {
  padding: 0,
  height: 30,
  width: 30,
},
loginButtonContainer: {
  alignItems: 'center',
  marginTop: 80
},
loginEmailNavContainer: {
  height: 60,
  flexDirection: 'row',
  paddingTop: 10,
  justifyContent: 'flex-start',
  backgroundColor: '#fff',
  borderBottomWidth:1,
  borderColor:'rgba(0,0,0,0.1)'
},
loginEmailContainer: {
  alignItems: 'center',
  marginTop: 60,
},
loginEmailText: {
  fontSize: 14,
  fontWeight: '200',
  color: 'rgba(0,0,0,0.5)'
},
loginFormContainer: {
  alignSelf: 'center',
  backgroundColor: 'rgba(255,255,255,1.0)',
  marginTop: 200,
  height: 90,
  width: 250,
  borderRadius: 5,
  shadowRadius: 5.0,
  shadowOpacity: 5.0,
  elevation: 5,
  overflow: 'hidden',
},
loginTextInputContainer: {
  height: 40,
  shadowRadius: 3.0,
  shadowOpacity: 1.0,
  elevation: 1,
},
emailLoginButtonContainer: {
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  height: 50,
  width: 150,
  borderRadius: 75,
  marginTop: 10,
  backgroundColor: 'black',
  'overflow': 'hidden'
},
emailLoginButton: {
  alignSelf: 'center',
  fontSize: 22,
  color: 'rgba(255,255,255,1.0)',
  fontWeight: '400',
},

});
