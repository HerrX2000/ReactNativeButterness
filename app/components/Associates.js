
    
    
    import React, {Component} from 'react';
    import {

      Button,
      Text,
      View,
      Linking,
      FlatList,
      TouchableOpacity
    } from 'react-native';
    
    import FastImage from 'react-native-fast-image'

    //ButternessApp
    import constants from '../constants/constants';
    import theme from '../constants/theme'
    const listStyles = require('./../style/list');
    const baseStyles = require('./../style/base');
    
    class Associates extends Component{
    
        constructor(){
            super();
            this.state = {
                articlesData: {},
            };
        }

        onPressLink(Link){
            Linking.openURL(Link)
        }

        componentDidMount(){
            this.fetchArticles();
        }
    
        fetchArticles(){
            const data = [
                {
                        title:"Titel",
                        name:"Name",
                        description:"description",
                        image:null,
                        associate:{
                            name:"Mrs",
                            role:"Boss"
                        },
                        social:{
                            site:"Website",
                            url:"http://google.com/",
                            name:"google.com/"
                        }
                    },
                ]
            this.setState({
                articlesData: data
            });
        }
        renderItem = ({item}) => (
            <TouchableOpacity onPress={() => this.onPressLink(item.social.url)}>
            <View style={listStyles.row}>
                <View style={listStyles.rowBody}>
                    <View style={listStyles.rowTitle}>
                        <Text style={listStyles.rowTextHeader}>{item.title}</Text>
                        <Text style={listStyles.rowTextTitle}>{item.name}</Text>
                    </View>
                    <View style={listStyles.rowDescription}>
                        <Text style={listStyles.rowTextDescription}>{item.description}</Text>
                        <Text style={listStyles.rowTextDescription} >Vertreten durch: {item.associate.name} ({item.associate.role})</Text>
                    </View>
                </View>
                <View style={listStyles.rowSide}>
                    <FastImage
                        style={{width: 100, height: 100}}
                        source={{uri: item.image}}
                        />
                
                </View>
            </View>
            </TouchableOpacity>
        );

        
        render(){
          return(
            <View style={baseStyles.body}>  
                <View style={baseStyles.body}>
                    <FlatList
                        data={this.state.articlesData}
                        renderItem={this.renderItem}
                        keyExtractor={(index) => index.toString()}
                    />
                </View>
                <Button
                    onPress={() => this.props.navigation.navigate('Page',{slug:'werde-partner'})}
                    title="Werde Partner"
                    color={theme.secondary}
                />
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Zurück"
                    color={theme.primaryVariant}
                />
             </View>
          );
        }
    }
    
    export default Associates;
    