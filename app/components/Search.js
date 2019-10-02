import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import { Icon,SearchBar } from 'react-native-elements'
import { withNavigation } from 'react-navigation';


//ButternessApp
import EntryList from './EntryList';
import styles from './Search.style';


class Search extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            query:null,
            }

    }


    componentDidMount(){
        this.fetchParam();
    }

    componentWillUnmount(){
        this.setState({
            query: null
        });
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

    


    render(){
        var stateSticky = "false";
        var stateCategory = "all";
        var stateSearch=this.state.query;
        return(
        <View style={{flex: 1, flexDirection:'column'}}>
        <SearchBar
        onChangeText={(query) => this.setState({query})}
        placeholder='Hier suchen...' 
        />
        {/*<Text>[DEBUG Search] Category: {stateCategory} Sticky: {stateSticky}</Text>*/}
        <EntryList propFullscreen={true} propCategory={stateCategory} propSticky={stateSticky} propSearch={stateSearch} style={{flex:1}}/>
        </View>
        );
    }
}

export default withNavigation(Search);