function requestFetch(url, options) {
    function timeout(ms, promise) {
        sec=ms/1000;
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            reject ('Timeout after '+sec+'sec');
          }, ms)
          promise.then(resolve, reject)
        })
      }

    if (options == null) options = {}
    if (options.credentials == null) options.credentials = 'same-origin'
    return timeout(10000, fetch(url, options)).then(function(response) {
        console.log("requestFetch: "+url+" ("+response.status+")")
      if (response.status >= 200 && response.status < 300) {
        //import DataUsageLog from '../functions/DataUsageLog';.addData("import DataUsageLog from '../functions/DataUsageLog';ListView",response._bodyBlob.size);
        return Promise.resolve(response)
      } else {
        var error = console.log(response.status)
        return Promise.reject(response.status)
      }
    })
  }

export {requestFetch}