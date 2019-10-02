'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  settingsText:{
    flex:1,
    fontSize: 18,
    color:'#999999'
  },
  settingsElement:{
    flex:1,
    paddingVertical:4,
    //borderRadius: 4,
    borderBottomWidth: 0.5,
    borderColor: '#c9cbcf',
  },
  settingsTouchable:{
    flex:1,
    flexDirection:"row",
  },
  picker:{
    color:"#AAAAAA"
  },
  pickerItem:{
    backgroundColor: "white"
  }
})
