describe("insertion", function(){
	var wrapper, _wrapper, div1, _div1, div2, _div2, div3, _div3, div4, _div4;
	
	beforeEach(function() {
		loadFixtures('next.html');
		
		wrapper = $('.fixture'),
		_wrapper = _('.fixture');
		
		div1 = $('.first');
		expect(div1).toExist();
		_div1 = _('.first');
		expect(_div1).toExist();
		
		div2 = $('.second');
		expect(div2).toExist();
		_div2 = _('.second');
		expect(_div2).toExist();
		
		div3 = $('.third');
		expect(div3).toExist();
		_div3 = _('.third');
		expect(_div3).toExist();
		
		div4 = $('.fourth');
		expect(div4).toExist();
		_div4 = _('.fourth');
		expect(_div4).toExist();
	});
	
	describe("append", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.append)).toBe('function');
		});
		
		describe("when element is an object", function(){
			
			it("should remove the object from the dom in its current container and append", function() {
				var div1Class = div1.attr('class');
				var parentNode = _div1[0].parentNode;
				_div4.append(_div1);
				expect(parentNode).toExist();
				expect(_div1[0].parentNode).not.toExist(); // removed it
				var _newDiv1 = _wrapper.find('.' + div1Class);
				expect(_newDiv1 instanceof(_)).toBe(true);
				expect(_newDiv1.length).toBe(1);
				expect(_newDiv1[0].parentNode).toBe(_div4[0]);
			});
			
			it("should append the object to all elements when there are multiple in this", function(){
				
				var div1Class = div1.attr('class'),
					div2Class = div2.attr('class'),
					div3Class = div3.attr('class'),
					
					div1HTML = div1[0].outerHTML,
					
					parentNodeDiv1 = _div1[0].parentNode;
					
					
				expect(parentNodeDiv1).toExist();
				
				var _divs = _wrapper.find('.' + div2Class + ',.' + div3Class);
				_divs.append(_div1);
				
				expect(_div1[0].parentNode).not.toExist(); // removed it
				
				expect(div2.find('.' + div1Class)).toExist();
				expect(div2.find('.' + div1Class)).toExist();
				expect(div3.find('.' + div1Class)).toExist();
				
				expect(div2[0].innerHTML).toContain(div1HTML);
			});
		});
		
		describe("when element is a selector or empty", function(){
			
			it("should append any html if selector not empty", function(){
				var newHTML = '<div class="new"></div>';
				var div1HTML = _div1[0].innerHTML;
				var returned = _div1.append(newHTML);
				
				expect(_div1[0].innerHTML).toBe(div1HTML + newHTML);
				expect(returned).toEqual(_div1);
			});
			
			it("shouldnt change html if selector empty", function(){
				var html = div1.html();
				var returned = _div1.append();
				expect(_div1[0].innerHTML).toBe(html);
				expect(returned).toEqual(_div1);
			});
			
			it("should append to all objects in this", function() {
				var divs = _wrapper.find('div');
				var tag = 'custom';
				divs.append(tag);
				expect(divs.length).toBeGreaterThan(1);
				expect(divs[0].innerHTML).toContain(tag);
				expect(divs[1].innerHTML).toContain(tag);
			});
		});
	});
	
	describe("prepend", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.prepend)).toBe('function');
		});
		
		describe("when element is an object", function(){
			
			it("should remove the object from the dom in its current container and prepend", function() {
				var div1Class = div1.attr('class');
				var parentNode = _div1[0].parentNode;
				_div4.prepend(_div1);
				expect(parentNode).toExist();
				expect(_div1[0].parentNode).not.toExist(); // removed it
				var _newDiv1 = _wrapper.find('.' + div1Class);
				expect(_newDiv1 instanceof(_)).toBe(true);
				expect(_newDiv1.length).toBe(1);
				expect(_newDiv1[0].parentNode).toBe(_div4[0]);
			});
			
			it("should prepend the object to all elements when there are multiple in this", function(){
				
				var div1Class = div1.attr('class'),
					div2Class = div2.attr('class'),
					div3Class = div3.attr('class'),
					
					div1HTML = div1[0].outerHTML,
					
					parentNodeDiv1 = _div1[0].parentNode;
					
					
				expect(parentNodeDiv1).toExist();
				
				var _divs = _wrapper.find('.' + div2Class + ',.' + div3Class);
				_divs.prepend(_div1);
				
				expect(_div1[0].parentNode).not.toExist(); // removed it
				
				expect(div2.find('.' + div1Class)).toExist();
				expect(div2.find('.' + div1Class)).toExist();
				expect(div3.find('.' + div1Class)).toExist();
				
				expect(div2[0].innerHTML).toContain(div1HTML);
			});
		});
		
		describe("when element is a selector or empty", function(){
			
			it("should prepend any html if selector not empty", function(){
				var newHTML = '<div class="new"></div>';
				var div1HTML = _div1[0].innerHTML;
				var returned = _div1.prepend(newHTML);
				
				expect(_div1[0].innerHTML).toBe( newHTML + div1HTML );
				expect(returned).toEqual(_div1);
			});
			
			it("shouldnt change html if selector empty", function(){
				var html = div1.html();
				var returned = _div1.prepend();
				expect(_div1[0].innerHTML).toBe(html);
				expect(returned).toEqual(_div1);
			});
			
			it("should prepend to all objects in this", function() {
				var divs = _wrapper.find('div');
				var tag = 'custom';
				divs.prepend(tag);
				expect(divs.length).toBeGreaterThan(1);
				expect(divs[0].innerHTML).toContain(tag);
				expect(divs[1].innerHTML).toContain(tag);
			});
		});
	}); // end prepend
	
	describe("insertAfter", function(){
		
		var _divs, div1Class;
		beforeEach(function(){
			div1Class = div1.attr('class');
			_divs = _wrapper.find('div');
			expect(_divs.length).toBeGreaterThan(0);
		});
		
		it("should be a defined method", function(){
			expect(typeof(_div1.insertAfter)).toBe('function');
		});
		
		describe("when selector/subject is a new element", function(){
			it("should insert subject after each target", function(){
				var newClass = 'random';
				expect(div2[0].nextElementSibling).not.toHaveClass(newClass);
				
				var returned = _('<div class="' + newClass + '"></div').insertAfter(_div2);
				expect(returned.length).toBe(1);
				expect(returned[0]).toHaveClass(newClass);
				expect(div2[0].nextElementSibling).toHaveClass(newClass);
			});
		});
		
		describe("when selector/subject has multiple elements", function(){
			it("should insert subject after each target", function(){
				var returned = _divs.insertAfter(_div2);
				expect(returned.length).toBe(_divs.length);
				$.each(returned, function(i){
					expect(this).toHaveClass(_divs[i].className);
				});	
			});
		});
		
		describe("when target is an object", function(){
			
			// todo: check when selector has multiple objects
			it("should insert objects in this after each element in target, removing the object from DOM", function(){
				$.each(_divs, function(){
					expect(this.nextElementSibling).not.toHaveClass(div1Class);
				});	
				
				_div1.insertAfter(_divs);
				
				// testing order of new elements
				$.each(_divs, function(){
					expect(this.nextElementSibling).toHaveClass(div1Class);
				});			
			});
			
			it("should return the newly created divs", function(){
				
				var returned = _div1.insertAfter(_divs);
				
				expect(returned.length).toBe(_divs.length);
				
				$.each(returned, function(){
					expect(this).toHaveClass(div1Class);
				});	
			});
		});
		
		describe("when target is a non-empty string", function(){
			
			it("if target matches an dom element, it should create a node after", function(){
				var target = div2.attr('class');
				expect(target.length).toBeGreaterThan(0);
				var returned = _div1.insertAfter('.' + target);
				expect(div2[0].nextElementSibling).toHaveClass(div1Class);
				expect(returned.length).toBe(1);
				expect(returned[0]).toHaveClass(div1Class);
			});
			
			it("if target doesn't match dom element in dom, should NOT create a node after", function()			{	
				var target = '.random';
				var returned = _div1.insertAfter(target);
				expect(div2[0].nextElementSibling).not.toHaveClass(div1Class);
				expect(returned.length).toBe(0);
			});
		});
		
		describe("when target is empty", function(){
			
			it("should return empty", function(){
				var wrapperHTML = _wrapper[0].innerHTML,
					returned = _div1.insertAfter();
					
				// test the wrapper html wasnt changed
				expect(returned.length).toBe(0);
				expect(_wrapper[0].innerHTML).toBe(wrapperHTML);
			});
		});
		
	}); // end insertAfter
	
	describe("insertBefore", function(){
		
		var _divs, div1Class;
		beforeEach(function(){
			div1Class = div1.attr('class');
			_divs = _wrapper.find('div');
			expect(_divs.length).toBeGreaterThan(0);
		});
		
		it("should be a defined method", function(){
			expect(typeof(_div1.insertBefore)).toBe('function');
		});
		
		describe("when selector/subject is a new element", function(){
			it("should insert subject before each target", function(){
				var newClass = 'random';
				expect(div2[0].previousElementSibling).not.toHaveClass(newClass);
				
				var returned = _('<div class="' + newClass + '"></div').insertBefore(_div2);
				expect(returned.length).toBe(1);
				expect(returned[0]).toHaveClass(newClass);
				expect(div2[0].previousElementSibling).toHaveClass(newClass);
			});
		});
		
		describe("when selector/subject has multiple elements", function(){
			it("should insert subject Before each target", function(){
				var returned = _divs.insertBefore(_div2);
				expect(returned.length).toBe(_divs.length);
				$.each(returned, function(i){
					expect(this).toHaveClass(_divs[i].className);
				});	
			});
		});
		
		describe("when target is an object", function(){
			
			// todo: check when selector has multiple objects
			it("should insert objects in this Before each element in target, removing the object from DOM", function(){
				/*$.each(_divs, function(){
					expect(this.previousElementSibling).not.toHaveClass(div1Class);
				});*/
				
				_div1.insertBefore(_divs);
				
				// testing order of new elements
				$.each(_divs, function(){
					expect(this.previousElementSibling).toHaveClass(div1Class);
				});			
			});
			
			it("should return the newly created divs", function(){
				
				var returned = _div1.insertBefore(_divs);
				
				expect(returned.length).toBe(_divs.length);
				
				$.each(returned, function(){
					expect(this).toHaveClass(div1Class);
				});	
			});
		});
		
		describe("when target is a non-empty string", function(){
			
			it("if target matches an dom element, it should create a node before", function(){
				var target = div2.attr('class');
				expect(target.length).toBeGreaterThan(0);
				var returned = _div1.insertBefore('.' + target);
				expect(div2[0].previousElementSibling).toHaveClass(div1Class);
				expect(returned.length).toBe(1);
				expect(returned[0]).toHaveClass(div1Class);
			});
			
			it("if target doesn't match dom element in dom, should NOT create a node before", function()			{	
				var target = '.random';
				var returned = _div1.insertBefore(target);
				expect(div2[0].nextElementSibling).not.toHaveClass(div1Class);
				expect(returned.length).toBe(0);
			});
		});
		
		describe("when target is empty", function(){
			
			it("should return empty", function(){
				var wrapperHTML = _wrapper[0].innerHTML,
					returned = _div1.insertBefore();
					
				// test the wrapper html wasnt changed
				expect(returned.length).toBe(0);
				expect(_wrapper[0].innerHTML).toBe(wrapperHTML);
			});
		});
		
	}); // end insertBefore
	
	describe("remove", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div1.remove)).toBe('function');
		});
		
		describe("when there is a selector", function(){
			
			it("should remove all elements matching selector", function(){
				expect(_div4).toExist();
				var returned = _div3.remove('.' + div4.attr('class'));
				expect( div3.find('.' + div4.attr('class')) ).not.toExist();
				expect(returned).toEqual(_div3);
			});
		});
		
		describe("when there is NOT a selector", function(){
			it("should remove element itself from the dom", function(){
				var div1Class = div1.attr('class');
				
				expect(_('.' + div1Class)).toExist();
				var returned = _div1.remove();
				expect(_('.' + div1Class)).not.toExist();
				
				expect(returned).not.toContain(_div1);
				expect(returned.length).toEqual(0);
			});
		});
		
	}); // end remove
	
	describe("empty", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div1.empty)).toBe('function');
		});
		
		it("should empty out the contents of the element", function() {
			div1.html('test');
			_div1.empty();
			expect(div1.html().length).toBe(0);
		});
	}); // end empty
});