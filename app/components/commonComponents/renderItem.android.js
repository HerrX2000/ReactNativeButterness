import React from 'react';

import {
View,
Text,
TouchableOpacity,
TouchableNativeFeedback
} from 'react-native';

import {onPressShare} from '../../functions/Interactions'

import FastImage from 'react-native-fast-image'

function renderItem (item,navigation,styleState){
    return(
    <View style={styleState.row} >
        <TouchableOpacity activeOpacity = {0.5} onPress={() => navigation.navigate('EntryView', { slug: item.slug})} onLongPress={() => onPressShare(item.slug, item.title)} accessibilityLabel={"Öffne Artikel aus der Kategorie: "+item.category}>
            <View style={listStyles.rowSide}>
                <FastImage
                    style={listStyles.rowImage}
                    source={{uri: item.image, cache:"immutable"}}
                />            
            </View>
        </TouchableOpacity>
        <TouchableNativeFeedback onPress={() => navigation.navigate('EntryView', { slug: item.slug})} onLongPress={() => onPressShare(item.slug, item.title)} background={TouchableNativeFeedback.Ripple("#808080",true)} accessibilityLabel={"Öffne Artikel: "+item.title}>
            <View style={listStyles.rowBody}>
                <View style={listStyles.rowHeader}>
                    <Text style={listStyles.rowTextHeader}>{item.category} | {item.author} | {item.ago}</Text>
                </View>
                <View style={listStyles.rowTitle}>
                    <Text style={styleState.rowTextTitle}>{item.title}</Text>
                </View>
                <View style={listStyles.rowDescription}>
                    <Text style={styleState.rowTextDescription}>{item.description}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    </View>)
}

var listStyle = require('../../style/list');

var listStyles = listStyle;

export default renderItem