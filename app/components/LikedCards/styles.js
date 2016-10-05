var {StyleSheet, Platform} = require('react-native');
var {MKColor} = require('react-native-material-kit');

module.exports = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    marginTop: Platform.OS === 'android' ? 56 : 0,
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
   borderRadius: 8,
   shadowRadius: 10,
   shadowOpacity: 1.0,
   shadowColor: 'rgb(0, 0, 0)',
   overflow: 'hidden',
   height: 300,
 },
 textContainer:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   width: 300,
 },
 cardImage: {
   height: 150,
 },
 tagContainer:{
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-between'
 },
 bottomInfoContainer:{
   marginTop: 10,
   flexDirection:'row',
   alignItems:'center',
   width: 280,
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
    paddingTop: 50,
    paddingBottom: 50,
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
  fab: {
  },
  mapContainer: {
   height: 300,
   width: 350,
   margin: 5,
   marginLeft: 12,
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
    height: 200
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
  marginTop: 200,
  padding: 10
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
  marginBottom: 5,
  marginTop: 5,
  width: 300
},
venueBottomText: {
  fontSize: 14,
  color: 'rgb(0,0,0)',
  fontFamily: 'System',
}

});
