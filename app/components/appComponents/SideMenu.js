import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {NavigationActions} from 'react-navigation';
import {
ScrollView,
Text,
View,
TouchableHighlight,
TouchableOpacity,
Image,
Button
} from 'react-native';


//ButternessApp
import constants from '../../constants/constants';
import styles from './SideMenu.style';
import stylesDark from './SideMenu.styleDark';
import {retrieveTheme,setThemedStyles, initStylesWith} from './../../functions/Styling';

class SideMenu extends Component {
  constructor(props){
    super(props);
    this.state = setThemedStyles();
  }

  componentDidMount(){
    retrieveTheme().then((value)=>{
      this.setState({themeType:value});
    })
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    dark=false
    if(this.state.themeType=="dark"){
      dark=true
    }
    return (
      <View style={styles.container}>
        <View style={dark?stylesDark.headerContainer:styles.headerContainer}>
              <Text style={dark?stylesDark.headerText:styles.headerText}>
                Butterness App
              </Text>
              
        </View>
        <ScrollView style={dark?stylesDark.navContainer:styles.navContainer}>
          <View>
            <TouchableOpacity onPress={this.navigateToScreen('Root')}>
              <View style={dark?stylesDark.navSection:styles.navSection}>
                <Text style={dark?stylesDark.navItemText:styles.navItemText}>
                Startseite
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen('AboutUs')}>
              <View style={dark?stylesDark.navSection:styles.navSection}>
                <Text style={dark?stylesDark.navItemText:styles.navItemText}>
                Über uns
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen('SettingsScreen')}>
              <View style={dark?stylesDark.navSection:styles.navSection}>
                <Text style={dark?stylesDark.navItemText:styles.navItemText}>
                Einstellungen
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={dark?stylesDark.footerContainer:styles.footerContainer}>
          <Image
                style={styles.footerImage}
                source={require('./../../assets/img/Logo.png')}
            />
        </View>
        <View style={dark?stylesDark.footerVersion:styles.footerVersion}>
            <Text style={dark?stylesDark.footerText:styles.footerText} onPress={this.navigateToScreen('Impressum')}>Impressum</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;