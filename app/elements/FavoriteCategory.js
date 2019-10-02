import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements'

//ButternessApp

import apiManager from '../functions/apiManager';
import constants from '../constants/constants';
import theme from '../constants/theme';
import Storage from '../functions/Storage';
import {getNameBySlug} from '../functions/Categories';
import {setThemedStyles, retrieveTheme,initStylesWith} from '../functions/Styling';
const baseStyles = require('../style/base');
const listStyles = require('../style/list');

class FavCategory extends React.Component{
  constructor(props){
    super(props);
    state ={
        StaredCategory: null,
        themedListStyles:listStyles
        }
        this.state=initStylesWith(state);
    }

    static defaultProps = {
        url: false
    }

    componentDidMount(){
        retrieveTheme().then((value)=>{
            if(value){
                this.setState(setThemedStyles(value));
            }
        })
        Storage.retrieveData("SettingsStaredCategory").then((value) => {
            if(value=="null" || value == null){
                this.setState({StaredCategory:null})
            }
            else{
                this.setState({StaredCategory:value},)
            }
        });

        
    }

    

    render(){
        if( this.state.StaredCategory == null){
            return(
                <TouchableOpacity style={listStyles.rowHighlighty} onPress={() => this.props.navigation.navigate('CategoryOverview')}>
                    <View style={this.state.listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={listStyles.rowTitle}>
                                <Text style={this.state.listStyles.rowTextTitle}>Keine Kategorie favorisiert</Text>
                            </View>
                        </View>
                        <View style={listStyles.rowSide}>
                            <Icon
                            name={'star'}
                            size={60}
                            color={theme.secondary}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        else{
            CategoryExtraData=apiManager.ExtraCategoryData(this.state.StaredCategory)
            CategoryName=CategoryExtraData.name
            return(
                <TouchableOpacity style={listStyles.rowHighlighty} onPress={() => this.props.navigation.navigate('Category', {category: this.state.StaredCategory,categoryName: CategoryName})}>
                    <View style={this.state.listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={listStyles.rowTitle}>
                                <Text style={this.state.listStyles.rowTextTitle}>{CategoryName}</Text>
                            </View>
                            <View style={listStyles.rowDescription}>
                                <Text style={this.state.listStyles.rowTextDescription}>Eine Kategorie kann als favorisiert markiert werden.</Text>
                            </View>
                        </View>
                        <View style={listStyles.rowSide}>
                            <Icon
                            name={'star'}
                            size={60}
                            color={this.state.theme.secondary}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}



export default withNavigation(FavCategory);