import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Alert
  } from 'react-native';
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

//ButternessApp

const baseStyles = require('./../style/base');
import apiManager from '../functions/apiManager';
import theme from '../constants/theme';
import EntryList from './EntryList';
import TagSearch from '../elements/TagSearch';
import Storage from '../functions/Storage';

class EntryListScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('titleParam', navigation.getParam("categoryName",'')),
        };
      };
    constructor(props){
        super(props);
        this.state = {
            categoryName:"Kategorie",
            categoryStar:null,
            categoryStarIcon: null,           
        };
        this.tagHandler = this.tagHandler.bind(this)
    }

    componentDidMount(){       
        var stateCategory = this.fetchParam('category','all');
        StorageKey="SettingsStaredCategory";
        Storage.retrieveData(StorageKey).then((value) => {
        if(value==stateCategory){
            this.setState({categoryStar:true})
        }
        else if(value==null){
            this.setState({categoryStar:null})
        }
        else{
            this.setState({categoryStar:false})
        }
        });

        var stateCategory = this.fetchParam('category','all');
        var stateCategoryName = this.fetchParam("categoryName",'Alle')       
        this.props.navigation.setParams({titleParam: stateCategoryName})    
        this.setState({
            categorySlug:stateCategory,
            categoryName:stateCategoryName
        })
         
    }

    fetchParam(prop,fallback){   
        if(prop=="sticky"){
            var propSticky = this.props.screenSticky;
            if(this.props.navigation.getParam('sticky')!=null){
                return this.props.navigation.getParam('sticky', fallback);
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
                 return this.props.navigation.getParam('category', fallback);
            } 
            else if(propSticky!==null){
                return propCategory;
            }
            else{
                return "error";
            }
        }
        else if(prop=="categoryName"){
            if(this.props.navigation.getParam('categoryName')!=null){
                 return this.props.navigation.getParam('categoryName',fallback);
            } 
            else{
                return apiManager.ExtraCategoryData(this.props.navigation.getParam('category', fallback)).name
            }
        }
        else{
            return "false";
        }
    }

    onPressStar(stateCategory,stateCategoryName){
        StorageKey="SettingsStaredCategory";
        console.log(this.state.categoryStar+"="+stateCategory)
        if(this.state.categoryStar === true){
            console.log("Turn Star off");
            Storage.setData(StorageKey,"null");
            this.setState({categoryStar:false})
        }
        else if(this.state.categoryStar == null){
            console.log("Turn Star on for the first time");
            Storage.setData(StorageKey,stateCategory);
            this.setState({categoryStar:true})
            Alert.alert(
                'Kategorie favorisiert',
                'Eine Kategorie kann als favorisiert markiert werden und direkt auf der Startseite angezeigt werden.',
                [
                  {text: 'Startseite anpassen', onPress: () => this.props.navigation.navigate('SettingsScreen')},
                  {text: 'OK'},
                ],
                { cancelable: true }
              )
        }
        else if(this.state.categoryStar != true){
            console.log("Turn Star on");
            Storage.setData(StorageKey,stateCategory);
            this.setState({categoryStar:true})
        }
        

    }

    tagHandler(slug){
        this.setState({
            tags: slug
        });
        console.log("Add Tag: '"+slug+"'' to parent")
    }

    render(){
        
        var stateSticky = this.fetchParam("sticky");
        var stateCategory = this.fetchParam('category','all');
        var stateCategoryName = this.fetchParam("categoryName",'Alle')        
        CategoryExtraData=apiManager.ExtraCategoryData(stateCategory)
        if(this.state.categoryStar){
            var iconName="star";
            var iconType="font-awesome";
            var iconColor=theme.primary;
        }
        else{
            var iconName="star"
            var iconType="font-awesome";
            var iconColor="#BDBDBD";
        }
        
        return(
        <View style={baseStyles.body}>
            <View style={baseStyles.topContainer}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:1}}>
                        <TagSearch handler={this.tagHandler}/>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Search')}>
                            <View style={{...baseStyles.topContainerBackground,paddingTop:4,paddingRight:2}}>
                                <Icon
                                name={iconName}
                                size={42}
                                type={iconType}
                                onPress={() => this.onPressStar(stateCategory,stateCategoryName)}
                                color={iconColor}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        {/*<Text>[DEBUG CategoryList] Category: {stateCategory} Sticky: {stateSticky}</Text>*/}
        <EntryList propFullscreen={true} propCategory={stateCategory} propSticky={stateSticky} propTags={this.state.tags}/>  
        </View>
        );
    }
}


export default withNavigation(EntryListScreen);