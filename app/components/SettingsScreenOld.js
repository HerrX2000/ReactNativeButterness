
    
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
      TouchableOpacity
    } from 'react-native';

    import { AsyncStorage } from "react-native"
    
    import constants from './../constants/constants';
    import Settings from './commonComponents/Settings';

    import Storage from '../functions/Storage';

    import styles from './SettingsScreen.style';
    
    const pickerKeys= [
        //"NotificationsAll",
        "StyleListCompact",
        ];
    const switchKeys= [
    //"NotificationsAll",
    "ThemeDark",
    "ThemeDarkAMOLED",
    "HomeDisplayRecommendedArticels",
    "HomeDisplayNewestArticels",
    "HomeDisplayStaredCategory",
    "HomeDisplayMore",
    "StyleListCompact",
    "SaveData"
    ];
    const SettingsEntries= {
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
            this.state ={
                NotificationsAll:Settings.notifications.all,
                ThemeDark:Settings.theme.dark,
                HomePersonalized:Settings.home.personalized,
                HomeDisplayRecommendedArticels:Settings.home.display.RecommendedArticels,
                HomeDisplayNewestArticels:Settings.home.display.NewestArticels,
                HomeDisplayMore:Settings.home.display.More,
                HomeDisplayStaredCategory:Settings.home.display.StaredCategory
                }
            }
        componentDidMount(){
            

            var Prefix="Settings";

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
            /*
            AsyncStorage.getItem("SettingsNotificationsAll").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({NotificationsAll:StorageKeyValue})
                }
            });
            
            AsyncStorage.getItem("SettingsThemeDark").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({ThemeDark:StorageKeyValue})
                }
            });

            AsyncStorage.getItem("SettingsHomeCategoriesFeatured").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({HomeCategoriesFeatured:StorageKeyValue})
                }
            });
            AsyncStorage.getItem("SettingsHomePersonalized").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({HomePersonalized:StorageKeyValue})
                }
            });
            AsyncStorage.getItem("SettingsHomeDisplayStaredCategory").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({HomeDisplayStaredCategory:StorageKeyValue})
                }
            });
            AsyncStorage.getItem(Prefix+"HomeDisplayRecommendedArticels").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({HomeDisplayRecommendedArticels:StorageKeyValue})
                }
            });
            AsyncStorage.getItem(Prefix+"HomeDisplayNewestArticels").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({HomeDisplayNewestArticels:StorageKeyValue})
                }
            });
            AsyncStorage.getItem(Prefix+"HomeDisplayStaredCategory").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({HomeDisplayStaredCategory:StorageKeyValue})
                }
            });
            AsyncStorage.getItem(Prefix+"HomeDisplayMore").then((value) => {
                if(value){
                var StorageKeyValue = (value == 'true');
                this.setState({HomeDisplayMore:StorageKeyValue})
                }
            });
            */
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
          return(
            <View style={baseStyles.body}>
                <ScrollView style={listStyle.view}>
                    <View style={listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={baseStyles.banner}>
                                <Text style={baseStyle.bannerTitle}>Push-Benachrichtigungen</Text>
                            </View>
                            <View style={listStyles.rowTitle}>
                                
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.settingsText}>Alle</Text>
                                    <Switch value={this.state.NotificationsAll}
                                    onValueChange={(value) => this.onSettingsSwitch("NotificationsAll",value)}
                                    />
                                </View>
                                
                                <Text style={listStyles.rowTextDescription}>Release: November 2018</Text>
                            </View>
                        </View>
                    </View>
                    <View style={listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={baseStyles.banner}>
                                <Text style={baseStyle.bannerTitle}>Darstellung</Text>
                            </View>
                            <View style={listStyles.rowTitle}>
                                
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.settingsText}>Kompakte Listen</Text>
                                    <Picker
                                        selectedValue={this.state.StyleListCompact}
                                        style={{ height: 32, width: 120 }}
                                        onValueChange={(itemValue, itemIndex) => this.onSettingsPick("StyleListCompact",itemValue)}>
                                        <Picker.Item label="nie" value="never" />
                                        <Picker.Item label="nur unterwegs" value="cellular" />
                                        <Picker.Item label="immer" value="true" />
                                    </Picker>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.settingsText}>Mobiledatensparen</Text>
                                    <Switch value={this.state.SaveData}
                                    onValueChange={(value) => this.onSettingsSwitch("SaveData",value)}
                                    />
                                </View>
                                
                                <Text style={listStyles.rowTextDescription}>Alpha</Text>
                            </View>
                        </View>
                    </View>
                    <View style={listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={baseStyles.banner}>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <View style={{flex:1}}>
                                        <Text style={baseStyle.bannerTitle}>Personalisierte Startseite</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={listStyles.rowTitle}>
                                
                                <TouchableOpacity onPress={()=>this.onSettingsSwitch("HomeDisplayRecommendedArticels")} style={{flexDirection:'row'}}>
                                    <View style={styles.settingsEntry}>
                                        <Text style={styles.settingsText}>Empfohlene Artikel</Text>
                                        <Switch value={this.state.HomeDisplayRecommendedArticels} 
                                        onValueChange={(value) => this.onSettingsSwitch("HomeDisplayRecommendedArticels",value)}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.onSettingsSwitch("HomeDisplayNewestArticels")} style={{flexDirection:'row'}}>
                                    <View style={styles.settingsEntry}>
                                        <Text style={styles.settingsText}>Neuste Artikel</Text>
                                        <Switch value={this.state.HomeDisplayNewestArticels} 
                                        onValueChange={(value) => this.onSettingsSwitch("HomeDisplayNewestArticels",value)}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View  style={{flexDirection:'row'}}>
                                    <Text style={styles.settingsText}>Favorisierte Kategorie</Text>
                                    <Switch value={this.state.HomeDisplayStaredCategory} 
                                    onValueChange={(value) => this.onSettingsSwitch("HomeDisplayStaredCategory",value)}
                                    />
                                </View>
                                <Text style={listStyles.rowTextDescription}>Eine Kategorie kann als favorisiert markiert werden.</Text>
                                <View  style={{flexDirection:'row'}}>
                                    <Text style={styles.settingsText}>Mehr</Text>
                                    <Switch value={this.state.HomeDisplayMore} 
                                    onValueChange={(value) => this.onSettingsSwitch("HomeDisplayMore",value)}
                                    />
                                </View>
                                <Text style={listStyles.rowTextDescription}>Hinweis: Änderungen werden erst nach Aktualisierung sichtbar.</Text>
                            </View>
                        </View>     
                    </View>
                    <View style={listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={baseStyles.banner}>
                                <Text style={baseStyle.bannerTitle}>Theme</Text>
                            </View>
                            <View style={listStyles.rowTitle}>
                                
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.settingsText}>Dunkler Modus</Text>
                                    <Switch value={this.state.ThemeDark} 
                                    onValueChange={(value) => this.onSettingsSwitch("ThemeDark",value,"ThemeDarkAMOLED")}
                                    />
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.settingsText}>AMOLED</Text>
                                    <Switch value={this.state.ThemeDarkAMOLED} 
                                    onValueChange={(value) => this.onSettingsSwitch("ThemeDarkAMOLED",value,null,"ThemeDark")}
                                    />
                                </View>
                                <Text style={listStyles.rowTextDescription}>Release: Mitte Oktober 2018</Text>
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
    var listStyle = require('./../style/list');

    const listStyles = listStyle;
    
    var baseStyle = require('./../style/base');

    const baseStyles = baseStyle;


    export default SettingsScreen;
    