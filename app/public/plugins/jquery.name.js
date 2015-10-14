(function($){
	var Name = function(){
		console.log("init");
		return this;
	}
	
	$.fn.name = Name;
})(_);