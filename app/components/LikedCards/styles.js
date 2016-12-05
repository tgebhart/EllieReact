var {StyleSheet, Platform, Dimensions} = require('react-native');

var sysWidth = Dimensions.get('window').width;
var sysHeight = Dimensions.get('window').height;

var cardHeight = sysHeight / 2 - 20;

var mapHeight = sysHeight / 4;

var menuWidth = 60;
var buffer = 15;

var frontCardWidth = sysWidth - menuWidth - buffer;
var venueCardWidth = sysWidth - buffer;

module.exports = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? 0 : 20,
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
   alignItems: 'center',
   alignSelf:'center',
   borderRadius: 10,
   marginTop: 10,
   shadowColor: 'rgb(0, 0, 0)',
   height: cardHeight,
   overflow: "hidden",
 },
 textContainer:{
   alignItems: 'center',
   justifyContent: 'center',
 },
 cardImage: {
   width: frontCardWidth,
   height: cardHeight/2.2,
 },
 titleText:{
   fontFamily: 'System',
   backgroundColor: 'transparent',
   fontSize: 18,
   fontWeight: '400',
   color: 'rgba(255, 255, 255, 0.8)'
 },
 titleTextContainer: {
   flex: 1,
   height: 25,
   width: frontCardWidth,
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: 10,
 },
 tagContainer:{
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-between'
 },
 linearGradient: {
   flex: 1,
 },
 tagContainerMaster:{
   flex: 1,
   width: frontCardWidth,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between'
 },
 bottomInfoContainer:{
   flex: 1,
   flexDirection:'row',
   alignItems:'center',
   width: frontCardWidth,
   marginBottom: 10,
   justifyContent:'space-between'
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
  menuButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 25,
    paddingBottom: 25,
    width: menuWidth,
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    width: menuWidth,
    backgroundColor: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? 0 : 0,
  },
  mapContainer: {
   flex: 1,
   width: venueCardWidth,
   height: cardHeight,
   margin: 5,
   marginLeft: 5,
   marginTop: 10,
   justifyContent: 'flex-end',
   alignItems: 'center',
   borderRadius: 5,
   overflow: "hidden"
 },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: mapHeight,
},
  venueTitle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
},
  venueTitleText: {
    fontFamily: 'System',
    backgroundColor: 'transparent',
    fontSize: 22,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
},
  titleAt: {
    fontFamily: 'System',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic'
},
  likedVenueTags: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: mapHeight,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: venueCardWidth,
    paddingBottom: 30
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
}

});
