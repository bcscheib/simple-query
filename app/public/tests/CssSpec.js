describe("indexing", function(){
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
	
	describe("show", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.show)).toBe('function');
		});
		
		describe("when the element is already showing", function(){
			it("should not modify the display properties", function(){
				var html = _div1[0].outerHTML;
				_div1.show();
				expect(_div1[0].outerHTML).toBe(html);
			});
		});
		
		describe("when the element is hidden", function(){
			
			it("should show the element, returning this", function(){
				
				div1.hide();
				expect(_div1).toBeHidden();
				var returned = _div1.show();
				expect(_div1).toBeVisible();
				expect(_div1[0].getAttribute('style')).not.toContain('display: none');
				expect(returned).toEqual(_div1);
				
			});
			
			it("should show the element, returning this when there is not a semicolon on style", function(){
				
				div1.attr('style', 'display: none');
				
				expect(_div1).toBeHidden();
				var returned = _div1.show();
				expect(_div1).toBeVisible();
				expect(_div1[0].getAttribute('style')).not.toContain('display: none');
				expect(returned).toEqual(_div1);
				
			});
			
			it("should preserve other style attributes", function(){
				div1.hide().css('border', '1px solid black');
				expect(_div1).toBeHidden();
				var returned = _div1.show();
				expect(_div1[0].getAttribute('style')).toContain('display: block;');
				expect(_div1[0].getAttribute('style')).toContain('border: 1px solid black;');
			});
			
			it("should show all elements when there are multiples in this", function(){
				var _divs = _wrapper.find('div'),
					divs = wrapper.find('div');
				
				divs.hide();
				expect(divs).toBeHidden();
				
				var returned = _divs.show();
				
				$.each(_divs, function(){
					expect(this).toBeVisible();
					expect(this.getAttribute('style')).toContain('display: block');
				});
				
				expect(returned).toEqual(_divs);
			});
			
			it("should make inline elements inline display", function(){
				var _span5 = _('.fifth'),
					span5 = $('.fifth');
				
				span5.hide();
				_span5.show();
				expect(_span5[0].getAttribute('style')).toContain('display: inline');
				
			});
		});
		
		describe("when the element is not in the dom", function(){
			it("should simply hide the element, and not compute styles", function(){
				var _newDiv = _('<div class="test"></div>');
				$(_newDiv).hide();
				
				_newDiv.show();
				expect(_newDiv[0].getAttribute('style')).toBeNull();
			});
		});
	}); // end show
	
	describe("hide", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.hide)).toBe('function');
		});
		
		describe("when the element is already hidden", function(){
			it("should not modify the display properties", function(){
				div1.hide();
				var html = _div1[0].outerHTML;
				_div1.hide();
				expect(_div1[0].outerHTML).toBe(html);
			});
		});
		
		describe("when the element is shown", function(){
			
			it("should hide the element, returning this", function(){
				expect(_div1).toBeVisible();
				var returned = _div1.hide();
				expect(_div1).toBeHidden();
				expect(returned).toEqual(_div1);
			});
			
			it("should hide the element, returning this when there is NOT a semicolon on style", function(){
				
				div1.attr('style', 'display: block');
				
				expect(_div1).toBeVisible();
				var returned = _div1.hide();
				expect(_div1).toBeHidden();
				expect(returned).toEqual(_div1);
				
			});
			
			it("should hide explicity shown elements", function(){
				div1.css('display', 'block');
				_div1.hide();
				expect(_div1).toBeHidden();
			});
			
			it("should preserve other style attributes", function(){
				div1.hide().css('border', '1px solid black');
				expect(_div1).toBeHidden();
				var returned = _div1.hide();
				
				var style = _div1[0].getAttribute('style');
				expect(style).toContain('display: none;');
				expect(style).toContain('border: 1px solid black;');
			});
			
			it("should hide all elements when there are multiples in this", function(){
				var _divs = _wrapper.find('div'),
					divs = wrapper.find('div');
				
				divs.hide();
				expect(divs).toBeHidden();
				
				var returned = _divs.hide();
				
				$.each(_divs, function(){
					expect(this).toBeHidden();
					expect(this.getAttribute('style')).toContain('display: none');
				});
				
				expect(returned).toEqual(_divs);
			});
		});
		
		describe("when the element is not in the dom", function(){
			it("should simply hide the element, and not compute styles", function(){
				var _newDiv = _('<div class="test"></div>');
				$(_newDiv).hide();
				
				_newDiv.hide();
				expect(_newDiv[0].getAttribute('style')).toContain('display: none');
			});
		});
	}); // end hide
});