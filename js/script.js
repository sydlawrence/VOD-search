/* Author: 

*/

var yql = {
	getDataFromURL: function(url, xpath, callback) {

		var toURL = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'"+escape(url)+"'%20and%0A%20%20%20%20%20%20xpath%3D'"+escape(xpath)+"'&format=json&callback=?";
		$.getJSON(toURL, function(data) {
			callback(data);
		});
	}
}



var VODCentral = {

	resolvers: {},

	fetchSingle:function(resolver,query, callback) {
		resolver.search(query, function(results) {
			callback({resolver:resolver, results:results});
		});
	},

	search: function(query, callback) {
		for (i in VODCentral.resolvers) {
			this.fetchSingle(VODCentral.resolvers[i], query, callback);
		}
	}
}






var http = require('http'),
  request = require('request'),
  sha1 = require('./sha1'),
  _ = require('underscore')._,
  querystring = require('querystring');

function NetFlixAPI_vLOLS(apiKey, options) {
  this.version = '4';
  this.apiKey = apiKey;
  this.apiUrl = 'http://developer.echonest.com/api/v4/';
}

module.exports = NetFlixAPI_vLOLS;

NetFlixAPI_vLOLS.prototype.howdy = function() {
  return "Howdy!";
};

NetFlixAPI_vLOLS.prototype.execute = function(type, method, availableParams, givenParams, callback) {
  var finalParams = { api_key : this.apiKey, format : 'json' };
  
  for (var i = 0; i < availableParams.length; i++) {
    currentParam = availableParams[i];
    if (typeof givenParams[currentParam] !== 'undefined')
      finalParams[currentParam] = givenParams[currentParam];
  }
  var uri = this.apiUrl + type + '/' + method + '?' + querystring.stringify(finalParams);

  request(uri, function (error, response, body) {
    var parsedResponse;
    if (error || _.include([404], response.statusCode)) {
      callback({ 
        error : 'Unable to connect to the Echo Nest API endpoint.', 
        code : response.statusCode
      });
    } else {
      try {
        parsedResponse = JSON.parse(body);
      } catch (err) {
        callback({ error : 'Error parsing JSON answer from the Echo Nest API.', code : 'xxx'});
      }
      switch(parsedResponse.response.status.code) {
        case 0:
          callback(parsedResponse.response);
          break;
        case 1:
          callback({ error: 'Missing/Invalid API Key.', code: 'xxx' });
          break;
        case 2:
          callback({ error: 'This API key is not allowed to call this method', code: 'xxx'});
          break;
        case 4:
          callback({ error: parsedResponse.response.status.message, code: 'xxx'})
          break;
        case 5:
          console.log(parsedResponse.response);
          callback({ error: 'Invalid Parameter.', code: 'xxx' });
          break;
        default:
          callback({ error: 'Unrecognized error code', code: 'xxx'});
      }
    }
  });
};

NetFlixAPI_vLOLS.prototype.audio = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'audio', ['id', 'name', 'results', 'start'], params, callback);
};

NetFlixAPI_vLOLS.prototype.biographies = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'biographies', ['id', 'name', 'results', 'start', 'license'], params, callback);
};

NetFlixAPI_vLOLS.prototype.blogs = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'blogs', 
    ['id', 'name', 'results', 'start', 'high_relevance'], params, callback);
};

NetFlixAPI_vLOLS.prototype.familiarity = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'familiarity', ['id', 'name'], params, callback);
};

NetFlixAPI_vLOLS.prototype.hotttnesss = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'hotttnesss', ['id', 'name', 'type'], params, callback);
};

NetFlixAPI_vLOLS.prototype.images = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'images', 
    ['id', 'name', 'results', 'start', 'license'], params, callback);
};

NetFlixAPI_vLOLS.prototype.list_terms = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'list_terms', ['type'], params, callback);
};

NetFlixAPI_vLOLS.prototype.news = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'news', 
    ['id', 'name', 'results', 'start', 'high_relevance'], params, callback);
};

NetFlixAPI_vLOLS.prototype.artist_profile = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'profile', ['id', 'name', 'bucket'], params, callback);
};

NetFlixAPI_vLOLS.prototype.reviews = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'reviews', ['id', 'name', 'results', 'start'], 
    params, callback);
};

NetFlixAPI_vLOLS.prototype.artist_search = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'search', [
    'results',
    'bucket',
    'limit',
    'name',
    'description',
    'style',
    'mood',
    'rank_type',
    'fuzzy_match',
    'max_familiarity',
    'min_familiarity',
    'max_hotttnesss',
    'min_hotttnesss',
    'artist_start_year_before',
    'artist_start_year_after',
    'artist_end_year_before',
    'artist_end_year_after',
    'sort',
    'results',
    'start'
  ], params, callback);
};

