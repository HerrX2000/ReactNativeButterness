import AsyncStorage from '@react-native-community/async-storage';

import { Storage } from "./Storage"

const DataUsageLog = {
  setData : async function(key,value){
    try {
      await AsyncStorage.setItem(key, value);
      const result = await AsyncStorage.getItem(key);
      console.log("Storage Update: "+key+"="+result)
    } catch (error) {
      console.log(error);
    }
    },
  addData : function(key,addValue){
      AsyncStorage.getItem(key).then((value) => {
        if(value){
          oldValue=Number(value);
          newValue=oldValue+addValue
          newValue=newValue.toString()
          this.setData(key,newValue)
        }
        else{
          newValue=addValue.toString()
          this.setData(key,newValue)
        }
        console.log("DataUsageLog("+key+"): "+newValue+" B");
      }).
      catch((error) =>{
          console.log(error)
        }  )
    }
}

export default DataUsageLog;
