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
		
		it("should be a defined method", function(){
			expect(typeof(_div1.insertAfter)).toBe('function');
		});
		
		describe("when selector is an object", function(){
			
			it("should insert the object after, removing the object from dom", function(){
				var div1Class = div1.attr('class');
				_div1.insertAfter(_div2);
				expect(wrapper.find('div').first()).toEqual(_div2);
				expect(_div2[0].nextElementSibling).toBe(_div1[0]);
			});
		});
		
		describe("when selector is empty", function(){
			
			it("should return empty ", function(){
				
			});
		});
		
		describe("when selector is a non-empty string", function(){
			
			it("it should create a node after", function(){
				
			});
		});
		
	}); // end insertAfter
	
	describe("insertBefore", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div1.insertBefore)).toBe('function');
		});
		
		describe("when selector is an object", function(){
			
			it("should insert the object before the parent", function(){
				
			});
		});
		
		describe("when selector is empty", function(){
			
			it("should return empty ", function(){
				
			});
		});
		
		describe("when selector is a non-empty string", function(){
			
			it("it should create a node  before the parent", function(){
				
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
				console.log(returned);
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