NetFlixAPI_vLOLS.prototype.extract = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'extract', [
    'results',
    'bucket',
    'limit',
    'name',
    'text',
    'max_familiarity',
    'min_familiarity',
    'max_hotttnesss',
    'min_hotttnesss',
    'sort',
    'results'
  ], params, callback);
};

NetFlixAPI_vLOLS.prototype.songs = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('artist', 'songs', ['id','name','results','start'], params, callback);
};

NetFlixAPI_vLOLS.prototype.similar = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};

  this.execute('artist', 'similar', ['id',
               'name','results','min_results','start','bucket','max_familiarity',
               'min_familiarity', 'max_hotttnesss', 'min_hotttnesss',
               'artist_start_year_before', 'artist_start_year_after',
               'artist_end_year_before', 'artist_end_year_after', 'reverse', 'limit',
               'seed_catalog' ], params, callback);

};

NetFlixAPI_vLOLS.prototype.suggest = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};

  this.execute('artist', 'suggest', ['results','name','q'], params, callback);
}

NetFlixAPI_vLOLS.prototype.terms = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};

  this.execute('artist', 'terms', ['id','name','sort'], params, callback);
}

NetFlixAPI_vLOLS.prototype.top_hottt = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};

  this.execute('artist', 'top_hottt', ['results','start','bucket', 'limit'], params, callback);
}

NetFlixAPI_vLOLS.prototype.top_terms = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};

  this.execute('artist', 'top_terms', ['results'], params, callback);
}

NetFlixAPI_vLOLS.prototype.urls = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};

  this.execute('artist', 'urls', ['id', 'name'], params, callback);
}

NetFlixAPI_vLOLS.prototype.video = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};

  this.execute('artist', 'video', ['id', 'name', 'results', 'start'], params, callback);
}

NetFlixAPI_vLOLS.prototype.song_search = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('song', 'search', [
    'title',
    'artist',
    'combined',
    'description',
    'style',
    'mood',
    'rank_type',
    'artist_id',
    'results',
    'start',
    'max_tempo',
    'min_tempo',
    'max_duration',
    'min_duration',
    'max_loudness',
    'min_loudness',
    'artist_max_familiarity',
    'artist_min_familiarity',
    'artist_start_year_before',
    'artist_start_year_after',
    'artist_max_hotttnesss',
    'artist_min_hotttnesss',
    'min_longitude',
    'max_longitude',
    'min_latitude',
    'max_latitude',
    'max_danceability',
    'min_danceability',
    'max_energy',
    'min_energy',
    'mode',
    'key',
    'bucket',
    'sort',
    'limit'
  ], params, callback);
};

NetFlixAPI_vLOLS.prototype.song_profile = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  this.execute('song', 'profile', ['id', 'bucket','limit' ], params, callback);
};

NetFlixAPI_vLOLS.prototype.identify = function(params, callback) {
  if (typeof params == 'function') callback = params, params = {};
  
  
  this.execute('song', 'identify', ['code', 'artist',
    'title', 'release','duration', 'genre', 'version', 
    'bucket'], params, callback);
};

NetFlixAPI_vLOLS.prototype.sandbox = function(config) {
  var api = this;

  var sandbox = {
    api:api,
    sanboxKey: undefined,
    consumerKey: undefined,
    consumerSecret: undefined,

    sortObject: function(o) {
      var sorted = {},
      key, a = [];

      for (key in o) {
          if (o.hasOwnProperty(key)) {
                  a.push(key);
          }
      }

      a.sort();

      for (key = 0; key < a.length; key++) {
          sorted[a[key]] = o[a[key]];
      }
      return sorted;
    },

    generateSignature: function(params, url, secret) {

      // sort the parameters
      params = this.sortObject(params);

      param_string = "";
      i = 0;
      for (key in params) {
        if (i != 0) {
          param_string += "&";
        }
        
        param_string += key + "=" + params[key];
        i++;
      }
      
      data =  "GET&" + encodeURIComponent(url) + "&" + encodeURIComponent(param_string);

      var key = secret+"&";

      return sha1.crypto.b64_hmac_sha1(key, data)+"=";
    },

    // used to fetch a list of assets available in the sandbox
    assets: function(params, callback) {
      if (typeof params == 'function') callback = params, params = {};

      params.sandbox = this.sandboxKey;

      this.api.execute('sandbox', 'list', ['sandbox','results','start' ], params, callback);
    },

    // access an individual item from the sandbox
    access:function(id, callback) {

      var time = parseInt(new Date().getTime() / 1000);

      var params = {
        id:id,
        oauth_nonce: time,
        oauth_timestamp: time,
        oauth_signature_method: "HMAC-SHA1",
        oauth_version: "1.0",
        sandbox: this.sandboxKey,
        oauth_consumer_key: this.consumerKey,
        format: "json",
        api_key: this.api.apiKey
      };

      var url = this.api.apiUrl+"sandbox/access";

      var sig = this.generateSignature(params, url, this.consumerSecret);

      params.oauth_signature = sig;

      this.api.execute(
        'sandbox',
        'access', 
        [
          'id',
          'oauth_nonce',
          'oauth_timestamp',
          'oauth_signature_method',
          'oauth_version',
          'sandbox',
          'oauth_consumer_key',
          'oauth_signature',
          'format',
          'api_key'
        ],
        params,
        callback
      );
    }
  }
  sandbox.sandboxKey = config.sandboxKey;
  sandbox.consumerKey = config.consumerKey;
  sandbox.consumerSecret = config.consumerSecret;

  return sandbox;
}


