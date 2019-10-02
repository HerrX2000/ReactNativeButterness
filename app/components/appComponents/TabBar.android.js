import React, {Component} from 'react';

import {
    View,
    TouchableNativeFeedback
  } from 'react-native';

  
import theme from '../../constants/theme';

import { Icon } from 'react-native-elements'

import {retrieveTheme,setThemedStyles, initStylesWith} from '../../functions/Styling';

class TabBar extends React.Component{
    constructor(props){
        super(props);
        state={
          theme:"bright"
        }
        this.state=initStylesWith(state);        
    }
    componentDidMount(){
      this._mounted = true;
      retrieveTheme().then((value)=>{
          if(value){
              this.setState({theme:value});
          }
      })
    }

    
    render () {
        selected=this.props.navigation.state.index;
        focusedEntries=false
        focusedCategories=false
        focusedHome=false
        if(selected==1){
          focusedEntries=true
        }
        else if(selected==2){
          focusedCategories=true
        }
        else{
          focusedHome=true
        }
        if(this.state.theme=="dark"){
          darkMode=true
        }
        else{
          darkMode=false
        }
      return (
      <View style={{flexDirection:'row',backgroundColor:darkMode?"black":"white",
    elevation: 10,}} disabled={focusedHome?true:false}>
        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <View style={{flex:1,paddingVertical:8}}>
            <Icon
              name={'home'}
              size={32}
              color={focusedHome ? theme.primary:darkMode?"white":theme.tabBar.button}
            />            
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('EntryListScreen')} disabled={focusedEntries?true:false}>
          <View style={{flex:1,paddingVertical:8}}>
              <Icon
                name={'subject'}
                size={32}
                color={focusedEntries ? theme.primary:darkMode?"white":theme.tabBar.button}
              />            
          </View>
        </TouchableNativeFeedback>
        
        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('CategoryOverview')} disabled={focusedCategories?true:false}>
          <View style={{flex:1,paddingVertical:8}}>
              <Icon
                name={'widgets'}
                size={32}
                color={focusedCategories ? theme.primary:darkMode?"white":theme.tabBar.button}
              />
          </View>
        </TouchableNativeFeedback>
      </View>
      )
    }
  }

export default TabBar