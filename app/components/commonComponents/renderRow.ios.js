
import apiManager from '../../functions/apiManager';

import FastImage from 'react-native-fast-image'
import Moment from 'moment/min/moment-with-locales';

import {parseHtmlEntities} from '../../functions/parseHtmlEntities'


import constants from '../../constants/constants';

import React from 'react';

import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import {onPressShare} from '../../functions/Interactions'

function renderRow (data, sectionId, rowId, highlightRow){
    entry=apiManager.DataToEntry(constants["apiName"],data);
    const regex = /(<([^>]+)>)/ig;
    var summary = entry["summary"].replace(regex, '');
    if(summary.length > 80){
        var summary = summary.substr(0, 80)+"...";
    }
    var slug = entry["slug"]
    var title = entry["title"];
    entry["summary"] = parseHtmlEntities(summary);
    var imgUrl = entry["image"]+"?width=200&height=200&crop";
    Moment.locale('de')
    //2 is summer time, 1 is winter time
    var utcDT = Moment(entry["datetime"] + "+02:00", "YYYY-MM-DD HH:mm:ssZ");
    var ago = Moment(utcDT,"YYYYMMDD").local().fromNow();
    if(this.state.saveData){
        var cachingMethode="cacheOnly";
    }else{
        var cachingMethode="immutable";
    }
    if(this.state.compactList==true){
        let smlImgURL =data.img+"?width=100&height=100&crop";
        listStyles = compactListStyles;
        return(
            <TouchableOpacity activeOpacity = {0.5} onPress={() => this.props.navigation.navigate('EntryView', { slug: slug})} onLongPress={() => onPressShare(slug, title)}>
            <View style={this.state.listStyles.row}>
                <View style={listStyles.rowSide}>
                
                </View>
                <View style={listStyles.rowBody}>
                    <View style={listStyles.rowTitle}>
                        <Text style={this.state.listStyles.rowTextTitle}>{entry["title"]}</Text>
                    </View>
                    <View style={listStyles.rowDescription}>
                        <Text style={this.state.listStyles.rowTextDescription}>{entry["summary"]} {ago}</Text>
                    </View>
                </View>
                
            </View>
            </TouchableOpacity>
        )
    }        
    return(
        <TouchableOpacity activeOpacity = {0.5} onPress={() => this.props.navigation.navigate('EntryView', { slug: slug})} onLongPress={() => onPressShare(slug, title)}>
        <View style={this.state.listStyles.row}>
            <View style={listStyles.rowSide}>
                <FastImage
                    style={listStyles.rowImage}
                    source={{uri: imgUrl, cache:cachingMethode}}
                    />
               
            </View>
            <View style={listStyles.rowBody}>
                <View style={listStyles.rowHeader}>
                    <Text style={listStyles.rowTextHeader}>{entry["category"]} | {entry["author"]} | {ago}</Text>
                </View>
                <View style={listStyles.rowTitle}>
                    <Text style={this.state.listStyles.rowTextTitle}>{entry["title"]}</Text>
                </View>
                <View style={listStyles.rowDescription}>
                    <Text style={this.state.listStyles.rowTextDescription}>{entry["summary"]}</Text>
                </View>
            </View>
            
        </View>
        </TouchableOpacity>
    )
}

var listStyles = require('../../style/list');

export default renderRow