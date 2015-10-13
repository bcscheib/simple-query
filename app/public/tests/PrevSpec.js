describe("prev and prevAll", function(){
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
	
	describe("prev", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div1.prev)).toBe('function');
		});
		
		describe("when there is a prev element", function(){
			it("should load the prev element with no selector", function(){
				var prev = _div3.prev();
				expect(prev).toExist();
				var prevClass = $(prev.get(0)).attr('class');
				
				expect(prevClass).toBe(div2.attr('class'));
			});
			
			it("should load the prev element with a selector", function(){
				var div2Class = div2.attr('class');
				
				var prev = _div3.prev( '.' + div2Class );
				expect(prev).toExist();
				
				var prevClass = $(prev.get(0)).attr('class');
				expect(prev.get(0)).toBe(div2.get(0));
			});
			
			it("should load the prev element with a selector ONLY when the selector is good", function(){
				var div2Class = div2.attr('class');
				
				var prev = _div1.prev( '.' + div2Class + '.badclass' );
				expect(prev).not.toExist();
				
			});
		});
		
		describe("when there is NOT a prev element", function(){
			it("should return empty with no selector", function(){
				var prev = _div4.prev();
				expect(prev).not.toExist();
				expect(prev.length).toBe(0);
			});
			
			it("should return empty with selector when prev element does not match selector", function(){
				var div3Class = div3.attr('class');
				var prev = _div1.prev('.' + div3Class);
				
				expect(prev).not.toExist();
				expect(prev.length).toBe(0);
			});
		});
	});
	
	describe("prevAll", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div1.prevAll)).toBe('function');
		});
		
		describe("when there are prev elements", function(){
			it("should load the prev elements with no selector", function(){
				var prevs = _div3.prevAll();
				expect(prevs).toExist();
				expect(prevs.length).toBe(2);
				
				// Check the actual classes of the prev objects to confirm they are
				// are the correct results
				var firstprev = $(prevs.first().get(0));
				expect(firstprev).toHaveClass(div2.attr('class'))
				
				var secondprev = $(prevs.last().get(0));
				expect(secondprev).toHaveClass(div1.attr('class'))
			});
			
			it("should load the prev element with a selector", function(){
				var div1Class = div1.attr('class');
				var prevs = _div3.prevAll('.' + div1Class);
				
				expect(prevs).toExist();
				expect(prevs.length).toBe(1);
				
				// Check the actual classes of the prev objects to confirm they are
				// are the correct results
				var firstprev = $(prevs.first().get(0));
				expect(firstprev).toHaveClass(div1.attr('class'))
				
			});
			
			it("should load the prev element with a selector ONLY when the selector is good", function(){
				var div3Class = div3.attr('class');
				var prevs = _div1.prevAll('.' + div3Class + '.badclass' );
				
				expect(prevs).not.toExist();
				
			});
		});
		
		describe("when there are NOT prev elements", function(){
			it("should return empty with no selector", function(){
				var prevs = _div4.prevAll();
				expect(prevs.length).toBe(0);
			});
			
			it("should return empty with selector when prev elements do not match selector", function(){
				var div3Class = div3.attr('class');
				var prevs = _div1.prevAll('p');
				
				expect(prevs).not.toExist();
				expect(prevs.length).toBe(0);
			});
		});
	});
});