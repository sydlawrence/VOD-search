VODCentral.resolvers.channel4od = {

	title: "Channel4OD",

	icon: "",

	query_url: "http://www.channel4.com/search/?q={QUERY}",

	xpath: '//ul[@id="BrandResultList"]/li',

	search: function(query, callback) {
		var url = this.query_url.replace("{QUERY}",escape(query));
		yql.getDataFromURL(url, this.xpath, function(data) {
			var results = [];
			if (data.query.results !== null) {
				for (var i = 0;i<data.query.results.li.length;i++) {
					var result = data.query.results.li[i];
					try {
						results.push({
							title:result.h3.a.span.content,
							description:result.p.content,
							image:"http://www.channel4.com"+result.h3.a.img.src,
							url:"http://www.channel4.com"+result.a.href
						});
					} catch (e) {
						
					}
				}
			}
			callback(results);
		})
	}
}