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
        padding:0,
        backgroundColor: theme.background.primary,
        flex:1,
        flexDirection:'row',
        borderTopWidth: 0.6,
        borderColor: '#c9cbcf',
    },
    rowSide:{
        paddingHorizontal:8,
    },
    rowBody:{
        flex:1,
        flexDirection:'column'
    },
    rowHeader: {
        flex:1,
        flexDirection:'row'
    },
    rowTitle: {
        flex:1,
    },
    rowDescription: {
        flex:1,
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