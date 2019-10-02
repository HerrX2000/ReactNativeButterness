import React from 'react';

import {
View,
Text,
TouchableOpacity,
} from 'react-native';

import {onPressShare} from '../../functions/Interactions'

function renderItemCompact (item,navigation,styleState){
    
    return(
    <TouchableOpacity activeOpacity = {0.5} onPress={() => navigation.navigate('EntryView', { slug: item.slug})} onLongPress={() => onPressShare(item.slug, item.title)}>
        <View style={styleState.row}>
            <View style={listStyles.rowBody}>
                <View style={listStyles.rowTitle}>
                    <Text style={styleState.rowTextTitle}>{item.title}</Text>
                </View>
                <View style={listStyles.rowDescription}>
                    <Text style={styleState.rowTextDescription}>{item.description} {item.ago}</Text>
                </View>
            </View>
            
        </View>
    </TouchableOpacity>
    )
}

var listStyle = require('../../style/list');

var listStyles = listStyle;

export default renderItemCompact