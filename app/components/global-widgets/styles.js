var {StyleSheet, Platform, System, Dimensions} = require('react-native');

var sysHeight = Dimensions.get('window').height;
var sysWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

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
exploreContainer: {
  flexDirection: 'column',
  backgroundColor: '#fff',
  paddingTop: 5,
},
likedlistContainer: {
  height: 60,
  flexDirection: 'row',
  paddingTop: 10,
  justifyContent: 'flex-start',
  backgroundColor: '#fff',
},
profileImageCircle: {
  height: 30,
  borderRadius: 30/2,
  width: 30
},


});
