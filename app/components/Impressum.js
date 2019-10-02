
    
    
    import React, {Component} from 'react';
    import {
      Button,
      Text,
      View,
      Linking,
    } from 'react-native';
    
    //ButternessApp
    import constants from '../constants/constants';
    import Interactions from '../functions/Interactions'
    const listStyles = require('./../style/list');
    const baseStyles = require('./../style/base');

    class AboutUs extends Component{
    
        constructor(){
            super();
            this.state = {
                articlesData: {},
            };
        }       


        renderRow(data, sectionId, rowId, rowHighlight){
                return( 
                    <View style={listStyles.row}>
                        <View style={listStyles.rowBody}>
                            <View style={listStyles.rowTitle}>
                                <Text style={listStyles.rowTextHeader}>{data.title}</Text>
                                <Text style={listStyles.rowTextTitle}>{data.name}</Text>
                            </View>
                            <View style={listStyles.rowDescription}>
                                <Text style={listStyles.rowTextDescription}>{data.description}</Text>
                                <Text style={listStyles.rowTextDescription} onPress={() => Interactions.onPressLink(data.social.url)}>{data.social.site}: {data.social.name}</Text>
                            </View>
                        </View>
                    </View>
                )
        }

        onPressLink(Link){
            Linking.openURL(Link)
        }
        
        render(){
          return(
            <View style={{flex: 1, flexDirection:'column'}}>
                <View style={{flex:1,padding:10}}>
                    <Text>Die App wird entwickelt von Frederik Mann.</Text>
                    <Text>Diese Seite wird betrieben durch eine einfache Gesellschaft(Art. 530 &amp; 551, schweizer OR) mit Sitz in Zug(CH)</Text>
                    <Text style={{paddingTop:5,fontWeight:"bold"}}>Allgemeine Informationen</Text>
                    <Text style={{paddingTop:5,fontStyle: 'italic'}}>Name &amp; Anschrift:</Text>
                    <Text>Flavio Kleiber</Text>
                    <Text>Neugasse 8</Text>
                    <Text>6300 Zug</Text>
                    <Text style={{paddingTop:5,fontStyle: 'italic'}}>E-Mail Adresse:</Text>
                    <Text selectable={true} onPress={() => Interactions.onPressLink("mailto:"+constants.contactMail)}>{constants.contactMail}</Text>
                    <Text style={{paddingTop:5,fontStyle: 'italic'}}>Datenschutzerklärung:</Text>
                    <Text selectable={true} onPress={() => Interactions.onPressLink(constants.privacypolicyURL)}>your-website.com/impressum/datenschutz</Text>
                </View>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Zurück"
                    color="#a74f13"
                />
             </View>
          );
        }
    }
 
    
    export default AboutUs;
    