//{{{
(function(){
	
	var macro = config.macros.tiddler;
	
	var _transclude = macro.transclude;
	macro.transclude = function(wrapper, tiddlerName, args){
		// check to see if empty
		var text = store.getTiddlerText(tiddlerName);
		if(!text){
			config.macros.tiddler.renderText(wrapper,tiddlerName+" does not exist",tiddlerName,params);
		} else {
			// call original
			_transclude(wrapper, tiddlerName, args);	
		}
		
	};
})();	
	
//}}}