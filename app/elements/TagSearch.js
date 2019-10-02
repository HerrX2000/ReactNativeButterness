import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ListItem
} from 'react-native';
import {withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements'

//ButternessApp
import constants from '../constants/constants';
import theme from '../constants/theme';
import apiManager from '../functions/apiManager';
import {requestFetch} from '../functions/Networking'
const baseStyles = require('../style/base');
const listStyles = require('../style/list');

class TagSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        isLoading: true,
        tagsData: [{name:"Tags noch nicht gelade",slug:"false"}],
        rowCount: null
    };
    }

    static defaultProps = {
        url: false
    }

    componentDidMount(){
        this._mounted=true;
        this.fetchTags()
        
    }

    fetchTags(){
       this.setState({
           isLoading: true,
       });
       url=apiManager.urlForTags();
       requestFetch(url)
           .then((response) => response.json())
           .then((response) => {
               if(this._mounted){
                   if(this._mounted){
                       tagsData = apiManager.ValidateTags(response.data)
                       this.setState({
                           isLoading: false,
                           tagsData: tagsData,
                       });
                   }
                   
               }
           }).
           catch((error) =>{
               this.setState({
                    errorFound: true,
                    errorMassage: error,
                   isLoading: false
               });
           console.log("Error on requestFetch: "+error)});
           
   }

   updateTags(slug){
    if(this.state.selectedTag==slug){
        this.setState({
            selectedTag: false
        });
        this.props.handler("false")
    }
    else{
        this.setState({
            selectedTag: slug
        });
        this.props.handler(slug)
    }
   }

   _renderItem = ({item}) => (
        <TouchableOpacity style={{
            backgroundColor:this.state.selectedTag==item.slug?"#4d5d6c":"#f5f5f5",
            paddingVertical:5,paddingHorizontal:8,
            marginVertical:6,marginHorizontal:4,
            height:34,
            borderRadius:12,
            borderColor:"black",
            borderWidth:1
            }} onPress={() => this.updateTags(item.slug)}>
            <Text style={{color:"black",fontSize:14}}>#{item.name}</Text>
        </TouchableOpacity>
    );
    

    render(){
        if(this.state.isLoading){
            return null;
        }

        else if(this.state.errorFound){
            return(
                <View style={{paddingHorizontal:2,paddingVertical:2}}>
                    <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[{name:"Fehler beim Laden ("+this.state.errorMassage+")",slug:"false"}]}
                    extraData={this.state.selectedTag}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.slug}
                    />
                </View>
                );
        }

            return(
                <View style={{paddingHorizontal:2,paddingVertical:2}}>
                <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.tagsData}
                extraData={this.state.selectedTag}
                renderItem={this._renderItem}
                keyExtractor={item => item.slug}
                />
                </View>
            );
    }
}



export default TagSearch;