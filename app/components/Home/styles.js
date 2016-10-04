var {StyleSheet, Platform} = require('react-native');
var {MKColor} = require('react-native-material-kit');

module.exports = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor: '#f7f7f7',
},
categoryText:{
  color: 'rgba(255,255,255, 0.8)',
  fontSize: 12,
  fontWeight: 'bold',
  fontFamily: 'System'
},
textContainer:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: 350,
},
cardImage:{
  height: 275,
  width: 350,
},
buttons:{
  width:80,
  height:80,
  borderColor:'#e7e7e7',
  justifyContent:'center',
  alignItems:'center',
  borderRadius:40
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
titleText:{
  fontFamily: 'System',
  backgroundColor: 'transparent',
  fontSize: 24,
  fontWeight: '400',
  color: 'rgba(255, 255, 255, 0.8)'
},
bottomInfoText:{
  fontSize: 14,
  fontWeight: '400',
  color: 'rgb(255, 255, 255)'
},
tagContainerMaster:{
  width: 300,
  marginTop: 25,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
},
tagContainer:{
  width: 100,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
},
bottomInfoContainer:{
  width: 330,
  marginTop: 35,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between'
},
 card: {
  flex: 1,
  alignItems: 'center',
  alignSelf:'center',
  width: 350,
  height: 450,
  borderRadius: 5,
  shadowRadius: 10,
  shadowOpacity: 1.0,
  shadowColor: 'rgb(0, 0, 0)',
  overflow: 'hidden',
},
linearGradient: {
  flex: 1,
  paddingLeft: 15,
  paddingRight: 15,
}

});
