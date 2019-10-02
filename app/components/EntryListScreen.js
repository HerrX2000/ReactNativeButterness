import React, {Component} from 'react';
import {
    View,
    Button,
    TouchableOpacity,
    Animated
  } from 'react-native';

import { Icon } from 'react-native-elements'
import { SearchBar } from 'react-native-elements'

//ButternessApp
import EntryList from './EntryList';
import TagSearch from '../elements/TagSearch';
import {getStyle} from './../functions/Styling';

import theme from '../constants/theme';

var baseStyles = getStyle("base");

class EntryListScreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            query:null,
            loadingTagsAnimation:new Animated.Value(-500),
            }
            this.tagHandler = this.tagHandler.bind(this)
    }



    componentDidMount(){
        this.fetchParam();
        this.tagsAnimation();
    }



    fetchParam(prop){   
        if(prop=="sticky"){
            var propSticky = this.props.screenSticky;
            if(this.props.navigation.getParam('sticky')!=null){
                return this.props.navigation.getParam('sticky', 'fallback');
            }
            else if(propSticky!==null){
                return propSticky;
            }
            else{
                return "false";
            }
        }
        else if(prop=="category"){
            var propCategory = this.props.screenCategory;
            if(this.props.navigation.getParam('category')!=null){
                 return this.props.navigation.getParam('category', 'fallback');
            } 
            else if(propSticky!==null){
                return propCategory;
            }
            else{
                return "error";
            }
        }
        else{
            return "false";
        }
    }

    tagHandler(slug){
        this.setState({
            tags: slug
        });
        console.log("Add Tag: '"+slug+"'' to parent")
    }
    
    tagsAnimation(){
        Animated.timing(
            this.state.loadingTagsAnimation,
            {
              toValue: 0,
              duration: 3500,
            }
          ).start(); 
    }

    render(){
        var stateSticky = this.fetchParam("sticky");
        var stateCategory = this.fetchParam('category', 'all');
        var stateSearch=this.state.query;
        return(
        <View style={baseStyles.body}>
            <View style={baseStyles.topContainer}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row"}}>
                        <Animated.View style={{flex:1,right:this.state.loadingTagsAnimation,zIndex: 0}}>
                            <TagSearch handler={this.tagHandler}/>
                        </Animated.View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Search')}>
                            <View style={{...baseStyles.topContainerBackground,zIndex:1}}>
                                <Icon name="search" color="white" size={46}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flex:1}}>
            <EntryList propFullscreen={true} propCategory={stateCategory} propSticky={stateSticky} propSearch={this.state.query} propTags={this.state.tags}/>
            </View>
        </View>
        );
    }
}

export default EntryListScreen;