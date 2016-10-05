var {StyleSheet, Platform} = require('react-native');
var {MKColor} = require('react-native-material-kit');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0
  },
  matches:{
  borderTopColor:'#da533c',
  borderBottomColor:'#e3e3e3'
  },
  eventCard: {
    flex: 1,
    width: 300,
    height: 300
  },
  eventSummaryContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    height: 300,
    marginBottom: 5
  },

});
