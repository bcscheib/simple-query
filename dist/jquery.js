
( function( parent_doc ){

// avoids parent constructor
// for mixin approach
function clone(obj) {
  function F() { }
  F.prototype = obj;
  return new F();
}

var ElementArray = function() {
	
	// custom constructor for Array
	this.push.apply(this, arguments);

}

ElementArray.prototype = clone(Array.prototype);

var jQuery = function( selector, context ) {
	
	var obj = this;
	
	obj.selector = selector;
	obj.context = context;
	
	if( false === this instanceof(jQuery) ) {
		return new jQuery( selector, context );
	}
	
	
	var init = function(selector, context) {
	if( selector !== undefined ) {
		if( typeof(selector) === 'string' ) 
		{	
			
			var els = jQuery.find.apply( obj, [selector, context] );
			return els;
		} else if (typeof(selector) === 'object') {
			return new ElementArray(selector)
		}
	} else {
		return new ElementArray();
	}
}
	
	return new init( selector, context );
}


jQuery.fn = jQuery.prototype = {
	//constructor: jQuery,
	
	find: function(selector ) {
		
		var arr = new ElementArray();
		
		var find_by_parent = function( selector, parent, container_arr ) {
			
			if( container_arr === undefined )
				container_arr = [];
						
			var els = parent.querySelectorAll(selector);
			var i = 0;
			for( var i = 0; i < els.length; i++) 
				container_arr.push( els[i] );
				
			return container_arr;
			
		}
		
		// do the find for all the 'jquery' elements
		if( true === (this instanceof(ElementArray)) ) {
			
			for( var j = 0; j < this.length; j++) 
				find_by_parent( selector, this[j], arr);
				
			
		} else {
			
			// dont think this will work with chaining though :(
		    // need to get the parent
		    var parent = document;
		    if( this.context ) {
			    parent = find_by_parent( this.context, document);
			   
			    if( parent.length ) 
				    parent = parent[0];
				    
		    }
			
			find_by_parent( selector, parent, arr );
			
		}
		
		return arr;
	}
}


function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination; 
}

extend(ElementArray.prototype, jQuery.prototype);
extend(jQuery, jQuery.fn); // we want these to be static methods

parent_doc.$ = parent_doc.jQuery = jQuery;

})( window )