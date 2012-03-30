VODCentral.resolvers.itvplayer = {

	title: "ITV Player",

	icon: "",

	query_url: "http://www.itv.com/itvplayer/search/?Filter={QUERY}",

	xpath: '//div[@class="pux-moduleBody results"]//ul',

	search: function(query, callback) {
		var url = this.query_url.replace("{QUERY}",escape(query));
		yql.getDataFromURL(url, this.xpath, function(data) {
			var results = [];
			if (data.query.results !== null) {
				for (var i = 0;i<data.query.results.ul.length;i++) {
					var result = data.query.results.ul[i].li;

					try {
						results.push({
							title:result.h3.a.content,
							description:result.p[1],
							image:result.a.img.src,
							url:result.a.href
						});
					} catch (e) {
						
					}
				}
			}
			callback(results);
		})
	}
}