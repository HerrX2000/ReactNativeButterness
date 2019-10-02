import React, {Component} from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    TouchableNativeFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation';
import NetInfo from "@react-native-community/netinfo";

//ButternessApp
import constants from '../constants/constants';
import DataUsageLog from '../functions/DataUsageLog';
import renderItem from './commonComponents/renderItem'
import renderItemCompact from './commonComponents/renderItemCompact'
import Storage from '../functions/Storage';
import apiManager from '../functions/apiManager';
import {retrieveTheme,setThemedStyles, initStylesWith} from './../functions/Styling';
import {requestFetch} from '../functions/Networking'
import {onPressShare} from '../functions/Interactions'

  
class EntryList extends Component{
    constructor(props){
        super(props);
        //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const style = require ('./../style/list');
        initState={
            //articlesDataSource: ds,
            isLoading: true,
            isLoadingMore: true,
            isRefreshing: false,
            Fullscreen:false,
            saveData:false,
            compactList: false,
            articlesData:{},
            currentPage:1,
            nextPage:true
        }
        this.onEndReachedCalledDuringMomentum = true;
        this.state=initStylesWith(initState);
    }

    componentDidMount(){
        this._mounted = true;
        this.fetchArticles();
        NetInfo.getConnectionInfo().then((connectionInfo) => {
                this.setState({
                    connectionType: connectionInfo.type
                })
        })
        retrieveTheme().then((value)=>{
            if(value){
                this.setState(setThemedStyles(value));
            }
        })
        Storage.retrieveData("SettingsStyleListCompact").then((value)=>{
            if(value=="true"){
                this.setState({
                    compactList: true
                })  
            }else if(value=="cellular"){
                NetInfo.getConnectionInfo().then((connectionInfo) => {
                    if (connectionInfo.type=="cellular"){
                        this.setState({
                            compactList: true
                        })
                    }
                  });
            }
        })
        Storage.retrieveData("SettingsSaveData").then((value)=>{
            if(value=="true"){
                NetInfo.getConnectionInfo().then((connectionInfo) => {
                    if (connectionInfo.type=="cellular"){
                        this.setState({
                            saveData:true
                        })
                        console.log('Save Data: true');
                    }
                });
            }
        })
        
    }

    componentDidUpdate(prevProps){
        if (this.props.propSearch !== prevProps.propSearch) {
            this.fetchArticles(refresh=true);
        }
        if (this.props.propTags !== prevProps.propTags) {
            this.fetchArticles(refresh=true);
        }        
        if (this.state.Fullscreen !== true && this.props.propFullscreen == true){
            this.setState({
                Fullscreen:true
            });
        }
    }
    componentWillReceiveProps(nextProps) {

        if (this.props.propFullscreen == true && this._mounted){
            this.setState({
                Fullscreen:true
            });
        }
        else if(this._mounted){
            this.setState({
                Fullscreen:false
            });
        }
      }
    

    componentWillUnmount(){
        this._mounted = false;
    }


