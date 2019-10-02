import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList
  } from 'react-native';
import {
    Icon
} from 'react-native-elements'
import {
    withNavigation
} from 'react-navigation';
//ButternessApp
import apiManager from '../functions/apiManager';
import {requestFetch} from '../functions/Networking'
var baseStyles = require('./../style/base');
var listStyles =  require('./../style/list');
import {getStyle,retrieveTheme,setThemedStyles, initStylesWith} from './../functions/Styling';


class CategoryList extends Component{
    constructor(){
        super();
        state = {
            isLoading:true,
            categoriesData:[{name:"Wird geladen",slug:null}]
        };
        this.state=initStylesWith(state);
    }

    componentDidMount(){
        this._mounted = true;
        this.fetchCategories();
        retrieveTheme().then((value)=>{
            if(value){
                this.setState(setThemedStyles(value));
            }
        })
    }

    fetchCategories(){
         var url = apiManager.urlForCategories("butter");
         


        requestFetch(url)
            .then((response) => response.json())
            .then((response) => {
                if(this._mounted){
                    if(this._mounted){
                        this.setState({
                            isLoading: false,
                            categoriesData:response.data,
                            fetchUrl: url,
                        });
                    }
                    
                }
            }).
            catch((error) =>{
                console.log(Object.keys(error))
                this.setState({
                    categoriesData:[{name:"Fehler beim Laden",slug:null}],
                    errorFound: true,
                    errorMassage: error,
                    isLoading: false
                });
            console.log("Error on requestFetch: "+error)});
    }
    

    renderItem = ({item}) => (
        <TouchableOpacity activeOpacity = {0.5} style={listStyles.rowHighlight} onPress={() => this.props.navigation.navigate('Category', {category: item.slug, categoryName: item.name})}>
            <View style={this.state.listStyles.row}>
                <View style={this.state.listStyles.rowBody}>
                    <View style={this.state.listStyles.rowTitle}>
                        <Text style={this.state.listStyles.rowTextTitle}>{item.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
   

    render(){
        if (this.state.isLoading){
            return null
        }

        else if(this.state.errorFound){
            return(
                <View style={this.state.baseStyles.body}>
                       <Text style={this.state.listStyles.rowTextTitle}>Fehler beim Laden</Text>
                </View>
                );
        }

        return(
        <View style={this.state.baseStyles.body}>
            <ScrollView style={this.state.baseStyles.body}> 
                <FlatList
                    data={this.state.categoriesData}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.slug}
                />
            </ScrollView>
        </View>
        )
    }
}

export default withNavigation(CategoryList);
