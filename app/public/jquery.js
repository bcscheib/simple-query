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
		
		obj.selector = selector,
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
	
	var find_by_parent = function( selector, parent, container_arr ) {
				
		if( container_arr === undefined )
			container_arr = [];
					
		var els = parent.querySelectorAll(selector);

		for( var i = 0; i < els.length; i++) 
			container_arr.push( els[i] );
			
		return container_arr;
	};
	
	// whether a dom element is a valid html element
	var is_html_el = function( el ) {
		return el && el instanceof(HTMLElement) && !(el instanceof(HTMLScriptElement));
	}
	
	// whether an element is in an array of elements
	var el_is_in_arr = function( el, potentials ) {
		
		var valid = false,
		 	original_id = el.id;
			
		if( !el.id ) 
			el.setAttribute("id", Date.now().toString());
		
		
		for( var i = 0; i < potentials.length; i++ ) {
			var potential = potentials[i];
			if( potential.id !== undefined && potential.id === el.id ) 
				valid = true;
				
		}
		
		// restore the el id state
		original_id ? el.setAttribute("id", original_id) : el.removeAttribute("id");
		
		return valid;
	};
	
	// return all children of the element's parent matching selector
	var parent_els = function(el, selector) {
		var parent = el.parentElement;
		if( selector === undefined ) {
			var children = parent.children,
				els = [];
			for( var i = 0; i < children.length; i++) {
				if( is_html_el( children[i] ) ) 
					els.push(children[i]);
			}
			return els;
		} else {
			return find_by_parent(selector, parent);
		}
		
	}
	
	// get next or prev elements with a possible limit to how far to go
	var els_before_or_after = function( el, selector, dir, limit ) {
		
		if( el === undefined ) 
			return new ElementArray();
		
		dir = dir || 'next';
		selector = selector || null;
		limit = limit || null;
		
			
		var nexts = [],
			potentials = selector && parent ? parent_els(el, selector) : [];
			
		var i = 0;
		while( el = dir === 'next' ? el.nextElementSibling : el.previousElementSibling )
		{
			
			i++;
			if( false === is_html_el(el) || (limit && i > limit) )
				continue;
			
			if ( !selector || el_is_in_arr(el, potentials) ) 
				nexts.push(el);	
			
		} 

		return new ElementArray(nexts);
	};

	var jQuery = function( selector, context ) {
		return init.call(this, selector, context );
	};
	
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		
		find: function(selector ) {
			
			var arr = new ElementArray();
			
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
		if( selector && Array.isArray(selector) ) {
			
			for(var i = 0; i < selector.length; i++) {
				this.push(selector[i]);
			}
			
		} else if ( selector && typeof(selector) === 'object') {
			
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
		concat: Array.prototype.concat,
		
		html: function(){
			
			// todo: call first property here element
			return this.length > 0 ? this[0].innerHTML : undefined;
		},
		
		// todo: fix when the document element 
		parent: function(){
			return this.length > 0 ? new ElementArray(this[0].parentElement) : new ElementArray();
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
		
		// todo: support objects here too
		not: function(selector) {
			
			if( selector !== undefined ) {
				var matches = new ElementArray();
				for(var i = 0; i < this.length; i++) {
					var el = this[i];
					if( !el.matches(selector) ) {
						matches.push(el);
					}
				}
				return matches;
			} else {
				return this;
			}
			
		},
		
		prev: function(selector) {
			return els_before_or_after( this.get(0), selector, 'prev', 1 );
		},
		
		next: function(selector) {
			return els_before_or_after( this.get(0), selector, 'next', 1 );
		},
		
		nextAll: function(selector) {
			return els_before_or_after( this.get(0), selector, 'next' );
		},
		
		prevAll: function(selector) {
			return els_before_or_after( this.get(0), selector, 'prev' );
		},
		
		siblings: function(selector) {
			
			var el = this.get(0),
				siblings = [],
			    children = parent_els(el, selector);
			    
			for( var i = 0; i < children.length; i++) {
				if( children[i] !== el ) {
					siblings.push(children[i]);
				}
			}
			return new ElementArray( siblings );
		},
		
		hasClass: function(class_name) {
			var first = this.get(0);
			if( first !== undefined ) {
				return -1 !== first.className.split(' ').indexOf(class_name);
			} else {
				null;
			}
		},
		
		addClass: function(class_name) {
			
			for(var i = 0; i < this.length; i++) {
				var el = this[i],
				    classes = el.className.split(' ');
				    
				if( -1 === classes.indexOf(class_name) ) {
					classes.push(class_name);
					el.className = classes.join(' ');
				};
			}
			
			return this;
		},
		
		removeClass: function(class_name) {
			
			for(var i = 0; i < this.length; i++) {
				var el = this[i],
				    classes = el.className.split(' '),
				    new_classes = [];
				    
				for( var j = 0; j < classes.length; j++ ) {
					if( classes[j] !== class_name ) {
						new_classes.push(classes[j]);
					}
				}
				
				if( new_classes.length )
					el.className = new_classes.join(' ');
				else
					el.removeAttribute('class');
			}
			
			return this;
		},
		
	};
	ElementArray.prototype = Object.create(jQuery.prototype);
	
	// insert ElementArray methods to prototype
	extend(ElementArray.prototype, ElementArray.fn);
	
	// insert jQuery.fn static methods to jQuery
	extend(jQuery, jQuery.fn);
	
	// set the global variables
	parent_doc.$ = parent_doc.jQuery = jQuery;

})( window )