    fetchArticles(refresh){
         var propSticky = this.props.propSticky;
         var propCategory = this.props.propCategory;
         var propSearch = this.props.propSearch;
         var propNewest = this.props.propNewest;
         var propTags = this.props.propTags;
         parameter=[];
         parameter["textSearch"]=propSearch;
         parameter["newest"]=propNewest;
         parameter["category"]=propCategory;
         parameter["sticky"]=propSticky;
         
         parameter["page"]=this.state.currentPage
         if(refresh){
            parameter["page"]=1
            this.setState({currentPage:1})
         }
         parameter["tagSearch"]=propTags;
         var url = apiManager.urlWithPara(constants["apiName"],parameter);
        
         if(url!=false){
            if(!this.state.isLoadingMore){
                this.setState({
                    isLoading: true,
                });
            }
            

            requestFetch(url)
                .then((response) => response.json())
                .then((response) => {
                    if(this._mounted){
                        var rowCount = Object.keys(response.data).length;
                        function trySpread(object) {
                            let array;
                            try {
                              array = [...object];
                              console.log('No error', array);
                            } catch(error) {
                              console.log('error', error);
                            }
                          }
                          
                        if(refresh){
                            newData=response.data
                        }
                        else if((propSearch=="" || propSearch==null) && this.state.currentPage!=1){
                            newData=[...this.state.articlesData,...response.data]
                        }
                        else{
                            newData=response.data
                        }
                        if(response.meta.next_page!=null){
                            var rowCount=true
                        }
                        else{
                            var rowCount = Object.keys(newData).length;
                        }
                            this.setState({
                                isLoading: false,
                                isLoadingMore:false,
                                errorFound: false,
                                articlesData:newData,
                                nextPage:response.meta.next_page,
                                fetchUrl: url,
                                rowCount: rowCount
                            });
                        
                    }
                }).
                catch((error) =>{
                    if(this.state.currentPage!=1){
                        this.setState({
                            isLoadingMore: false,
                            rowCount:"Fehler"
                        });
                    }
                    else{
                        this.setState({
                            errorFound: true,
                            errorMassage: error,
                            isLoading: false
                        });
                    }
                console.log("Error on requestFetch: "+error)});
        }
        else{
            this.setState({
                isLoading: false,
                isLoadingMore:false,
            })
        }        
    }
    onEndReached = () =>{
        if(this.state.nextPage!==this.state.currentPage&&this.state.isLoadingMore!=true){
            this.setState({
                currentPage:this.state.nextPage,
                isLoadingMore:true
            },() =>{
                this.fetchArticles()
            })
        }
        console.log("End of List reached")
    }
    renderItemCompact = ({item}) => (
        <TouchableOpacity activeOpacity = {0.5} onPress={() => this.props.navigation.navigate('EntryView', { slug: item.slug})} onLongPress={() => onPressShare(item.slug, item.title)}>
            <View style={this.state.listStyles.row}>
                <View style={listStyles.rowBody}>
                    <View style={listStyles.rowTitle}>
                        <Text style={this.state.listStyles.rowTextTitle}>{item.title}</Text>
                    </View>
                    <View style={listStyles.rowDescription}>
                        <Text style={this.state.listStyles.rowTextDescription}>{item.description} {item.ago}</Text>
                    </View>
                </View>
                
            </View>
        </TouchableOpacity>
    );
    


    onRefresh = () => {
        if (this._mounted){
            this.setState({currentPage:1},() =>{
                this.fetchArticles(refresh=true)
            })
        }
      }

    renderFooter = () => {
        if (!this.state.isLoadingMore){
            return (
            <View style={{marginBottom:10}}>
                <Text style={{color:this.state.theme.text.primary,textAlign:"center",fontSize:16}}>Gefunden: {this.state.rowCount}</Text>
            </View>
            )
        }
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
    };

    render(){
        if(this.state.isLoading){
            return(
                <View style={this.state.baseStyles.body}>
                    <View style={{flex: 1, padding: 20}}>
                        <ActivityIndicator/>
                    </View>
                </View>
            )
        }
        else if(this.state.rowCount==0 || this.state.errorFound){
            if(this.state.errorMassage){
                var errorMassage="Fehler ("+this.state.errorMassage+")";
            } 
            return(
                <TouchableNativeFeedback onPress={this.onRefresh}>
                    <View style={this.state.baseStyles.body}>
                        <View style={{alignItems:'center'}}>
                            <View style={{paddingVertical:20}}>
                                <Text style={this.state.listStyles.rowTextTitle}>Keine Artikel gefunden</Text>
                                <Text style={this.state.listStyles.rowTextDescription}>{errorMassage}</Text>
                                <Text style={this.state.listStyles.rowTextDescription}>In Entwicklung.{"\n"}Wir halten euch auf ReactNativeButterness {"\n"}auf dem Laufenden.</Text>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                );
        }
        else if(this.state.Fullscreen){
            articlesData=apiManager.ApiToData(this.state.articlesData);
            renderFunction=renderItem;
            if(this.state.compactList==true){
                renderFunction=renderItemCompact;
            }
            if(this.state.rowCount===true){
                rowCount="mehr"
            }
            else{
                rowCount=this.state.rowCount;
            }
            return(
                
                <FlatList
                style={this.state.baseStyles.body}
                data={articlesData}
                renderItem={({item})=>renderFunction(item,this.props.navigation,this.state.listStyles,)}
                onEndReached={this.onEndReached}
                onEndThreshold={0}
                refreshing={this.state.isLoading}
                onRefresh={this.onRefresh}
                keyExtractor={item => item.slug}
                ListFooterComponent={this.renderFooter}
                />
            );
        }
        else{
            articlesData=apiManager.ApiToData(this.state.articlesData);
            renderFunction=renderItem;
            if(this.state.compactList==true){
                renderFunction=renderItemCompact;
            }
            return(
                    <FlatList
                        style={this.state.baseStyles.body}
                        data={articlesData}
                        renderItem={({item})=>renderFunction(item,this.props.navigation,this.state.listStyles)}
                        keyExtractor={item => item.slug}
                    />
            );
        }
    }
}

const baseStyles = require('./../style/base');

var listStyle = require('./../style/list');

var listStyles = listStyle;


export default withNavigation(EntryList);