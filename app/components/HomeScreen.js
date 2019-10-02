import React, {Component} from 'react';
import {
    ScrollView,
    SafeAreaView,
    View,
    StatusBar,
    Linking,
    RefreshControl
  } from 'react-native';

//ButternessApp
import Storage from '../functions/Storage';
import {getStyle} from './../functions/Styling';
import Settings from './commonComponents/Settings';
import theme from '../constants/theme';
import {retrieveTheme,setThemedStyles, initStylesWith} from './../functions/Styling';


import { NewestArticels, StaredCategory, More, Banner} from '../elements/HomeScreenElements'


const keys = [
"SettingsHomeDisplayStaredCategory",
"SettingsHomeDisplayRecommendedArticels",
"SettingsHomeDisplayNewestArticels",
"SettingsHomeDisplayMore"];

class HomeScreen extends React.Component{

    constructor(props){
        super(props);
        state ={
                uniqueValue:0,
                DisplayRecommendedArticels:Settings.home.display.RecommendedArticels,
                DisplayNewestArticels:Settings.home.display.NewestArticels,
                DisplayMore:Settings.home.display.More,
                DisplayStaredCategory:Settings.home.display.StaredCategory,
                isRefreshing:false,
            }
            this.state=initStylesWith(state,['base']);
        }


        
    componentDidMount(){
        /*Linking.getInitialURL().then((url) => {
            if (url) {
              console.log('Initial url: ' + url);
              this.handleInitialURL(url);
            }
          }).catch(err => console.error('An error occurred', err));*/

         

        for(var i = 0; i < keys.length; i++){
            let key = keys[i];
            Storage.retrieveData(key).then((value) => {
            if(value!="null" && value != null){
                name = key.replace("SettingsHome","");
                this.setState({[name]:value})
            }
            } );
        }
        retrieveTheme().then((value)=>{
            if(value){
                this.setState(setThemedStyles(value,["base"]));
            }
        })
        /*
          OUTDATED: (STORAGE RECIVE WORKS NOW)
            AsyncStorage.getItem("SettingsHomeDisplayMore").then((value) => {
                if(value!="null" && value != null){
                    this.setState({DisplayMore:value},)
                }
            })
        */            
    }
    /*
    handleInitialURL = (url) => {
        if(url.includes("arma-magazine")){
            const {navigation}= this.props;
            
            const path = url.replace(/.*?:\/\//g, '');
            console.log("Path: "+path)
            const id = path.match(/\/([^\/]+)\/?$/)[1];
            const route = path.split('/')[1];
            const component = route.split('?')[0];
            
            console.log("Path:"+path+"|ID:"+id+"|Component:"+component+"|Route:"+route);
            if(component =="article" && route == id){
                navigation.navigate('EntryListScreen');
            }
            
            else if(component =="article" && component == route){
                navigation.navigate('EntryView', { slug: id});
            }
            else if(component=="category"){
                navigation.navigate('Category', {category: id});
            }
            else if(component=="page"){
                if(id=="ueber-uns"){
                navigation.navigate('AboutUs');
                }
                else if(id=="partner"){
                    navigation.navigate('Associates');
                }
                else if(id=="kontakt"){
                    navigation.navigate('Impressum');
                }
                else{
                    navigation.navigate('Page', {slug: id});
                }
            }
        }
    }*/
    

    onPressLink(Link){
        Linking.openURL(Link)
    }

    onRefresh = () => {
        var newValue=this.state.uniqueValue+1;
        this.setState({uniqueValue:newValue})
        console.log("Refresh Home to key "+this.state.uniqueValue)

          for(var i = 0; i < keys.length; i++){
              let key = keys[i];
              Storage.retrieveData(key).then((value) => {
                if(value!="null" && value != null){
                    name = key.replace("SettingsHome","");
                    this.setState({[name]:value})
                }
              } );
          }
      }
    
    render(){
        return(
        <View key={this.state.uniqueValue} style={this.state.baseStyles.body}>
            <ScrollView refreshControl={
                <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
                />
            }>
                <SafeAreaView forceInset={{ horizontal: 'always' }}>
                    <NewestArticels  display={this.state.DisplayNewestArticels}/>
                    <StaredCategory display={this.state.DisplayStaredCategory}/>
                    <More display={this.state.DisplayMore}/>
                    <Banner display={this.state.DisplayBanner}/>
                </SafeAreaView>
                <StatusBar barStyle="default" />
            </ScrollView>
        </View>
        );
    }
}




export default HomeScreen;
