
    
    import React, {Component} from 'react';
    import {
      Button,
      Text,
      ScrollView,
      View,
      Linking,
      Switch,
      Alert,
      Picker,
      TouchableOpacity,
      Clipboard
    } from 'react-native';
    import { Icon } from 'react-native-elements'

   import { StackActions, NavigationActions } from 'react-navigation';
   import Time from '../functions/Time';
    //ButternessApp
    import constants from '../constants/constants';
    import Settings from './commonComponents/Settings';
    import Storage from '../functions/Storage';

    import theme from '../constants/theme';
    import {retrieveTheme,setThemedStyles, initStylesWith} from './../functions/Styling';
    
    const pickerKeys= [
        "StyleListCompact",
        ];
    const switchKeys= [
    "ThemeDark",
    "ThemeDarkAuto",
    "StyleListCompact",
    "SaveData"
    ];
    
    const SettingsEntriesOLD= {
        "Push-Benachrichtigungen":{
            "Alle":null
        },
        "Darstellungen":{
            "Kompakte Liste":{
                "nie":"never",
                "nur unterwegs":"cellular",
                "immer":"allways"
            },
            "Mobiledatensparen":"switch",
            "Personalisierte Startseite":["navigate",null]
        },
        "Theme":{
            "Dunkler Modus":["switch","ThemeDark"],
            "AMOLED":["switch","ThemeDarkAMOLED"]
        }
    };
            
            

    class SettingsScreen extends Component{
        constructor(props){
            super(props);
            state={
                NotificationsAll:Settings.notifications.all,
                ThemeDark:Settings.theme.dark,
                HomePersonalized:Settings.home.personalized,
                HomeDisplayRecommendedArticels:Settings.home.display.RecommendedArticels,
                HomeDisplayNewestArticels:Settings.home.display.NewestArticels,
                HomeDisplayMore:Settings.home.display.More,
                HomeDisplayStaredCategory:Settings.home.display.StaredCategory
                }
            this.state = initStylesWith(state);
        }

        componentDidMount(){
            var Prefix="Settings";

            retrieveTheme().then((value)=>{
                if(value){
                    this.setState(setThemedStyles(value));
                }
            })

            for(var i = 0; i < switchKeys.length; i++){
                let key = switchKeys[i];
                Storage.retrieveData(Prefix+key).then((value) => {
                    if(value!=null){
                        let KeyValue = (value == 'true');
                        this.setState({[key]:KeyValue})
                    }
                } );
            }
            for(var i = 0; i < pickerKeys.length; i++){
                let key = pickerKeys[i];
                Storage.retrieveData(Prefix+key).then((value) => {
                    if(value!=null){
                        let KeyValue = value;
                        this.setState({[key]:KeyValue})
                    }
                } );
            }
        }
        
        onPressLink(){
            var url = "https://twitter.com/zerbarian";
            Linking.openURL(url)
        }
        onSettingsSwitch(key,value,dependencies,dependent){
            if(value==null){
                if(this.state[key]==true){   
                    value=false;
                }
                else{
                    value = true;
                }
            }
            var string = value.toString();
            const prefix="Settings";
            if(switchKeys.includes(key)/*key=="HomePersonalized" || key=="HomeDisplayStaredCategory" || key=="HomeCategoriesFeatured" || key=="HomeDisplayRecommendedArticels"
            || key == "HomeDisplayNewestArticels" || key == "HomeDisplayStaredCategory" || key == "HomeDisplayMore" || key == "ThemeDark"*/
            /*key=="NotificationsAll" ||*/){
               if(dependent != null){
                    if(this.state[dependent]==true){
                        Storage.setData(prefix+key,string);
                        this.setState({[key]:value})
                        if(key=="ThemeDarkAuto"&&value===true){
                            msgRise="\n Aktueller Sonnaufgang: "+Time.Sunpath().sunrise.h+":"+Time.Sunpath().sunrise.m;
                            msgSet="\n Aktueller Sonnenuntergang: "+Time.Sunpath().sunset.h+":"+Time.Sunpath().sunset.m
                            Alert.alert("Automatischer Nachtmodus","Bei Nacht wechselt die App automatisch in den Dunklen Modus. Als Referenz dient Berlin."+msgRise+msgSet,
                            [
                                {text: 'Okay'}
                            ])
                        }
                    }
                    else{
                        if (dependent=="ThemeDark"){
                            Alert. alert("Aktiviere zuerst den dunklen Modus")
                        }else{
                            Alert. alert("Aktiviere zuerst: "+dependent)
                        }
                    }                    
                }else{
                    
                    Storage.setData(prefix+key,string);
                    this.setState({[key]:value})
                    if(key=="SaveData"&&value==true){
                        Alert.alert("Deine Mobilen Daten sind uns wichtig!","Deswegen werden zum Beispiel in diesem Modus weniger Bilder aus dem Internet geladen, wenn du mit Mobilen Daten unterwegs bist.")
                    }
                    if(key=="ThemeDark"){
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Root' })],
                          });
                        Alert.alert("Theme geändert","App jetzt aktualisieren?",[
                            {text: 'Später'},
                            {text: 'Aktualisieren', onPress: () =>this.props.navigation.dispatch(resetAction)}
                        ])
                    }
                    
                }
                if(dependencies!=null&&value==false){
                    this.setState({[dependencies]:false})
                    Storage.setData(prefix+dependencies,"false");
                }
                
            }
            else{
                Alert.alert("Noch nicht verfügbar",key+" ist noch nicht verfügbar.")
            }
        }
        onSettingsPick(key,value,dependencies,dependent){
            var string = value.toString();
            const prefix="Settings";
            if(pickerKeys.includes(key)){
               if(dependent != null){
                    if(this.state[dependent]==true){
                        Storage.setData(prefix+key,string);
                        this.setState({[key]:value})
                    }
                    else{
                        Alert. alert("Aktiviere zuerst: "+dependent)
                    }                    
                }else{
                    Storage.setData(prefix+key,string);
                    this.setState({[key]:value})
                }
                if(dependencies!=null&&value==false){
                    this.setState({[dependencies]:false})
                    Storage.setData(prefix+dependencies,"false");
                }
                
            }
            else{
                Alert.alert("Noch nicht verfügbar",key+" ist noch nicht verfügbar.")
            }
        } 
        render(){
          const {navigation}= this.props;
          screenStyles=styles
          if(this.state.themeName=="dark"){
            screenStyles=stylesDark
          }
          return(
            <View style={this.state.baseStyles.body}>
                <ScrollView style={this.state.listStyles.view}>
            {/*}
                    <View style={this.state.listStyles.row}>
                        <View style={this.state.listStyles.rowBody}>
                            <View style={this.state.baseStyles.banner}>
                                <Text style={this.state.baseStyles.bannerTitle}>Push-Benachrichtigungen</Text>
                            </View>
                            <View style={this.state.listStyles.rowTitle}>
                                
                                <View style={screenStyles.settingsElement}>
                                    <View style={screenStyles.settingsTouchable}>
                                        <Text style={screenStyles.settingsText}>Alle</Text>
                                        <Switch value={this.state.NotificationsAll}
                                        onValueChange={(value) => this.onSettingsSwitch("NotificationsAll",value)}
                                        />
                                    </View>
                                </View>
                                
                                <Text style={this.state.listStyles.rowTextDescription}>Release: noch offen</Text>
                            </View>
                        </View>
                    </View>
          {*/}
                    <View style={this.state.listStyles.row}>
                        <View style={this.state.listStyles.rowBody}>
                            <View style={this.state.baseStyles.banner}>
                                <Text style={this.state.baseStyles.bannerTitle}>Darstellung</Text>
                            </View>
                            <View style={this.state.listStyles.rowTitle}>
                                
                                <View style={screenStyles.settingsElement}>
                                    <View style={screenStyles.settingsTouchable}>
                                        <Text style={screenStyles.settingsText}>Kompakte Listen</Text>
                                        <Picker
                                            selectedValue={this.state.StyleListCompact}
                                            style={{ height: 32, width: 120,...screenStyles.picker }}
                                            itemStyle={screenStyles.pikckerItem}
                                            prompt='Kompakte Liste'
                                            onValueChange={(itemValue, itemIndex) => this.onSettingsPick("StyleListCompact",itemValue)}>
                                            <Picker.Item label="nie" value="false" />
                                            <Picker.Item label="nur unterwegs" value="cellular" />
                                            <Picker.Item label="immer" value="true" />
                                        </Picker>
                                    </View>
                                </View>
                                <View style={screenStyles.settingsElement}>
                                    <TouchableOpacity style={screenStyles.settingsTouchable} onPress={()=>this.onSettingsSwitch("SaveData")} onLongPress={
                                        () => Alert.alert("Deine Mobilen Daten sind uns wichtig!","Deswegen werden zum Beispiel in diesem Moduse weniger Bilder aus dem Internet geladen.")
                                    }>
                                        <Text style={screenStyles.settingsText}>Mobile Daten sparen</Text>
                                        <Switch value={this.state.SaveData}
                                        trackColor={{false: null, true: theme.secondary}}
                                        thumbColor={theme.background.primary}
                                        onValueChange={(value) => this.onSettingsSwitch("SaveData",value)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={screenStyles.settingsElement}>
                                    <TouchableOpacity style={screenStyles.settingsTouchable} onPress={()=>navigation.navigate("SettingsPersonalize")}>
                                        <Text style={screenStyles.settingsText}>Personalisierte Startseite</Text>
                                        <Icon name='arrow-right' color={theme.secondary} type='entypo'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={this.state.listStyles.row}>
                        <View style={this.state.listStyles.rowBody}>
                            <View style={baseStyles.banner}>
                                <Text style={baseStyles.bannerTitle}>Theme</Text>
                            </View>
                            <View style={this.state.listStyles.rowTitle}>
                                <View style={screenStyles.settingsElement}>
                                    <TouchableOpacity style={screenStyles.settingsTouchable} onPress={()=>this.onSettingsSwitch("ThemeDark")}>
                                        <Text style={screenStyles.settingsText}>Dunkler Modus</Text>
                                        <Switch value={this.state.ThemeDark} 
                                        trackColor={{false: null, true: theme.secondary}}
                                        thumbColor={theme.background.primary}
                                        onValueChange={(value) => this.onSettingsSwitch("ThemeDark",value,"ThemeDarkAuto")}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={screenStyles.settingsElement}>
                                    <TouchableOpacity style={screenStyles.settingsTouchable} onPress={()=>this.onSettingsSwitch("ThemeDark")}>
                                        <Text style={screenStyles.settingsText}>Automatischer Nachtmodus</Text>
                                        <Switch value={this.state.ThemeDarkAuto} 
                                        trackColor={{false: null, true: theme.secondary}}
                                        thumbColor={theme.background.primary}
                                        onValueChange={(value) => this.onSettingsSwitch("ThemeDarkAuto",value,null,"ThemeDark")}
                                        />
                                    </TouchableOpacity>
                                </View>                                
                                <Text style={listStyles.rowTextDescription}>Beta: Neustart erforderlich.</Text>
                            </View>
                            
                        </View>
                            
                    </View>
                    <View style={this.state.listStyles.row}>
                        <View style={this.state.listStyles.rowBody}>
                            <View style={baseStyles.banner}>
                                <Text style={baseStyles.bannerTitle}>Build-Informationen</Text>
                            </View>
                            <View style={this.state.listStyles.rowTitle}>
                                <View style={screenStyles.settingsElement}>
                                    <TouchableOpacity style={screenStyles.settingsTouchable} onPress={()=>navigation.navigate("Changelog")}>
                                        <Text style={screenStyles.settingsText}>Changelog</Text>
                                        <Icon name='arrow-right' color={theme.secondary} type='entypo'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={screenStyles.settingsElement}>
                                    <TouchableOpacity style={screenStyles.settingsTouchable} onPress={()=>Clipboard.setString(constants.Version)}>
                                        <Text style={screenStyles.settingsText}>Version: {constants.Version}</Text>
                                        <Icon name='clipboard' color={theme.secondary} type='entypo'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                            
                    </View>
            
            
                </ScrollView>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Zurück"
                    color="#a74f13"
                />
             </View>
          );
        }
    }


    const listStyles = require('./../style/list');

    const baseStyles =  require('./../style/base');

    const styles = require('./SettingsScreen.style')
    const stylesDark = require('./SettingsScreen.styleDark')

    export default SettingsScreen;
    