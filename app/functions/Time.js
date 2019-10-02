import Moment from 'moment/min/moment-with-locales';

import {requestFetch} from './Networking'
import sunpath from '../constants/sunpath'

const Time = {
  Sec : function(){
    var Sec = Moment().format("s");
    return Sec
  },
  Min : function(){
    var Min = Moment().format("m");
    return Min
  },
  Hrs : function(){
    var Hours = Moment().format("H");
    return Hours
  },
  Month : function(){
    var Month = Moment().format("M");
    return Month
  },
  DayOfYear : function(){
    var DayOfYear = Moment().format("DDD");
    return DayOfYear
  },
  Sumertime: function(){
    return Moment().isDST();
  },
  Sunpath: function(){
    return sunpath["berlin"][this.Month()]
  },
  Night : function(){
    Hours = this.Hrs()
    Min = this.Min()
    curSunpath = this.Sunpath();
    curSunrise = curSunpath.sunrise;
    curSunset = curSunpath.sunset;
    if(Hours > curSunset['h'] || (Hours == curSunset['h'] && Min >= curSunset['m']) || Hours < curSunrise['h'] || (Hours == curSunrise['h'] && Min >= curSunrise['m'])){
      return true;
    }
    else return false;
  },


}

export default Time;