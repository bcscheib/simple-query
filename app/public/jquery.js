(function( parent_doc ){
	
	function extend(destination, source) {
	  for (var k in source) {
	    if (source.hasOwnProperty(k)) {
	      destination[k] = source[k];
	    }
	  }
	  return destination; 
	}
	
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
		
		// handle straight up objects
		if ( selector && typeof(selector) === 'object') {
			this.push(selector);
		}
	}
	
	// methods defined here are not meant to be called from parent constructor
	// ie ElementArray.next or .first
	ElementArray.fn = {
		constructor: ElementArray,
		length: 0,
		splice: Array.prototype.splice,
		push: Array.prototype.push,
		
		html: function(){
			
			// todo: call first property here element
			return this.length > 0 ? this[0].innerHTML : undefined;
		},
		
		last: function(){
			return this.length > 0 ? this.eq(this.length - 1) : this.eq(0);			
		},
		
		first: function(){
			return this.eq(0);
		},
		
		get: function( index ) {
			return index !== undefined ? this[index] : undefined;
		},
		
		eq: function( index ) {
			// todo: handle negative indexing here
			return this[index] !== undefined ? new ElementArray( this[index] ) : new ElementArray();
		},
		
		
		// todo: modify this to be nextAll when I have siblings done
		next: function(selector) {
			var first = this.get(0);
			var next = null;
			if( first !== undefined && first.nextElementSibling) {
				
				next = first.nextElementSibling;
				if( typeof(selector) === 'string' ) {
					var original_id = next.id;
						
					if( next.id === undefined) {
						next.setAttribute("id", Date.now().toString());
					}
					
					var found = false;
					var parent = first.parentElement;
					
					// only way this doesn't have a parent is a document but no next for that
					if( parent ) {
						var potentials = parent.querySelectorAll(selector);
						for(var i = 0; i < potentials.length; i++) {
							var potential = potentials[i];
							if( potential.id !== undefined && potential.id === next.id ) {
								found = true;
							}
						}
					} 
					next = !found ? null : next;
					
				} 
			} 
			return new ElementArray(next);
		},
		
		hasClass: function(class_name) {
			var first = this.get(0);
			if( first !== undefined ) {
				return -1 !== first.className.split(' ').indexOf(class_name);
			} else {
				null;
			}
		}
	};
	ElementArray.prototype = Object.create(jQuery.prototype);
	
	// insert ElementArray methods to prototype
	extend(ElementArray.prototype, ElementArray.fn);
	
	// insert jQuery.fn static methods to jQuery
	extend(jQuery, jQuery.fn);
	
	// set the global variables
	parent_doc.$ = parent_doc.jQuery = jQuery;

})( window )