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
	
	describe("text", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.text)).toBe('function');
		});
		
		describe("setting the text", function(){
			it("should empty the parents text with an empty string", function(){
				_div1.text('');
				expect(div1.get(0).innerText).toBe('');
			});
			
			it("should let you set the text of the element with text", function(){
				_div1.text('test text');
				expect(div1.get(0).innerText).toBe('test text');
			});
			
			it("should let you set the text of the element with other text", function(){
				var newtext = '<div class="last"></div>';
				_div1.text(newtext);
				// todo: encode here
				expect(div1.get(0).innerText).toBe(newtext);
			});
		});
		
		describe("getting the text", function(){
			describe("when the element exists", function(){
				it("should return the inner text element", function() {
					div1.html('<span>randomtext</span>');
					var text = _div1.text();
					
					expect(text).toBe(div1.text());
				});
			});
			
			describe("when the element does NOT exist", function(){
				it("should return empty", function() {
					var first = _wrapper.find('div.randomdiv');
					expect(first.text()).toBeUndefined();
				});
			});
		});
	});
	
	describe("html", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.html)).toBe('function');
		});
		
		describe("setting the html", function(){
			it("should empty the parents html with an empty string", function(){
				_div1.html('');
				expect(div1.get(0).innerHTML).toBe('');
			});
			
			it("should let you set the html of the element with text", function(){
				_div1.html('test html');
				expect(div1.get(0).innerHTML).toBe('test html');
			});
			
			it("should let you set the html of the element with other html", function(){
				var newHTML = '<div class="last"></div>';
				var returned = _div1.html(newHTML);
				expect(div1.get(0).innerHTML).toBe(newHTML);
				expect(returned).toEqual(_div1);
			});
		});
		
		describe("getting the html", function(){
			describe("when the element exists", function(){
				it("should return the inner html element", function() {
					var html = _div1.html();
					expect(html).toBe(div1.html());
				});
			});
			
			describe("when the element does NOT exist", function(){
				it("should return empty", function() {
					var first = _wrapper.find('div.randomdiv');
					expect(first.html()).toBeUndefined();
				});
			});
		});
	});
	
	describe("get", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.get)).toBe('function');
		});
		
		describe("when the index exists", function(){
			it("should return the indexed element", function() {
				var first = _wrapper.find('div').get(0);
				
				expect(first).toExist();
				expect(first).toBe(div1.get(0));
			});
		});
		describe("when the index does NOT exist", function(){
			it("should return empty", function() {
				var first = _wrapper.find('div').get(9999);
				expect(first).toBeUndefined();
			});
		});
	});
	
	describe("eq", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.eq)).toBe('function');
		});
		
		describe("when the index exists", function(){
			it("should return the indexed element", function() {
				var first = _wrapper.find('div').eq(0);
				
				expect(first).toExist();
				expect(first[0]).toBe(div1.get(0));
			});
		});
		describe("when the index does NOT exist", function(){
			it("should return empty", function() {
				var first = _wrapper.find('div').eq(9999);
				expect(first instanceof(_)).toBe(true);
				expect(first.length).toBe(0);
			});
		});
	});
	
	describe("first", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.first)).toBe('function');
		});
		
		describe("when the object has items", function(){
			it("should return the first item", function() {
				var first = _wrapper.find('div').first();
				
				
				expect(first).toExist();
				expect(first[0]).toBe(div1.get(0));
			});
		});
		
		describe("when the object has no items", function(){
			it("should return empty", function() {
				var first = _wrapper.find('div').eq(9999);
				expect(first instanceof(_)).toBe(true);
				expect(first.length).toBe(0);
			});
		});
	});
	
	describe("last", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.last)).toBe('function');
		});
		
		describe("when the object has items", function(){
			it("should return the first item", function() {
				var last = _wrapper.find('div').last();
				
				expect(last).toExist();
				expect(last[0]).toBe(div4.get(0)); // todo: make sure this is right
			});
		});
		
		describe("when the object has no items", function(){
			it("should return empty", function() {
				var last = _div4.find('div').last();
				expect(last instanceof(_)).toBe(true);
				expect(last.length).toBe(0);
			});
		});
	});
	
	describe("not", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.not)).toBe('function');
		});
		
		describe("when the object has items", function(){
			it("should return subset of original when the selector NOT empty", function() {
				var orig = _wrapper.find('div');
				expect(orig.length).toBe(4);
				
				var div1Class = div1.attr('class');
				var not = orig.not('.first');
				expect(not instanceof(_)).toBe(true);
				expect(not.length).toBe(orig.length - 1);
				
				// test the first one and make sure not there
				var firstNot = not[0];
				expect(firstNot).not.toBe(orig[0]);
			});
			
			it("should return the original when the selector is empty", function() {
				var not = _wrapper.find('div').not();
				expect(not instanceof(_)).toBe(true);
				expect(not.length).toBe(not.length);
			});
		});
		
		describe("when the object has no items", function(){
			it("should return empty", function() {
				var last = _div4.find('div').last();
				expect(last instanceof(_)).toBe(true);
				expect(last.length).toBe(0);
			});
		});
	});
	
	describe("parent", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.parent)).toBe('function');
		});
		
		describe("when there is a parent", function(){
			it("should return the parent obj", function(){
				var parent = _div1.parent();
				expect(parent instanceof(_)).toBe(true);
				expect(parent.length).toBe(1);
				expect(parent.get(0)).toBe(wrapper.get(0));
			});
		});
		
		describe("when there is NOT a parent", function(){
			it("should return empty", function(){
				var parent = _(window).parent();
				expect(parent instanceof(_)).toBe(true);
				expect(parent.length).toBe(0);
			});
		});
	});
	
	describe("siblings", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.siblings)).toBe('function');
		});
		
		describe("when there are siblings", function(){
			it("should return the siblings", function(){
				var siblings = _div1.siblings();
				expect(siblings instanceof(_)).toBe(true);
				expect(siblings.length).toBe(2);
				
				expect(siblings[0]).toBe(div2.get(0));
				expect(siblings[1]).toBe(div3.get(0));
			});
		});
		
		describe("when there are NOT siblings", function(){
			it("should return empty", function(){
				var siblings = _div4.siblings();
				expect(siblings instanceof(_)).toBe(true);
				expect(siblings.length).toBe(0);
			});
		});
	});
});