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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  card: {
   flex: 2,
   alignItems: 'center',
   alignSelf:'center',
   borderRadius: 5,
   shadowRadius: 10,
   shadowOpacity: 1.0,
   shadowColor: 'rgb(0, 0, 0)',
   overflow: 'hidden',
   height: 300
 },
 textContainer:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   width: 300,
 },
 cardImage: {
   height: 150,
   width: 300,
 },
 bottomInfoContainer:{
   width: 280,
   marginTop: 10,
   flexDirection:'row',
   alignItems:'center',
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
    paddingBottom: 50
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: Platform.OS === 'android' ? 56 : 0,
  },
  fab: {
  },


});
