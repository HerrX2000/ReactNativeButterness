'use strict';

var React = require('react-native');

var {
  StyleSheet,
  StatusBar
} = React;

import theme from '../constants/theme';

module.exports = StyleSheet.create({
    view:{
        flex: 1,
        flexDirection:'column',
        backgroundColor:theme.background.secondary
    },
    headerHighlight: {
        flex:1,    
    },
    header: {
        padding:10,
        paddingBottom:3,
        flexDirection:'row',    
        backgroundColor: theme.header.background,
        paddingVertical: 4,
        paddingHorizontal: 4,
    },
    headerSide:{
        justifyContent:'center',
        paddingHorizontal:8,
    },
    headerImage:{
        width: 70,
        height: 70,
        marginVertical: 4, 
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    headerBody:{
        flex:1,
        flexDirection:'column'
    },
    headerTextTitle: {
        fontSize: 19,
        fontWeight: '200',
        color: theme.header.text.primary,
        marginTop: 5,
        marginRight: 5,
        paddingBottom:14
    },
    headerTextSubtitle: {
        position: 'absolute',
        bottom:0,
        fontSize: 12,
        color: theme.header.text.secondary
    },





    
});