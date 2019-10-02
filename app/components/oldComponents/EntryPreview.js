import {withNavigation } from 'react-navigation';


import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  TouchableHighlight 
} from 'react-native';

import { Icon } from 'react-native-elements'

function parseHtmlEntities(str) {
    return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
        var num = parseInt(numStr, 10); // read num as normal number
        return String.fromCharCode(num);
    });
} 

import constants from './../constants/constants';
  
///NOT USED
class EntryPreview extends React.Component{
  constructor(props){
    super(props);
    this.state ={
        isLoading: true,
        url: constants.apiURL+'article/',
        paramSlug: this.props.navigation.getParam('slug', 'lorem-ipsum'),
        }
    }

    static defaultProps = {
        url: false
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight: (
            <View style={{flexDirection:'row',paddingRight:10}}>
                <View style={{paddingRight:10}}>
                    <Icon
                    name="web"
                    size={36}
                    onPress={() => navigation.setParams({ browser: 'true' })}
                    color='#2b3e50'
                    />
                </View>
                <View>
                    <Icon
                    name="share"
                    size={36}
                    onPress={() => navigation.setParams({ shared: 'true' })}
                    color='#2b3e50'
                    />
                </View>
            </View>
          ),
        };
      };
    

      componentDidMount(){
        return fetch(this.state.url+this.state.paramSlug)
        .then((response) => response.json())
        .then((responseJson) => {

        this.setState({
            isLoading: false,
            dataSource: responseJson.data,
        }, function(){

        });

        })
        .catch((error) =>{
        console.error(error);
        });
    }

    

    render(){
      const { navigation, banner } = this.props;
      if(this.state.isLoading){
          return(
            <View style={{flex: 1, flexDirection:'column'}}>
                <View style={baseStyles.banner}>
                            
                        <Text style={baseStyles.bannerTitle}>Artikel</Text>
                </View>
                <View style={{flex: 1, padding: 20}}>
                    
                <ActivityIndicator/>
                </View>
            </View>
          )
      }
    var data = this.state.dataSource;
    const regex = /(<([^>]+)>)/ig;
        var content = data.content.replace(regex, '');
        var description = content.substr(0, 80);
        var description = parseHtmlEntities(description);
        
        var imgUrl = data.img+"?width=200&height=200&crop";
      return(
        <TouchableHighlight onPress={() => this.props.navigation.navigate('EntrySimple', { slug: data.slug})}>
            <View style={listStyles.row}>
                <View style={listStyles.rowBody}>
                    <View style={listStyles.rowHeader}>
                        <Text style={listStyles.rowTextHeader}>{data.category.name} | {data.user.username} | {data.created_at}</Text>
                    </View>
                    <View style={listStyles.rowTitle}>
                        <Text style={listStyles.rowTextTitle}>{data.title}</Text>
                    </View>
                    <View style={listStyles.rowDescription}>
                        <Text style={listStyles.rowTextDescription}>{description}...</Text>
                    </View>
                </View>
                <View style={listStyles.rowSide}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: imgUrl}}
                        />
                   
                </View>
            </View>
        </TouchableHighlight>
      );
    }
}

var baseStyle = require('./../style/base');

const baseStyles = baseStyle;

var listStyle = require('./../style/list');

const listStyles = listStyle;

export default withNavigation(EntryPreview);