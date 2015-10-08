(function( parent_doc ){
	
	// init function for new jquery object - hidden by closure
	var init = function(selector, context) {
		var obj = this;
		
		obj.selector = selector;
		obj.context = context;
		
		if( false === this instanceof(jQuery) ) {
			return new jQuery( selector, context );
		}
		
		if( typeof(selector) === 'string' ) {
			return els = obj.find( selector, context );
		} else  {
			return new ElementArray( selector, context);
		}
	}

	var jQuery = function( selector, context ) {
		return init.call(this, selector, context );
	};
	
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		
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
	
	// Array like structure to store elements
	var ElementArray = function( selector, context ) {
		if ( selector && typeof(selector) === 'object') {
			this.push(selector);
		}
	}
	ElementArray.prototype = Object.create(jQuery.prototype);
	
	ElementArray.prototype.constructor = ElementArray;
	ElementArray.prototype.length = 0;
	ElementArray.prototype.splice = Array.prototype.splice;
	ElementArray.prototype.push = Array.prototype.push;
	
	// insert jQuery.fn static methods to jQuery
	for (var k in jQuery.fn) {
		if (jQuery.fn.hasOwnProperty(k)) {
		  jQuery[k] = jQuery.fn[k];
		}
	}
	
	// set the global variables
	parent_doc.$ = parent_doc.jQuery = jQuery;

})( window )