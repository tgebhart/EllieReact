var {StyleSheet, Platform, System} = require('react-native');
var {MKColor} = require('react-native-material-kit');

module.exports = StyleSheet.create({

container: {
  flex: 1,
  backgroundColor: '#f7f7f7',
},
shadowContainer: {
  shadowOpacity: 5.0,
  shadowRadius:5.0
},
categoryText:{
  color: 'rgba(255,255,255, 0.8)',
  fontSize: 12,
  fontWeight: 'bold',
  fontFamily: 'System'
},
flipCard: {
  flex: 1,
  backgroundColor: 'rgba(255,255,255,1)',
  borderWidth: 0,
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
  height: 25,
  width: 300,
  alignItems: 'center',
  justifyContent: 'space-between'
},
titleText:{
  fontFamily: 'System',
  backgroundColor: 'transparent',
  fontSize: 22,
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
  marginTop: 50,
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
  marginTop: 20,
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
  flex: 1,
  marginTop: 10,
  height: 10,
  marginLeft: 5,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomColor: 'rgba(0,0,0,0.3)',
  borderBottomWidth: 2,
},
searchTimeText: {
  color: 'rgb(0,0,0)',
  fontFamily: 'Helvetica',
  fontSize: 12,
  fontWeight: '400',
  padding: 10,
  paddingLeft: 5,
},
searchCategoryContainer: {
  flex: 1,
  height: 80,
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
concertTag: {
  backgroundColor: 'rgba(211, 227, 251, 0.7)',
  height: 100,
  width: 60,
  borderRadius: 5.0,
  justifyContent: 'center',
  alignItems: 'center'
},
comedyTag: {
  backgroundColor: 'rgba(221, 83, 149, 0.9)',
  height: 100,
  width: 60,
  borderRadius: 5.0,
  justifyContent: 'center',
  alignItems: 'center'
},
communityTag: {
  backgroundColor: 'rgba(19, 210, 199, 0.9)',
  height: 100,
  width: 60,
  borderRadius: 5.0,
  justifyContent: 'center',
  alignItems: 'center'
},
partyTag: {
  backgroundColor: 'rgba(219, 209, 244, 0.7)',
  height: 100,
  width: 60,
  borderRadius: 5.0,
  justifyContent: 'center',
  alignItems: 'center'
},
theaterTag: {
  backgroundColor: 'rgba(244, 215, 209, 0.7)',
  height: 100,
  width: 60,
  borderRadius: 5.0,
  justifyContent: 'center',
  alignItems: 'center'
},
categoryTagText: {
  fontSize: 10,
  fontFamily: 'Helvetica',
  color: 'rgba(0,0,0,0.9)',
  fontWeight: '400',
},
searchCityContainer: {
  flex: 1,
  marginTop: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderBottomColor: 'rgba(0,0,0,0.3)',
  borderBottomWidth: 2,
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
}

});
