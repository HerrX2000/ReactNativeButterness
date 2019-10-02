import React, {Component} from 'react';
import {
    ScrollView,
    Button,
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Linking,
    Image,
    TouchableOpacity
  } from 'react-native';

//ButternessApp
import constants from '../constants/constants';
import theme from '../constants/theme';
const baseStyles = require('../style/base');
import styles from './AboutUs.style';


class SettingsScreen extends React.Component{
            
    onPressLink(Link){
        Linking.openURL(Link)
    }


    render(){
        const { navigation, banner } = this.props;
        return(
            <View style={baseStyles.body}>
            <View style={baseStyles.body}>
            <ScrollView>
              <SafeAreaView forceInset={{ horizontal: 'always' }}>
                <View style={baseStyles.banner}>
                      <Text style={baseStyles.bannerTitle}>Allgemeines</Text>
                </View>
                <View style={styles.padding}>
                    <Button
                    onPress={() => navigation.navigate('SettingsScreen')}
                    title="Einstellungen"
                    color={theme.button.primary}
                    />
                </View>
                <View style={baseStyles.banner}>
                      <Text style={baseStyles.bannerTitle}>Website</Text>
                </View>
                <View style={styles.websiteLogoView}>
                    <TouchableOpacity onPress={() => this.onPressLink(constants.baseURL)}>
                        <Image
                            style={styles.websiteLogoImage}
                            source={require('./../assets/img/Logo.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={baseStyles.banner}>
                      <Text style={baseStyles.bannerTitle}>Soziale Medien</Text>
                </View>
                <View style={styles.padding}>
                    <Button
                    onPress={() => this.onPressLink(constants.social.patreon)}
                    title="Patreon"
                    color={theme.social.patreon}
                    />
                    <Button
                    onPress={() => this.onPressLink(constants.social.reddit)}
                    title="Reddit"
                    color={theme.social.reddit}
                    />
                    <Button
                    onPress={() => this.onPressLink(constants.social.twitter)}
                    title="Twitter"
                    color={theme.social.twitter}
                    />
                    <Button
                    onPress={() => this.onPressLink(constants.social.discord)}
                    title="Discord"
                    color={theme.social.discord}
                    />
                    <Button
                    onPress={() => this.onPressLink(constants.social.facebook)}
                    title="Facebook"
                    color={theme.social.facebook}
                    />                    
                </View>
                <View style={baseStyles.banner}>
                      <Text style={baseStyles.bannerTitle}>Über uns</Text>
                </View>
                <View style={styles.padding}>
                    <Button
                    onPress={() => navigation.navigate('Team')}
                    title="Team"
                    color={theme.button.primary}
                    />
                    <Button
                    onPress={() => navigation.navigate('Page',{slug:'partner'})}
                    title="Partner"
                    color={theme.button.primary}
                    />
                    <Button
                    onPress={() => navigation.navigate('Page',{slug:'impressum'})}
                    title="Datenschutzerklärung"
                    color={theme.button.primary}
                    />
                    <Button
                    onPress={() => navigation.navigate('Impressum')}
                    title="Impressum"
                    color={theme.button.primary}
                    />
                    <Button
                    onPress={() => this.onPressLink("mailto:"+constants.Mail)}
                    title={constants.Mail}
                    color={theme.button.primary}
                    />
                </View>
              </SafeAreaView>
              <StatusBar barStyle="default" />
              
              
            </ScrollView>
            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Version: {constants.Version}</Text>
            </View>
            <View>
              <Button onPress={() => navigation.goBack(null)} title="Zurück" color={theme.primaryVariant} />
            </View>
          </View>
        );
    }
}

export default SettingsScreen;
