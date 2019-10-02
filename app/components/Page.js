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



import Moment from 'moment/min/moment-with-locales';
import { Icon } from 'react-native-elements'
import { WebView } from "react-native-webview";

//ButternessApp
import constants from '../constants/constants';
import apiManager from '../functions/apiManager';
import {getStyle} from './../functions/Styling'; 
import theme from '../constants/theme';
import {retrieveTheme,setThemedStyles, initStylesWith} from './../functions/Styling';
import {onPressLink} from '../functions/Interactions'

var baseStyles = getStyle("base");

class EntryList extends React.Component{
  constructor(props){
    super(props);
    state ={
        isLoading: true,
        isLoadingWebview:true,
        paramSlug: this.props.navigation.getParam('slug', '404'),
    }
        this.state=initStylesWith(state);
    }

    static defaultProps = {
        url: false
    }

    componentWillMount() {
        this.props.navigation.setParams({browser: ()=>this.setState({browser: true})});
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
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
    }
    componentWillUnmount(){
        this._mounted = false;
    }


    componentDidUpdate() {
        if(this.state.browser===true){
            onPressLink(constants.baseURL+"page/"+this.state.paramSlug)
            this.setState({browser:false})
        }
    }

  
    onWebviewPressLink(event){
        if(event.loading==true && event.title != "" && event.url !="" && event.url !=null && typeof event.url=="string" && event.url.length<240){
            this.webview.stopLoading()
            this.setState({NavigationStateChanged:true})
            console.log("Link: "+event.url)
            onPressLink(event.url);
        }
    }
    
    render(){
      const { navigation, banner } = this.props;

        
        var pageUrl=constants.baseURL+"page/"+this.state.paramSlug
        console.log("PageUrl:"+pageUrl)
      return(
        <View style={this.state.baseStyles.body}>
            {this.state.isLoadingWebview ? <ActivityIndicator size="large"/> : null}
            <View style={{flex:1,opacity:this.state.isLoadingWebview ? 0:1,backgroundColor: 'transparent'}}>     
                <ScrollView style={this.state.baseStyles.body} contentContainerStyle={{flex:1}}>
                    <WebView
                    originWhitelist={null}
                    style={styles.WebViewStyle}  
                    javaScriptEnabled={true}
                    source={{uri:pageUrl}}
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
