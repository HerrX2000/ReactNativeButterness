import React, {Component} from 'react';
import {
    Button,
    Text,
    View,
    Image,
    Linking
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements'

//ButternessApp

import EntryList from '../components/EntryList';
import FavCategory from '../elements/FavoriteCategory';
import constants from '../constants/constants';
import theme from '../constants/theme';
import {setThemedStyles, retrieveTheme} from '../functions/Styling';
const baseStyles = require('./../style/base');
const listStyles = require('./../style/list');


 class NewestArticels extends React.Component{
    constructor(props){
        super(props);
        }
    render(){
        if(this.props.display == "false" || this.props.display == false){
            return(null);
        }
        else{
            return(
                <View style={{flex:1}}>
                    <View style={baseStyles.banner}>
                    <Text style={baseStyles.bannerTitle}>Neuste Artikel</Text>

                    </View>
                    
                    <EntryList propCategory="all" propSticky="false" propNewest="true"/>
                </View>
            );
        }
    }
}

class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state = setThemedStyles();
        }
        componentDidMount(){
            retrieveTheme().then((value)=>{
                if(value){
                    this.setState(setThemedStyles(value));
                }
            })
        }
    render(){
        if(this.props.display == "false" || this.props.display == false){
            return(null);
        }
        else{
            return(
                <View style={{marginBottom:10,alignItems:'center'}}>       
                    <Image
                        style={{
                            height:66,
                            width:80,
                        }}
                        accessibilityLabel="Butterness Logo"
                        source={require('./../assets/img/Logo.png')}
                    />
                    <Text style={this.state.listStyles.rowTextTitle}>Butterness</Text>
                    <Text style={this.state.listStyles.rowTextDescription}>Einfach nur ehrlich. Echt jetzt!</Text>
                    <Text style={this.state.listStyles.rowTextDescription}>Wir sind aktuell offline.</Text>
                </View>
            );
        }
    }
}

class RecommendedArticels extends React.Component{
    constructor(props){
        super(props);
        }
    render(){
        if(this.props.display == "false" || this.props.display == false){
            return(null);
        }
        else{
            return(
                <View style={{flex:1}}>
                    <View style={baseStyles.banner}>
                        <Text style={baseStyles.bannerTitle}>Empfohlene Artikel</Text>
                    </View>
                    <EntryList propCategory="all" propSticky={true} fullscreen={false}/>
                </View>
            );
        }
    }
}

class More extends React.Component{
    constructor(props){
        super(props);
        }
        
    onPressLink(Link){
        Linking.openURL(Link)
    }
    render(){
        const {navigation}= this.props;
        if(this.props.display == "false" || this.props.display == false){
            return(null);
        }
        else{
            return(
                <View>
                    <View style={baseStyles.banner}>
                            <Text style={baseStyles.bannerTitle}>Mehr</Text>
                    </View>
                    <View style={{padding:10}}>
                        <Button
                            onPress={() => navigation.navigate('Team')}
                            title="Team"
                            color={theme.button.primary}
                        />
                        <Button
                            onPress={() => navigation.navigate('AboutUs')}
                            title="Über uns"
                            color={theme.button.secondary}
                        />
                        <Button
                            onPress={() => this.onPressLink(constants.baseURL)}
                            title="Website"
                            color={theme.button.tertiary}
                        />
                    </View>
                </View>
            );
        }
    }
}



class StaredCategory extends React.Component{
    constructor(props){
        super(props);
        }

    render(){
        
        if(this.props.display == "false" || this.props.display == false){
            return(null);
        }
        else{
            const {navigation}= this.props;
            return(
                <View style={{flex:1}}>
                    <View style={baseStyles.banner}>
                        <View style={{flex:1}}>
                            <Text style={baseStyles.bannerTitle}>Favorisierte Kategorie</Text>
                        </View>
                            <Icon
                            name={'edit'}
                            size={24}
                            color={theme.secondary}
                            onPress={() => navigation.navigate('SettingsPersonalize')}
                        />
                    </View>
                    <FavCategory />                   
                </View>
                );
        }
    }
}


More = withNavigation(More);
StaredCategory = withNavigation(StaredCategory);
export {RecommendedArticels, NewestArticels, StaredCategory, More, Banner};