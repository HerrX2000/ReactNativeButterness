import {
    Share,
    Linking
} from 'react-native';


import constants from '../constants/constants';

function onPressShare(slug,title) {
    if(title==null){
        var title = "Butterness Artikel";
    }
    if(title.length > 40){
        var shortTitle=title.substr(0, 40)+"..."
    }
    else{
        var shortTitle = title;
    }
    Share.share({
      message: constants.baseURL+"article/"+slug,
      url: constants.baseURL+"article/"+slug,
      title: title
    }, {
      // Android only:
      dialogTitle: shortTitle+' teilen',
    })
  }

  function onPressLink(url) {
    if(url==""||url==null)return false;
    else{
        Linking.openURL(url).catch(err => console.error('Fehler bei Aufruf des Links ',url,'(', err,')'));
    }
  }

export {onPressShare,onPressLink}