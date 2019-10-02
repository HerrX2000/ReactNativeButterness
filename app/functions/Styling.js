import Storage from './Storage';
import Time from './Time';
import themeBright from '../constants/themeBright';
import themeDark from '../constants/themeDark';

function getStyles(array){
 
  var styles = null;
  const baseStyle = require ('./../style/base');
  const listStyle = require ('./../style/list');
  for(var i = 0; i < array.length; i++){
    if(array[i]=="base"){
      let request = baseStyle
      var styles = styles + request;
    }
    else if(array[i]=="list"){
      let request = listStyle
      var styles = styles + request;
    }
}
  const style = styles;
  return style;
}
function getStyle(input,theme="bright"){
  if(theme=="dark"){
    var baseStyle = require ('./../style/darkBase');
    var listStyle = require ('./../style/darkList');
  }
  else{
    var baseStyle = require ('./../style/base');
    var listStyle = require ('./../style/list');
  }
    if(input=="base"){
      var style = baseStyle
    }
    else if(input=="list"){
      var style = listStyle
    }
    else if(input=="background"){
      var style = "black"
    }
    else if(input=="header"){
     return headerStyles;
    }
  return style;
}

function getTheme(themeName="bright"){
  if(themeName=="dark"){
    var theme = themeDark;
  }
  else{
    var theme = themeBright
  }
  return theme;
}

async function streamStyle(component,input){
  var SettingsStyleListCompact = await Storage.streamData("SettingsStyleListCompact");
  if(SettingsStyleListCompact=="true"){
    var listStyle = require ('./../style/compactList');
  }else{
    var listStyle = require ('./../style/list');
  }
  
  return listStyle;
}

function initStylesWith(object,reqStyles="all"){
  var theme = setThemedStyles("bright",reqStyles);
  var object = object;
  const returnMerged = { ...object, ...theme};
  return(returnMerged);
}


function setThemedStyles(theme="bright",reqStyles="all"){
  if(reqStyles!="all"&&reqStyles!=null&&reqStyles!==false&&reqStyles!==true){
    var themeFile=getTheme(theme);
    style={}
    reqStyles.forEach(function(el){
      objName=el+"Styles";
      obj={baseStyles:themedBaseStyles}
      style[objName]=getStyle(el,theme);
    })
    return {
      themeName:theme,
      theme:themeFile,
      ...style
    }
  }
  else{
    var themedListStyles=getStyle("list",theme)
    var themedBaseStyles=getStyle("base",theme)
    var themeFile=getTheme(theme);
    return{
        themeName:theme,
        theme:themeFile,
        baseStyles:themedBaseStyles,
        listStyles: themedListStyles,
    }
  }
}

async function retrieveTheme(){
  themeKey = await Storage.streamData("SettingsThemeDark");
  autoDarkMode = await Storage.streamData("SettingsThemeDarkAuto");
  if (themeKey=="true" && autoDarkMode=="true"){
    night=Time.Night()
    if(night){
      return "dark"
    }
    else{
      return "bright"
    }
  }
  else if (themeKey=="true"){
    return "dark"
  }else{
    return "bright"
  }
}
export { getStyles, getStyle ,getTheme, streamStyle, setThemedStyles, retrieveTheme,initStylesWith}