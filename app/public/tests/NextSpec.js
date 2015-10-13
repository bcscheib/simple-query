describe("next and nextAll", function(){
	var div1, _div1, div2, _div2, div3, _div3, div4, _div4;
	
	beforeEach(function() {
		loadFixtures('next.html');
		
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
	
	describe("next", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div1.next)).toBe('function');
		});
		
		describe("when there is a next element", function(){
			it("should load the next element with no selector", function(){
				var next = _div1.next();
				expect(next).toExist();
				var nextClass = $(next.get(0)).attr('class');
				
				expect(nextClass).toBe(div2.attr('class'));
			});
			
			it("should load the next element with a selector", function(){
				var div2Class = div2.attr('class');
				
				var next = _div1.next( '.' + div2Class );
				expect(next).toExist();
				
				var nextClass = $(next.get(0)).attr('class');
				expect(nextClass).toBe(div2Class);
			});
			
			it("should load the next element with a selector ONLY when the selector is good", function(){
				var div2Class = div2.attr('class');
				
				var next = _div1.next( '.' + div2Class + '.badclass' );
				expect(next).not.toExist();
				
			});
		});
		
		describe("when there is NOT a next element", function(){
			it("should return empty with no selector", function(){
				var next = _div4.next();
				expect(next).not.toExist();
				expect(next.length).toBe(0);
			});
			
			it("should return empty with selector when next element does not match selector", function(){
				var div3Class = div3.attr('class');
				var next = _div1.next('.' + div3Class);
				
				expect(next).not.toExist();
				expect(next.length).toBe(0);
			});
		});
	});
	
	describe("nextAll", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div1.nextAll)).toBe('function');
		});
		
		describe("when there are next elements", function(){
			it("should load the next elements with no selector", function(){
				var nexts = _div1.nextAll();
				expect(nexts).toExist();
				expect(nexts.length).toBe(2);
				
				// Check the actual classes of the next objects to confirm they are
				// are the correct results
				var firstNext = $(nexts.first().get(0));
				expect(firstNext).toHaveClass(div2.attr('class'))
				
				var secondNext = $(nexts.last().get(0));
				expect(secondNext).toHaveClass(div3.attr('class'))
			});
			
			it("should load the next element with a selector", function(){
				var div3Class = div3.attr('class');
				var nexts = _div1.nextAll('.' + div3Class);
				
				expect(nexts).toExist();
				expect(nexts.length).toBe(1);
				
				// Check the actual classes of the next objects to confirm they are
				// are the correct results
				var firstNext = $(nexts.first().get(0));
				expect(firstNext).toHaveClass(div3.attr('class'))
				
			});
			
			it("should load the next element with a selector ONLY when the selector is good", function(){
				var div3Class = div3.attr('class');
				var nexts = _div1.nextAll('.' + div3Class + '.badclass' );
				
				expect(nexts).not.toExist();
				
			});
		});
		
		describe("when there are NOT next elements", function(){
			it("should return empty with no selector", function(){
				var nexts = _div4.nextAll();
				expect(nexts.length).toBe(0);
			});
			
			it("should return empty with selector when next elements do not match selector", function(){
				var div3Class = div3.attr('class');
				var nexts = _div1.nextAll('p');
				
				expect(nexts).not.toExist();
				expect(nexts.length).toBe(0);
			});
		});
	});
});