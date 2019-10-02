
import constants from '../constants/constants';
import blacklist from '../constants/blacklistTags';
import categoriesData from '../constants/categoriesData';
import Moment from 'moment/min/moment-with-locales';

const apiManager = {
  DataToEntry : function(apiName,data){
    entry=[];
      if(data==null){
        return false;
      }
      else{
        entry["slug"]=data.slug
        entry["title"] = data.title
        entry["summary"] = data.summary;
        if(typeof data.body != "undefined"){
          entry["body"] = this.ValidateEntryBody(data.body);
        }
        else{
          entry["body"]=null;
        }
        if(data.featured_image==null){
          //entry["image"]="https://your-website.com/imgs/favicon-96x96.png";
        }
        else{
          entry["image"]=data.featured_image
        }
        if(typeof data.categories[0] != "undefined"){
          entry["category"] = data.categories[0].name;
        }
        else{
          entry["category"]=null;
        }
        entry["author"] =data.author.first_name;
        entry["datetime"]=data.published
        return entry;
      }
  },
  ValidateEntryBody : function(body){
    searchvalue="src=\"\/\/"
    var validatedBody = body.replace(new RegExp(searchvalue,'g'), "src=\"https:\/\/");
    return validatedBody
  },
  ApiToData: function(data){
    entries=[];
    Moment.locale('de')
    for (i = 0; i < data.length; ++i) {
      entry=this.DataToEntry(constants["apiName"],data[i]);
      if(entry["summary"].length > 80){
        entry["description"] = entry["summary"].substr(0, 80)+"...";
      }
      else{
        entry["description"] = entry["summary"];
      }
      //2 is summer time, 1 is winter time
      summertime = Moment().isDST()
      zone = 1+summertime
      var utcDT = Moment(entry["datetime"] + "+"+zone+":00", "YYYY-MM-DD HH:mm:ssZ");
      entry["ago"] = Moment(utcDT,"YYYYMMDD").local().fromNow();
      tmp={
        slug: entry["slug"],
        title:entry["title"],
        summary:entry["summary"],
        description:entry["description"],
        image:entry["image"],
        category:entry["category"],
        author:entry["author"],
        ago:entry["ago"],        
      }
      entries.push(tmp)
    }
    return entries;
    //return[{slug: 'arma',title:'title',summary:'summary',author:'author',image:'https://images.sftcdn.net/images/t_app-logo-l,f_auto,dpr_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/4268759729/the-test-fun-for-friends-logo.png'}];
  },
  ValidateTags : function(tags){
    var validated = tags.filter(function(value){
        return !(blacklist.some(function(blacklistEl){
          return blacklistEl==value.slug
        }))
    });
    return validated
  },
  ExtraCategoryData:function(slug){
    
    extraCategoryData={slug:slug,name:slug,description:null}
    categoriesData.forEach(function(extraData){
        if(extraData.slug==slug){
          extraCategoryData={
            slug:slug,
            name:extraData.name,
            description:extraData.desc,
            icon:extraData.icon,
          };
        }
      });
      return extraCategoryData;
  },
  urlWithSlug: function(apiName,slug){
    // https://api.buttercms.com/v2/posts/armaworld-vereinsgrundungsdiskussion-eskaliert/?auth_token=8745cd17ce4f27e342c4de353752fbbed3ece4df
    url=constants.apiURL+"posts/"+slug+"/?auth_token="+constants.apiToken;
    console.log("urlWithSlug: "+url)
    return url;
  },
  urlForCategories: function(apiName){
    return ("https://api.buttercms.com/v2/categories/?auth_token="+constants.apiToken)
  },
  urlForTags: function(apiName){
    return ("https://api.buttercms.com/v2/tags/?auth_token="+constants.apiToken)
  },
  urlWithPara: function(apiName,parameter){
    var url=constants.apiURL;
    textSearch = parameter["textSearch"];
    tagSearch = parameter["tagSearch"];
    sticky = parameter["sticky"];
    newest = parameter["newest"];
    category = parameter["category"];
    page = parameter["page"]
      if(apiName=="legacy"){
        if(textSearch==null || textSearch==""){
          url = url + 'article';
          if(newest==="true"){
            url = url+"?newest"
          }
          
          if(sticky==="true"){
              url = url+"?sticky";
          }        
          if(category!="all"){
              var url=url+"?category="+category;
          }
          console.log("urlWithPara: "+url)
          return url;
        }
        else{
          return constants.apiURL+'article?q='+textSearch;
        }
      }
      else{
        if(textSearch==null || textSearch==""){
          //BUTTER API
          url = url + 'posts/?auth_token='+constants.apiToken;
          if(newest==="true"){
            url = url+"&page=1&page_size=3&exclude_body=true"
          }
          else if(page!=null){
            page_size="10"
            url=url+`&page=${page}&page_size=${page_size}&exclude_body=true`
          }
          else if(page==null){
            return false
          }
          /*
          Not supported in Butter API
          if(sticky==="true"){
              url = url+"&page=1&page_size=1";
          }
          */      
          if(category!="all"&&category!=null){
            var url=url+"&category_slug="+category
          }
          if(tagSearch!=null && tagSearch!="" && tagSearch!="false"){
              var url=url+"&tag_slug="+tagSearch;
          }
          console.log("urlWithPara: "+url)
          return url;
        }
        else{
          var url=constants.apiURL+"search/?query="+textSearch+'&auth_token='+constants.apiToken;
          return url;
        }
      }    
  }
}

export default apiManager;

//https://api.buttercms.com/v2/posts/armaworld-vereinsgrundungsdiskussion-eskaliert/?auth_token=8745cd17ce4f27e342c4de353752fbbed3ece4df