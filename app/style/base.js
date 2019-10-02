'use strict';

var React = require('react-native');

var {
  StyleSheet,
  StatusBar
} = React;

import theme from '../constants/theme';

module.exports = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection:'column',
        backgroundColor:theme.background.secondary
    },
    item: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    subtitle: {
        fontSize: 8,
        color: 'grey',
    },
    description: {
        fontSize: 13,
        color: '#999',
    },
    button: {
        backgroundColor: theme.primary,
    },
    backgroundUnderlay: {
        backgroundColor: theme.primary,
        position: 'absolute',
        top: -100,
        height: 300,
        left: 0,
        right: 0,
    },
    topContainer: {
        flexDirection:"row",
        backgroundColor:theme.button.tertiary
    },
    topContainerWrap: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        flex:1,
        flexDirection:"row"
    },
    topContainerBackground: {
        backgroundColor: theme.button.tertiary, 
    },
    banner: {
        backgroundColor: theme.primary,
        flexDirection: 'row',
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    bannerImage:{
        width: 70,
        height: 70,
        margin: 5
    },
    bannerTitle: {
        flex:1,
        flexWrap: 'wrap',
        fontSize: 19,
        fontWeight: '200',
        color: theme.header.text.primary,
        marginTop: 8,
        marginRight: 5
    },
    bannerSubtitle: {
        fontSize: 12,
        color: theme.header.text.secondary,
    },
    headerRight:{
        flexDirection:'row',
    },
    headerRightItem:{
        paddingRight:10,
    },
    text:{
        color:theme.text.primary
    },
    textRight:{
        color:theme.text.primary,
        textAlign:"right"
    },
    textCenter:{
        color:theme.text.primary,
        textAlign:"center"
    }

});