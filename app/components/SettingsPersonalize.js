  
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
    } from 'react-native';

    //ButternessApp
    import constants from './../constants/constants';
    import apiManager from '../functions/apiManager';
    import defaultCategories from './../constants/categoriesData';
    import {requestFetch} from '../functions/Networking'
    import Settings from './commonComponents/Settings';
    import Storage from '../functions/Storage';
    import styles from './SettingsScreen.style';
    import stylesDark from './SettingsScreen.styleDark';
    import theme from '../constants/theme';
    import {retrieveTheme,setThemedStyles, initStylesWith} from './../functions/Styling';


    const listStyles = require('./../style/list');
    const baseStyles = require('./../style/base');
    const pickerKeys= [
        "StaredCategory",
        ];
    const switchKeys= [
    "HomeDisplayRecommendedArticels",
    "HomeDisplayNewestArticels",
    "HomeDisplayStaredCategory",
    "HomeDisplayMore",
    ];
    
            
            

    class SettingsScreen extends Component{
        constructor(props){
            super(props);
            state ={
                NotificationsAll:Settings.notifications.all,
                ThemeDark:Settings.theme.dark,
                HomePersonalized:Settings.home.personalized,
                HomeDisplayRecommendedArticels:Settings.home.display.RecommendedArticels,
                HomeDisplayNewestArticels:Settings.home.display.NewestArticels,
                HomeDisplayMore:Settings.home.display.More,
                HomeDisplayStaredCategory:Settings.home.display.StaredCategory,
                categoriesData:defaultCategories,
                }
            this.state = initStylesWith(state);
        }
        componentDidMount(){
            this._mounted=true;
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

            this.fetchCategories();
        }

        fetchCategories(){
            var url = apiManager.urlForCategories("butter");
            
   
   
           requestFetch(url)
               .then((response) => response.json())
               .then((response) => {
                   if(this._mounted){
                       if(this._mounted){
                           this.setState({
                               categoriesData:response.data,
                           });
                       }
                       
                   }
               }).
               catch((error) =>{
                   this.setState({
                       errorFound: true,
                       categoriesData:defaultCategories,
                   });
               console.log("Error on requestFetch: "+error)});
       }
        
        onPressLink(){
            var url = "https://twitter.com/zerbarian";
            Linking.openURL(url)
        }
        onSettingsReset(key,value,dependencies,dependent){
            Alert.alert(
                'Startseite zurücksetzen?',
                'Persöhnliche Startseiteneinstellungen auf die Standarteinstellungen zurücksetzen?',
                [
                  {text: 'Abbrechen', onPress: () => console.log('Zurücksetzen: Abgebrochen'), style: 'cancel'},
                  {text: 'Zurücksetzen', onPress: () => this.SettingsHomeReset()},
                ],
                { cancelable: true }
              )                      
        }
        SettingsHomeReset(){
            const prefix="Settings";
            const homeDefaultSettings ={
                HomePersonalized:Settings.home.personalized,
                HomeDisplayRecommendedArticels:Settings.home.display.RecommendedArticels,
                HomeDisplayNewestArticels:Settings.home.display.NewestArticels,
                HomeDisplayMore:Settings.home.display.More,
                HomeDisplayStaredCategory:Settings.home.display.StaredCategory
            }
            for(key in homeDefaultSettings){
                let value = homeDefaultSettings[key];
                let string = value.toString();
                Storage.setData(prefix+key,string);
                this.setState({[key]:value})
            }  
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
            if(switchKeys.includes(key)){
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
        screenStyles=styles
          if(this.state.themeName=="dark"){
            screenStyles=stylesDark
          }
          return(
            <View style={this.state.baseStyles.body}>
                <ScrollView style={this.state.listStyles.view}>
                    <View style={this.state.listStyles.row}>
                        <View style={this.state.listStyles.rowBody}>
                            <View style={this.state.baseStyles.banner}>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <View style={{flex:1}}>
                                        <Text style={this.state.baseStyles.bannerTitle}>Personalisierte Startseite</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={this.state.listStyles.rowTitle}>
                                {/*
                                <View style={styles.settingsElement}>
                                    <TouchableOpacity style={styles.settingsTouchable} onPress={()=>this.onSettingsSwitch("HomeDisplayRecommendedArticels")}>
                                        <Text style={screenStyles.settingsText}>Empfohlene Artikel</Text>
                                        <Switch value={this.state.HomeDisplayRecommendedArticels} 
                                        trackColor={{false: null, true: theme.secondary}}
                                        thumbColor={theme.background.primary}
                                        onValueChange={(value) => this.onSettingsSwitch("HomeDisplayRecommendedArticels",value)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                */}
                                <View style={styles.settingsElement}>
                                    <TouchableOpacity style={styles.settingsTouchable} onPress={()=>this.onSettingsSwitch("HomeDisplayNewestArticels")}>
                                        <Text style={screenStyles.settingsText}>Neuste Artikel</Text>
                                        <Switch value={this.state.HomeDisplayNewestArticels} 
                                        trackColor={{false: null, true: theme.secondary}}
                                        thumbColor={theme.background.primary}
                                        onValueChange={(value) => this.onSettingsSwitch("HomeDisplayNewestArticels",value)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.settingsElement}>
                                    <View style={styles.settingsTouchable}>
                                        <Text style={screenStyles.settingsText}>Favorisierte Kategorie</Text>
                                        <Picker
                                            selectedValue={this.state.StaredCategory}
                                            style={{ height: 32, width: 120,...screenStyles.picker }}
                                            prompt='Favorisierte Kategorie'
                                            
                                            onValueChange={(itemValue, itemIndex) => this.onSettingsPick("StaredCategory",itemValue)}>
                                            {this.state.categoriesData.map((item, index) => {
                                                return (<Picker.Item label={item.name} value={item.slug} key={index}/>) 
                                            })}
                                            
                                        </Picker>
                                        <Switch value={this.state.HomeDisplayStaredCategory} 
                                        trackColor={{false: null, true: theme.secondary}}
                                        thumbColor={theme.background.primary}
                                        onValueChange={(value) => this.onSettingsSwitch("HomeDisplayStaredCategory",value)}
                                        />                                        
                                    </View>
                                    <Text style={listStyles.rowTextDescription}>Eine Kategorie kann als favorisiert markiert werden.</Text>
                                </View>
                               
                                <View  style={styles.settingsElement}>
                                    <TouchableOpacity style={styles.settingsTouchable} onPress={()=>this.onSettingsSwitch("HomeDisplayMore")}>
                                    <Text style={screenStyles.settingsText}>Mehr</Text>
                                    <Switch value={this.state.HomeDisplayMore} 
                                    trackColor={{false: null, true: theme.secondary}}
                                    thumbColor={theme.background.primary}
                                    onValueChange={(value) => this.onSettingsSwitch("HomeDisplayMore",value)}
                                    />
                                    </TouchableOpacity>
                                </View>
                                <Text style={listStyles.rowTextDescription}>Hinweis: Änderungen werden erst nach Aktualisierung sichtbar.</Text>
                                <Button title="Zurücksetzen" color={theme.button.primary} onPress={()=>this.onSettingsReset("Home")}/>
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



    export default SettingsScreen;
    