
    
    
    import React, {Component} from 'react';
    import {
      Button,
      Text,
      View,
      Image,
      Linking,
      FlatList
    } from 'react-native';
    
    //ButternessApp
    import constants from './../constants/constants';
    
    class Team extends Component{
    
        constructor(){
            super();
            this.state = {
                teamData:{}
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
                        title:"Ex-Appentwicklungsleiter des Arma Magazines",
                        name:"Freddy", 
                        description:"Frohes schaffen!",
                        membership:"Gründungsmitglied",
                        image:"https://cdn.buttercms.com/9veKKu21SGaGhFwvkaSH",
                        social:{
                            site:"Reddit",
                            url:"https://www.reddit.com/user/freddi2000",
                            name:"freddi2000"
                        }
                    }
                ]
            this.setState({
                teamData:data
            });
        }
        /*
        ListView deprecated
        renderRow(data, sectionId, rowId, rowHighlight){
            if (data.social){
                return( 
                    <View style={listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={listStyles.rowTitle}>
                                <Text style={listStyles.rowTextHeader}>{data.title}</Text>
                                <Text style={listStyles.rowTextTitle}>{data.name}</Text>
                            </View>
                            <View style={listStyles.rowDescription}>
                                <Text style={listStyles.rowTextDescription}>{data.description}</Text>
                                <Text style={listStyles.rowTextDescription} onPress={() => this.onPressLink(data.social.url)}>{data.social.site}: {data.social.name}</Text>
                            </View>
                        </View>
                        <View style={listStyles.rowSide}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={{uri: data.image}}
                                />
                        
                        </View>
                    </View>
                )
            }
            else{
                return( 
                    <View style={listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={listStyles.rowTitle}>
                                <Text style={listStyles.rowTextHeader}>{data.title}</Text>
                                <Text style={listStyles.rowTextTitle}>{data.name}</Text>
                            </View>
                            <View style={listStyles.rowDescription}>
                                <Text style={listStyles.rowTextDescription}>{data.description}</Text>
                            </View>
                        </View>
                        <View style={listStyles.rowSide}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: data.image}}
                                />
                        
                        </View>
                    </View>
                )
            }
        }
        */
    renderItem(data){
        if (data.social){
            return( 
                <View style={listStyles.row}>
                    <View style={listStyles.rowBody}>
                        <View style={listStyles.rowTitle}>
                            <Text style={listStyles.rowTextHeader}>{data.title}</Text>
                            <Text style={listStyles.rowTextTitle}>{data.name}</Text>
                        </View>
                        <View style={listStyles.rowDescription}>
                            <Text style={listStyles.rowTextDescription}><Text style={{fontStyle: 'italic'}}>{data.description}</Text></Text>
                            <Text style={listStyles.rowTextDescription} onPress={() => this.onPressLink(data.social.url)}>{data.social.site}: {data.social.name}</Text>
                            
                            <Text style={listStyles.rowTextDescription}>{data.membership}</Text>
                        </View>
                    </View>
                    <View style={listStyles.rowSide}>
                        <Image
                            style={{width: 100, height: 100}}
                            source={{uri: data.image}}
                            />
                    
                    </View>
                </View>
            )
        }
        return( 
            <View style={listStyles.row}>
                <View style={listStyles.rowBody}>
                    <View style={listStyles.rowTitle}>
                        <Text style={listStyles.rowTextHeader}>{data.title}</Text>
                        <Text style={listStyles.rowTextTitle}>{data.name}</Text>
                    </View>
                    <View style={listStyles.rowDescription}>
                        <Text style={listStyles.rowTextDescription}><Text style={{fontStyle: 'italic'}}>{data.description}</Text></Text>
                        <Text style={listStyles.rowTextDescription}>Mitglied seit: {data.membership}</Text>
                    </View>
                </View>
                <View style={listStyles.rowSide}>
                    <Image
                        style={{width: 60, height: 60}}
                        source={{uri: data.image}}
                        />
                
                </View>
            </View>
        )
    }

        
        render(){
          return(
            <View style={{flex: 1, flexDirection:'column'}}>
                <FlatList
                    data={this.state.teamData}
                    renderItem={({item})=>this.renderItem(item)}
                    keyExtractor={item => item.name}
                />
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Zurück"
                    color="#a74f13"
                />
             </View>
          );
        }
    }
    var listStyle = require('./../style/list');

    const listStyles = listStyle;

    var baseStyle = require('./../style/base');

    const baseStyles = baseStyle;
    
    export default Team;
    