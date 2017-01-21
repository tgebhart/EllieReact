var {StyleSheet, Platform, System, Dimensions} = require('react-native');

var sysHeight = Dimensions.get('window').height;
var sysWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor: '#FFFFFF',
},
shadowContainer: {
  shadowOpacity: 5.0,
  shadowRadius: 5.0,
  borderRadius: 5
},
categoryText:{
  color: 'rgba(0,0,0, 0.8)',
  fontSize: 14,
  fontWeight: 'bold',
  fontFamily: 'System'
},
flipCard: {
  // height: 300,
  marginTop: 20,
  marginBottom: 5,
  borderWidth: 0,
},
swipCardContainer: {
  backgroundColor: '#FFFFFF',
  alignItems:'center',
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
titleTextContainer: {
  flex: 1,
  height: 40,
  width: 300,
  alignItems: 'center',
  justifyContent: 'space-between'
},
titleText:{
  fontFamily: 'System',
  backgroundColor: 'transparent',
  fontSize: 20,
  fontWeight: '400',
  letterSpacing: 1,
  color: 'rgba(0,0,0,0.8)'
},
bottomInfoText:{
  fontSize: 14,
  padding: 3,
  fontWeight: '400',
  color: 'rgb(255, 255, 255)'
},
tagContainerMaster:{
  width: 300,
  flexDirection: 'column',
  justifyContent: 'space-between'
},
tagContainer:{
  width: 300,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
},
bottomInfoContainer:{
  width: 330,
  marginTop: 20,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between'
},
 card: {
  // flex: 1,
  alignItems: 'center',
  alignSelf:'center',
  // width: sysWidth,
  // height: sysHeight,
  borderRadius: 5,
  shadowRadius: 5.0,
  shadowOpacity: 5.0,
  elevation: 5,
  overflow: 'hidden',
},
linearGradient: {
  flex: 1,
  paddingLeft: 15,
  paddingRight: 15,
},
descriptionTitle: {
  fontFamily: 'System',
  backgroundColor: 'transparent',
  fontSize: 30,
  fontWeight: '400',
  color: 'rgba(255, 255, 255, 0.8)',
  marginTop: 18
},
descriptionText: {
  fontFamily: 'System',
  backgroundColor: 'transparent',
  fontSize: 17,
  fontWeight: '400',
  color: 'rgba(255, 255, 255, 1)',
},
searchTimeContainer: {
  marginTop: -20,
  marginLeft: 5,
  alignItems: 'center',
  justifyContent: 'space-between',
},
searchTimeText: {
  color: 'rgb(0,0,0)',
  fontFamily: 'Helvetica',
  fontSize: 12,
  fontWeight: '400',
  paddingLeft: 5,
  paddingRight: 5,
},
selectedSearchTimeText: {
  color: '#ffef57',
  fontFamily: 'Helvetica',
  textDecorationLine: 'underline',
  fontSize: 12,
  fontWeight: '400',
  paddingLeft: 5,
  paddingRight: 5,
},
searchUseCaseContainer: {
  borderBottomColor: 'rgba(0,0,0,0.3)',
  borderTopColor: 'rgba(0,0,0,0.3)',
  borderTopWidth: 2,
  borderBottomWidth: 2,
  paddingLeft: 10,
  paddingRight: 10,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row'
},
useCaseImageBlur: {
  height: 120,
  width: 75,
  borderRadius: 5.0,
  paddingRight: 10,
  paddingLeft: 10,
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,0.7)',
  alignItems: 'center'
},
useCaseImage: {
  height: 120,
  width: 75,
  borderRadius: 5.0,
  paddingRight: 10,
  paddingLeft: 10,
  justifyContent: 'center',
  backgroundColor: 'transparent',
  alignItems: 'center'
},
useCaseText: {
  fontSize: 12,
  textAlign: 'center',
  fontWeight: '400',
},
useCaseTextSelected: {
  fontSize: 12,
  color: 'rgb(255,255,255)',
  textAlign: 'center',
  fontWeight: '400',
},
searchMoreFiltersContainer: {
  flex: 1,
  marginTop: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomColor: 'rgba(0,0,0,0.3)',
  borderBottomWidth: 2,
},
circleIconContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
searchCityText: {
  color: 'rgb(0,0,0)',
  fontFamily: 'Helvetica',
  fontSize: 12,
  fontWeight: '400',
  paddingRight: 40,
  paddingLeft: 40
},
searchButtonContainer: {
  flex: 1,
  flexDirection: 'row',
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomColor: 'rgba(0,0,0,0.3)',
  borderBottomWidth: 2,
},
searchButtonText: {
  fontSize: 20,
  fontFamily: 'Helvetica',
  color: 'rgb(0,0,0)',
  fontWeight: '400',
},

});
