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





