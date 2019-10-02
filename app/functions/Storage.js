import AsyncStorage from '@react-native-community/async-storage';

const Storage = {
  setData : async function(key,value){
    try {
      await AsyncStorage.setItem(key, value);
      const result = await AsyncStorage.getItem(key);
      console.log("Storage Update: "+key+"="+result)
    } catch (error) {
      console.log(error);
    }
    },
  setArray : async function(key,value){
    try {
      console.log("Store Item: "+key);
      await AsyncStorage.setItem(key, JSON.stringify(value));
      const result = await AsyncStorage.getItem(key);
      console.log("Stored Value: "+result)
    } catch (error) {
      console.log(error);
    }
    },
   addToArray : async function(key,value){
      try {
        console.log("Merge Item: "+key);
        await AsyncStorage.mergeItem(key, JSON.stringify(value));
        const result = await AsyncStorage.getItem(key);
        console.log("Merged Value: "+result)
      } catch (error) {
        console.log(error);
      }
      },
  retrieveData : function(key,callback){
    return AsyncStorage.getItem(key).then((value) => {
      console.log("Retrieved Data: "+key+"="+value)
      if(value){
        return Promise.resolve(value)
      }else {
        return Promise.resolve(null)
      }
    })
      /*
      Implement best for multiple like this:
      1. Make a constant outside of class
      const keys = ["key1","key2",...];
      
      2. Make a loop for all keys to retrieve Data and setState for Example
          for(var i = 0; i < keys.length; i++){
              let key = keys[i];
              console.log("KEY: "+key);
              Storage.retrieveData(key).then((value) => {
                if(value!=null){
                  name = key.replace("SettingsHome","");
                  this.setState({[name]:value})
                  console.log("Set State: "+name+"="+value)
                }
              } );
          }
      */

    
     
    },
    streamData : function(key,callback){
      return new Promise(resolve => {
        AsyncStorage.getItem(key).then((value) => {
          console.log("Retrieved Data: "+key+"="+value)
          if(value){
            resolve(value)
          }else {
            resolve(null)
          }
        })
      });
    },
    /*
      function must be asycn!
      var SettingsStyleListCompact = await Storage.streamData("SettingsStyleListCompact");
     */
    retrieveArray :  function(key,callback){
      /*FUCK IT DOESNT WORK USE:
         
         AsyncStorage.getItem(key).then((value) => {
           if(value){
             console.log(value);
           }
         });    
         
      */
     }
}

export default Storage;
