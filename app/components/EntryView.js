import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';


import FastImage from 'react-native-fast-image'
import Moment from 'moment/min/moment-with-locales';
import { Icon } from 'react-native-elements'
import { WebView } from "react-native-webview";

//ButternessApp
import apiManager from '../functions/apiManager';
import {getStyle} from './../functions/Styling';
import EntryCode from './commonComponents/EntryCode';    
import theme from '../constants/theme';
import constants from './../constants/constants';
import Storage from '../functions/Storage';
import {retrieveTheme,setThemedStyles, initStylesWith} from './../functions/Styling';
import {onPressShare,onPressLink} from '../functions/Interactions'

var baseStyles = getStyle("base");

class EntryList extends React.Component{
  constructor(props){
    super(props);
    state ={
        isLoading: true,
        isLoadingWebview:true,
        paramSlug: this.props.navigation.getParam('slug', '404'),
        voted: false,
        votedUp: null,
        votedDown: null,
    }
        this.state=initStylesWith(state);
    }

    static defaultProps = {
        url: false
    }

    componentWillMount() {
        this.props.navigation.setParams({share: ()=>this.setState({shared: true,browser:false})});
        this.props.navigation.setParams({browser: ()=>this.setState({browser: true,shared:false})});
    }



    static navigationOptions = ({ navigation }) => {
        
        return {
          headerRight: (
            <View style={baseStyles.headerRight}>
                <View style={baseStyles.headerRightItem}>
                
                    <TouchableOpacity 
                        onPress={navigation.getParam('browser')}>
                        <Icon
                        name="web"
                        size={36}
                        color={theme.share}
                        />
                   </TouchableOpacity>
                </View>
                <View style={baseStyles.headerRightItem}>
                    <TouchableOpacity onPress={navigation.getParam('share')}>
                        <Icon
                        name="share"
                        size={36}
                        
                        color={theme.share}
                        />
                    </TouchableOpacity>
                </View>
            </View>
          ),
        };
      };

    
    componentDidMount(){
        this._mounted = true;
        retrieveTheme().then((value)=>{
            if(value){
                this.setState(setThemedStyles(value));
            }
        })
        var url = apiManager.urlWithSlug(constants.apiName, this.state.paramSlug)
        this.requestFetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.data,
                isLoading: false,
            });
        })
        .catch((error) =>{
        console.error(error);
        });
    }
    componentWillUnmount(){
        this._mounted = false;
    }


    componentDidUpdate(prevProps) {
        /*
        if(prevProps.navigation!=this.props.navigation){
            if(this.props.navigation.getParam('shared')===true && this.props.navigation.getParam('browser') !== true){
                var slug = this.state.dataSource.slug;
                var title = this.state.dataSource.title;
                onPressShare(slug,title);
              }
            else if(this.props.navigation.getParam('browser')===true){
                onPressLink(constants.baseURL+"article/"+this.state.paramSlug)
            }
        }*/
        if(this.state.shared===true){
            var slug = this.state.dataSource.slug;
            var title = this.state.dataSource.title;
            onPressShare(slug,title);
            this.setState({shared:false})
        }
        if(this.state.browser===true){
            onPressLink(constants.baseURL+"article/"+this.state.paramSlug)
            this.setState({browser:false})
        }
      }

      
    requestFetch(url, options) {
        if (options == null) options = {}
        if (options.credentials == null) options.credentials = 'same-origin'
        return fetch(url, options).then(function(response) {
          if (response.status >= 200 && response.status < 300) {
            console.log("Fetch succesfull:"+response.status)
            return Promise.resolve(response)
          } else {
            console.log("Fetch failed:"+response.status)
            return Promise.reject(response.status)
          }
        }).catch((error) =>{
            console.error(error);
            });
      }

    onPressVote(id){
        if(!this.state.voted){

        var url=constants.apiURL+"article/"+id+"/vote";
        var option ={"method":"POST"};
        this.requestFetch(url,option)
            .then((response) => response.json())
            .then((response) => {
                if (this._mounted){
                    this.setState({
                        voted: true,
                        votedUp: true,
                        votedDown: false
                    });
                }
                var key = "VotedFor"+id;
                var keyValue = "1";
                Storage.setData(key,keyValue);
                Alert.alert(
                    "Vielen Dank!",
                    "Für den Daumen nach oben.",
                    [
                      {text: 'Feedback', onPress: () => onPressLink("mailto:"+constants.Mail)},
                      {text: 'OK'},
                    ],
                );
            }).
            catch((error) =>{
                if (this._mounted){
                    this.setState({
                        voted: "failed"
                    });
                }
            console.log("Vote failed:"+error)
        });
        }
        else{
            Alert.alert(
                "Feedback",
                "Für den Daumen nach oben.",
                [
                  {text: 'Feedback', onPress: () => onPressLink("mailto:"+constants.Mail)},
                  {text: 'OK'},
                ],
            );
        }


    }
    onWebviewPressLink(event){
        /*
        Explenation of the shit thats going on with the event object
        >1. loading, no title, url=content
        2. done, title=content, url doesnt exist
        >3. loading true, title=content, url exist

         console.log(event);
        */
       //console.log(event);
        if(event.loading==true && event.title != "" && event.url !="" && event.url !=null && typeof event.url=="string" && event.url.length<240){
            this.webview.stopLoading()
            this.setState({NavigationStateChanged:true})
            console.log("Link: "+event.url)
            onPressLink(event.url);
        }
        /*
        else{
            console.log("No Link detected");
        }
        */
        //console.log("REPORT:"+Link)
    }
    
    render(){
      const { navigation, banner } = this.props;


      if(this.state.isLoading){
          return(
            <View style={this.state.baseStyles.body}>
                <View style={baseStyles.banner}>
                        <Text style={baseStyles.bannerTitle}>Artikel wird geladen...</Text>
                </View>
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator size="large"/>
                </View>
            </View>
          )
      }
    entry=apiManager.DataToEntry(constants["apiName"],this.state.dataSource);
    Moment.locale('de')
    /*
    entry["slug"]=data.slug
    entry["title"] = data.title
    entry["summary"] = data.summary;
    entry["body"] = data.body;
    entry["category"] = data.categories[0].name;
    entry["author"] =data.author.first_name;
    entry["image"]=data.featured_image
    entry["datetime"]=data.published
    */
    let dt=entry["datetime"]
    var datetime = Moment(dt).format('Do MMMM YYYY');
    var imgUrl = entry["image"]+"?width=200&height=200&crop";
    var body = entry["body"];
    var script = EntryCode.script;
    if(this.state.themeName=="dark"){
        var css = EntryCode.darkCSS;
    }else{
        var css = EntryCode.CSS;
    }
    var page = `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1.0, user-scalable=no">
      `+css+`
        </head>
        <body>`+body+script;
      return(
        <View style={this.state.baseStyles.body}>
            <View style={{...headerStyles.header}}>
                <View style={headerStyles.headerSide}>
                    <FastImage
                        style={headerStyles.headerImage}
                        source={{uri: imgUrl}}
                        />
                </View>
                <View style={headerStyles.headerBody}>
                        <Text style={headerStyles.headerTextTitle}>{entry["title"]}</Text>
                        <Text style={headerStyles.headerTextSubtitle}>{datetime} von {entry["author"]}</Text>
                </View>
            </View>
            {this.state.isLoadingWebview ? <ActivityIndicator size="large"/> : null}
            <View style={{flex:1,opacity:this.state.isLoadingWebview ? 0:1,backgroundColor: 'transparent'}}>     
                <ScrollView style={this.state.baseStyles.body} contentContainerStyle={{flex:1}}>
                
                    <WebView
                    originWhitelist={null}
                    style={styles.WebViewStyle}  
                    javaScriptEnabled={true}
                    source={{ html: page}}
                    ref={(ref) => { this.webview = ref; }}
                    onNavigationStateChange={(event) => {
                        //console.log(event);
                        //console.log("Event URL"+event.url);
                        this.onWebviewPressLink(event);
                    }}
                    cacheEnabled={true}
                    onLoadEnd={()=>this.setState({isLoadingWebview:false})}
                    />
                </ScrollView>
            </View>
            {/*
            Disabled because of lack of support in new butter api
            <View>
                <View style={{flexDirection:'row',backgroundColor:theme.button.primary,paddingVertical:4}}>
                    {/*
                    <View style={{flex:1}}>
                    <Icon
                        onPress={() => Alert.alert('Kommentieren','Noch nicht verfügbar')}
                        name="comment"
                        color="white"
                        style={{flex:1}}
                    />
                    </View>
                    */}
                    {/*
                    <View style={{flex:1}}>
                    <Icon
                        onPress={() => this.onPressVote(this.state.dataSource.id)}
                        name="thumb-up"
                        color={voteColor}
                        style={{flex:1}}
                        disabled={voted}
                    />
                    </View>
                    
                </View>
                <Button
                    onPress={() => navigation.goBack()}
                    title="Zurück"
                    color="#a74f13"
                />
                
            </View>  
            */}      
       </View>
      );
    }
}


const headerStyles = require('./../style//header')

const styles = StyleSheet.create({
    WebViewStyle:
    {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    }
});

export default EntryList;