oauth.prototype.sandbox = function(config) {
  var api = this;

  var sandbox = {
    api:api,
    sanboxKey: undefined,
    consumerKey: undefined,
    consumerSecret: undefined,

    sortObject: function(o) {
      var sorted = {},
      key, a = [];

      for (key in o) {
          if (o.hasOwnProperty(key)) {
                  a.push(key);
          }
      }

      a.sort();

      for (key = 0; key < a.length; key++) {
          sorted[a[key]] = o[a[key]];
      }
      return sorted;
    },

    generateSignature: function(params, url, secret) {

      // sort the parameters
      params = this.sortObject(params);

      param_string = "";
      i = 0;
      for (key in params) {
        if (i != 0) {
          param_string += "&";
        }
        
        param_string += key + "=" + params[key];
        i++;
      }
      
      data =  "GET&" + encodeURIComponent(url) + "&" + encodeURIComponent(param_string);

      var key = secret+"&";

      return sha1.crypto.b64_hmac_sha1(key, data)+"=";
    },

    // used to fetch a list of assets available in the sandbox
    assets: function(params, callback) {
      if (typeof params == 'function') callback = params, params = {};

      params.sandbox = this.sandboxKey;

      this.api.execute('sandbox', 'list', ['sandbox','results','start' ], params, callback);
    },

    // access an individual item from the sandbox
    access:function(id, callback) {

      var time = parseInt(new Date().getTime() / 1000);

      var params = {
        id:id,
        oauth_nonce: time,
        oauth_timestamp: time,
        oauth_signature_method: "HMAC-SHA1",
        oauth_version: "1.0",
        sandbox: this.sandboxKey,
        oauth_consumer_key: this.consumerKey,
        format: "json",
        api_key: this.api.apiKey
      };

      var url = this.api.apiUrl+"sandbox/access";

      var sig = this.generateSignature(params, url, this.consumerSecret);

      params.oauth_signature = sig;

      this.api.execute(
        'sandbox',
        'access', 
        [
          'id',
          'oauth_nonce',
          'oauth_timestamp',
          'oauth_signature_method',
          'oauth_version',
          'sandbox',
          'oauth_consumer_key',
          'oauth_signature',
          'format',
          'api_key'
        ],
        params,
        callback
      );
    }
  }
  sandbox.sandboxKey = config.sandboxKey;
  sandbox.consumerKey = config.consumerKey;
  sandbox.consumerSecret = config.consumerSecret;

  return sandbox;
}








VODCentral.performSearch = function(query) {
	$('#results').html("");
	VODCentral.search(query, function(data) {
		var results = data.results;
		var resolver = data.resolver;
		for (var i = 0;i<results.length;i++) {
			var result = results[i];
			$('#results').append(
				"<li>"
					+"<a href='"+result.url+"' target='_BLANK' class='clearfix'>"
						+"<span class='img'>"
							+"<img src='"+result.image+"' />"
						+"</span>"
						+"<span class='title'>"
							+result.title
						+"</span>"
						+"<span class='description'>"
							+result.description
						+"</span>"
						+"<span class='resolver_name'>"
							+"Watch on "+resolver.title
						+"</span>"
						+"<span class='resolver_icon'>"
							+"<img src='"+resolver.icon+"' />"
						+"</span>"
					+"</a>"
				+"</li>"
			);
		}
	})	
}


$(document).ready(function() {
	$('#search_form').submit(function(e) {
		var query = $('#query').val();
		e.preventDefault();
		if (query !== "") {
			VODCentral.performSearch(query);
		}
	});

})





