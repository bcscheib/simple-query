describe("iterators", function(){
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
	
	describe("each", function(){
		it("should be a defined method", function(){
			expect(typeof(_div1.each)).toBe('function');
			expect(typeof(_.each)).toBe('function');
		});
		
		describe("when called statically", function(){
			it("should not call the callback if the object is not enumerable", function(){
				var obj = 2;
				var testCB = jasmine.createSpy();
				_.each(obj, testCB);
				expect(testCB).not.toHaveBeenCalled();
			});
			
			it("should not call the callback if the object is empty", function(){
				var obj = [];
				var testCB = jasmine.createSpy();
				_.each(obj, testCB);
				expect(testCB).not.toHaveBeenCalled();
			});
			
			it("should call the callback if object not empty", function(){
				var obj = ['test'];
				var testCB = jasmine.createSpy();
				_.each(obj, testCB);
				expect(testCB).toHaveBeenCalled();
				expect(testCB.calls.argsFor(0)).toEqual([0, 'test']);
			});
		});
		
		describe("when called on an instance", function(){
			it("should not call the callback if this is empty", function(){
				var _fake = _('.fake');
				var testCB = jasmine.createSpy();
				var returned = _fake.each(testCB);
				expect(testCB).not.toHaveBeenCalled();
				expect(returned).toEqual(_fake);
			});
			
			it("should call the callback if this is NOT empty", function(){
				var testCB = jasmine.createSpy();
				var _divs = _wrapper.find('div');
				_divs.each(testCB);
				expect(testCB).toHaveBeenCalled();
				expect(testCB.calls.count()).toEqual( _divs.length );
				expect(testCB.calls.argsFor(0)).toEqual([0, _div1]);
			});
		});
	});
});