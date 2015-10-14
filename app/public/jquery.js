(function( parent_doc ){
	
	function extend(destination, source) {
	  for (var k in source) {
	    if (source.hasOwnProperty(k)) {
	      destination[k] = source[k];
	    }
	  }
	  return destination; 
	}
	
	var create_node = function(html) {
		var node = null;
		
		if( html.length && html[0] === '<' ) {
			var div = document.createElement('div');
			div.innerHTML = html;
			node = new ElementArray(div.childNodes[0]);
		}
		
		return node;
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
			return create_node(selector) || obj.find( selector, context );
		} else  {
			return new ElementArray( selector, context);
		}
	}
	
	var find_by_parent = function( selector, parent, container_arr ) {
				
		if( container_arr === undefined )
			container_arr = [];
					
		var els = parent.querySelectorAll(selector);

		jQuery.fn.each(els, function(){ container_arr.push(this); });
			
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
		
		jQuery.fn.each(potentials, function(i, potential){ 
			if( potential.id !== undefined && potential.id === el.id ) 
				valid = true;
				
		});
		
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
				
			// todo: use filter here
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
	
	var remove_el_from_dom = function( el ) {
		var html = el.outerHTML;
		el.parentElement.removeChild(el);
		return html;
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
		},
		
		each: function( obj, cb ) {
			
			obj = obj || this;
				
			if( typeof(cb) === 'function' && obj.length !== undefined) {
				
				for(var i = 0; i < obj.length; i++) {
					cb.call(obj[i], i, obj[i]);
				}
			}
			
			return obj;
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
		indexOf: Array.prototype.indexOf,
		
		text: function( text ){
			// todo: encode this here? encodeURI()
			// jQuery doesn't seem to use innerText
			if( text !== undefined ) {
				this[0].innerText = text; 
			}
			return this.length > 0 ? this[0].innerText : undefined;
		},
		
		html: function( html ){
			
			if( html !== undefined ) {
				this[0].innerHTML = html;
				return this;
			} else {
				return this.length > 0 ? this[0].innerHTML : undefined;
			}
			
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
		
		append: function( html ) {
			
			if( html instanceof(ElementArray) ) {
				var new_html = '';
				
				jQuery.fn.each(html, function(){
					new_html += this.outerHTML;
					this.parentElement.removeChild(this);
				});
				
				html = new_html;
			} 
			
			if( typeof(html) === 'string' ) 
				this.each(function(){ 
					this.innerHTML += html;
				});
			
			return this;
		},
		
		prepend: function( html ) {
			
			if( html instanceof(ElementArray) ) {
				
				// todo: use map here, use the remove call here
				var new_html = '';
				
				jQuery.fn.each(html, function(){
					new_html = new_html + remove_el_from_dom(this);
				});
				
				html = new_html;
			} 
			
			if( typeof(html) === 'string' ) 
				this.each(function(){ 
					this.innerHTML = html + this.innerHTML;
				});
			
			
			return this;
		},
		
		insertBefore: function( target ) {
			var inserted = [];
			 	
			if( typeof(target) === 'string' ) 
				target = jQuery.fn.find(target);
			 	
			if( target instanceof(ElementArray) && target.length ) {
				
				jQuery.fn.each(this, function(){
					var subject_el = this;
					
					jQuery.fn.each(target, function(){
						var target_el = this;
						var node = subject_el.cloneNode(true);
						target_el.parentNode.insertBefore(node, target_el.previousSibling);
						inserted.push(node);
					});
				});
				this.remove();
			}

			return new ElementArray( inserted );
		},
		
		insertAfter: function(target) {
			var inserted = [];
			 	
			if( typeof(target) === 'string' ) 
				target = jQuery.fn.find(target);
			 	
			
			if( target instanceof(ElementArray) && target.length ) {
				
				jQuery.fn.each(this, function(){
					
					var subject_el = this;
					
					var remove_targets = []; // array of targets needed to be removed
					jQuery.fn.each(target, function(i){
						var target_el = this;
						
						var node = subject_el.cloneNode(true);
						target_el.parentNode.insertBefore(node, target_el.nextSibling);
						inserted.push(node);
					});
				});
				this.remove();
			}
			

			return new ElementArray( inserted );
		},
		
		// removes the element from the dom
		remove: function( selector ) {
			var obj = this,
				els = this;

			if( typeof(selector) === 'string' ) {
				els = this.find(selector);
			}
			
			jQuery.fn.each(els, function(){ 
				remove_el_from_dom(this); 
				
				// remove from the jQuery object
				var objIndex = obj.indexOf(this);
				if( objIndex != -1 ) {
					delete obj[objIndex]; // todo: move this out!
					obj.length -= 1;
				} 
			});
			
			return this;
		},
		
		empty: function() {
			this.html('');
			return this;
		},
		
		each: function( cb ) {
			return jQuery.fn.each.call(this, this, cb);
		}
	};
	ElementArray.prototype = Object.create(jQuery.prototype);
	
	// insert ElementArray methods to prototype
	extend(ElementArray.prototype, ElementArray.fn);
	
	// insert jQuery.fn static methods to jQuery
	extend(jQuery, jQuery.fn);
	
	// set the global variables
	if( typeof(parent_doc.jQuery) === "undefined" ) {
		parent_doc.$ = parent_doc.jQuery = jQuery;
	}
	parent_doc._ = jQuery;

})( window )