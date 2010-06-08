|Author|Colm Britton|
//{{{

if(!version.extensions.twitter) { //# ensure that the plugin is only installed once
version.extensions.twitter = { installed: true };

config.macros.twitter  = {
	retrieveTweets: function (query_term, place){
		// TODO check query will be accepted
		jQuery.ajax({
					url: "http://search.twitter.com/search.json?q="+query_term+"&rpp=30&callback=?",
					dataType: "json",
					timeout:15000,
					success:function(data){
						var results = data.results;
						for(var i=0;i<results.length;i++){
							wikify("\n[img[Twitter profile picture|"+results[i].profile_image_url+"]] "+results[i].text+"\nPosted: "+results[i].created_at, place);
						}
					},
					error: function(){
						alert("Failure!");
					}
				});
	},
	text: "Get Tweets",
	tooltop: "Retrieve the tweets for your query term",
	handler: function (place, macroName, params, wikifier,paramString, tiddler) {
		var display_method = params[0] || "button";
		var query_term = params[1] || "tiddlywiki";
		var e, search_term;
		
		switch(display_method) {
			case 'button':
				createTiddlyButton(place, this.text, this.tooltip, function(){
						config.macros.twitter.retrieveTweets(query_term, place);
					});
				break;
			case 'list':
				config.macros.twitter.retrieveTweets(query_term, place);
				break;
			case 'search':
				e = createTiddlyElement(null, "input", null, "twitter-search");
				e.setAttribute("type", "text");
				place.appendChild(e);
				createTiddlyButton(place, this.text, this.tooltip, function(){
						search_term = jQuery(".twitter-search").val();
						config.macros.twitter.retrieveTweets(search_term, place);
					});
				break;
			default:
				alert('An error has occurred with this twitter macro');
				break;
		}
	}
	
};
}
//}}}