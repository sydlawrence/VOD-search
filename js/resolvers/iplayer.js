VODCentral.resolvers.iplayer = {

	title: "BBC iPlayer",

	icon: "",

	query_url: "http://www.bbc.co.uk/iplayer/search?q={QUERY}",

	xpath: '//ul[@class="result-list listview episodelist"]/li',

	search: function(query, callback) {
		var url = this.query_url.replace("{QUERY}",escape(query));
		yql.getDataFromURL(url, this.xpath, function(data) {
			var results = [];
			if (data.query.results !== null) {
				for (var i = 0;i<data.query.results.li.length;i++) {
					var result = data.query.results.li[i];

					try {
						results.push({
							title:result.div.div.h3.a.title,
							description:result.div.div.p[0].content,
							image:result.div.div.h3.a.img.src,
							url:"http://bbc.co.uk"+result.div.div.h3.a.href
						});
					} catch (e) {
						console.log("ERR");
						console.log(e);
						console.log(result);	
					}
					console.log("hi");
				}
			}
			callback(results);
		})
	}
}