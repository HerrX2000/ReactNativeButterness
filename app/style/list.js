'use strict';

import theme from '../constants/theme';

var React = require('react-native');

var {
  StyleSheet,
  StatusBar
} = React;

module.exports = StyleSheet.create({
    view:{
        flex: 1, flexDirection:'column'
    },
    rowHighlight: {
        flex:1,    
    },
    row: {
        padding:10,
        backgroundColor: theme.background.primary,
        marginBottom:6,
        flex:1,
        flexDirection:'row',
        elevation: 1,
    },
    rowSide:{
        justifyContent:'center',
        paddingHorizontal:8,
    },
    rowImage:{
        height:80,
        width:80,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    rowBody:{
        flex:1,
        flexDirection:'column'
    },
    rowHeader: {
        flexDirection:'row'
    },
    rowTitle: {
    },
    rowDescription: {
    },
    rowTextHeader: {
        fontSize:10,
        color:theme.text.secondary,
    },
    rowTextTitle: {
        fontSize:16,
        fontWeight:'800',
        color:theme.text.primary
    },
    rowTextDescription: {
        color:theme.text.secondary,
    },

});