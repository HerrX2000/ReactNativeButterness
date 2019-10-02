import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform
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

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          title:"Changelog"
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


    componentDidUpdate(prevProps) {
        if(prevProps.navigation!=this.props.navigation){
           if(this.props.navigation.getParam('browser')===true){
                onPressLink(constants.baseURL+"page/"+this.state.paramSlug)
            }
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
            <View style={{flex:1}}>     
                <ScrollView style={this.state.baseStyles.body} contentContainerStyle={{flex:1}}>
                    <WebView
                    style={styles.WebViewStyle}  
                    source={{uri: 'file:///android_asset/changelog.html'}}
                    />
                </ScrollView>
            </View>
            
       </View>
      );
    }
}


const styles = StyleSheet.create({
    WebViewStyle:
    {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    }
});

export default EntryList;
