var {StyleSheet, Platform, Dimensions} = require('react-native');

var sysWidth = Dimensions.get('window').width;
var sysHeight = Dimensions.get('window').height;

var cardHeight = sysHeight / 4 - 20;

var buffer = 15;
var frontCardWidth = sysWidth - buffer;
var venueCardWidth = sysWidth - buffer;

module.exports = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? 0 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  card: {
   flex: 1,
   flexDirection:'row',
   alignSelf:'center',
   marginLeft: 10,
   width: frontCardWidth,
   height: cardHeight,
 },
 textContainer:{
   alignItems: 'center',
   justifyContent: 'center',
 },
 cardImage: {
   alignSelf: 'flex-start',
   width: frontCardWidth/3,
   height: cardHeight,
 },
 eventInfoContainer: {
   backgroundColor: 'rgba(255,255,255, 0.3)',
   height: cardHeight,
   width: 2*frontCardWidth/3,
 },
 titleText:{
   fontFamily: 'System',
   padding: 10,
   backgroundColor: 'transparent',
   fontSize: 12,
   fontWeight: '400',
   letterSpacing: 2,
   color: 'rgba(0, 0, 0, .8)'
 },
 titleTextContainer: {
   height: cardHeight/4,
   alignItems: 'center',
 },
 tagContainer:{
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-between'
 },
 linearGradient: {
   flex: 1,
 },
 linearGradientImage: {
   alignSelf: 'flex-start',
   width: frontCardWidth,
   height: cardHeight,
 },
 tagContainer:{
   flexDirection: 'row',
   alignItems: 'center',
   height:11*cardHeight/20,
   justifyContent: 'space-between',
   width: 2*frontCardWidth/3
 },
 indiTagContainer: {
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-between'
 },
 tagText: {
   color:'rgba(0,0,0,1.0)',
   fontSize:13,
   fontWeight:'400',
   padding:5
 },
 categoryTagText: {
   color:'rgba(0,0,0,1.0)',
   fontSize:13,
   fontWeight:'bold',
   padding:5
 },
 bottomInfoContainer:{
   flexDirection:'row',
   alignItems:'center',
   justifyContent:'space-between',
 },
 bottomInfoText:{
   fontFamily: 'System',
   fontSize: 10,
   padding: 5,
   letterSpacing: 1,
   fontWeight: '800',
   color: 'rgba(0,0,0,0.6)'
 },
 instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 10, marginBottom: 20,
  },
  legendLabel: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 10, marginBottom: 20,
    fontSize: 12,
    fontWeight: '300',
  },
  mapContainer: {
   width: venueCardWidth,
   height: cardHeight,
   marginLeft: 5,
   marginTop: 5,
   alignItems: 'center',
 },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: cardHeight,
},
venueInfoContainer: {
  backgroundColor: 'rgba(255,255,255,0.6)',
},
  venueTitleContainer: {
    alignItems: 'center',
    height: cardHeight/3,
},
  venueTitleText: {
    fontFamily: 'System',
    backgroundColor: 'transparent',
    fontSize: 15,
    padding: 5,
    fontWeight: '400',
    letterSpacing: 1,
    color: 'rgba(0, 0, 0, 0.8)',
},
tagAndButtonContainer: {
  height: cardHeight/2,
  flexDirection: 'row',
},
moreOptionsButtonContainer: {
  flex: 1,
  width: venueCardWidth/8,
  flexDirection: 'row',
  justifyContent: 'center',
},
moreInfoContainer: {
  width: 3*venueCardWidth/8,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
},
venueRatingContainer: {
  height: cardHeight/6,
  flexDirection: 'row',
  alignItems: 'flex-end'
},
likedVenueTags: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: venueCardWidth
},
  venueTagColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
},
  venueTagText: {
    fontSize: 10,
    color: 'rgb(0,0,0)',
    fontFamily: 'Helvetica',
    padding: 10
},
  venueBottomInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: cardHeight/4,
},
venueRatingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-end',
  justifyContent: 'space-between',
  paddingBottom: 5,
  paddingRight: 5
},
venueRatingStar: {
  fontSize: 14,
  color: 'rgb(0,0,0)',
  padding: 2
},
  venueBottomText: {
    fontSize: 14,
    color: 'rgb(0,0,0)',
    fontFamily: 'System',
},
  customMapMarkerText: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    backgroundColor: 'rgba(0,0,0,1.0)'
},
mapOverlayContainer: {
  alignSelf: 'flex-end',
  width: venueCardWidth/2,
},
venuePhoneContainer: {
  height: cardHeight/8,
  flexDirection: 'row',
  justifyContent: 'center',
},
venuePhoneText: {
  fontSize: 14,
  color: 'rgb(0,0,0)',
  fontFamily: 'System'
},
rsvpModalContainer: {
  height: cardHeight,
  position: 'absolute',
  top: 0,
  left: 0,
  width: frontCardWidth,
  backgroundColor: 'rgba(0,0,0,0.6)',
},
moreOptionsButtonsContainer: {
  left: 60,
  top: 50,
  width: 3*frontCardWidth/4,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

},

});
