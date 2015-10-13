describe("classes", function(){
	var id, klass, div, _div;
	
	beforeEach(function() {
		loadFixtures('class.html');
		
		div = $('#someclass');
		expect(div).toExist();
		id = div.attr('id');
		klass = div.attr('class');
		expect(klass).not.toBeEmpty();
		expect(id).not.toBeEmpty();
		
		_div = _('#' + id);
		expect(_div).toExist();
	});
	
	describe("hasClass", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div.hasClass)).toBe('function');
		});
		
		it("should tell if an element has a class", function(){
			
			expect(_div).toHaveClass(klass);
			expect(_div.hasClass).not.toBeUndefined();
			expect(_div.hasClass(klass)).toBe(true);
		});
	});
	
	describe("addClass", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div.addClass)).toBe('function');
		});
		
		it("should add a class to an element", function(){
			
			expect(_div.addClass).not.toBeUndefined();
			_div.addClass('randomclass')
			expect(_div).toHaveClass('randomclass');
			div.removeClass('randomclass');
		});
	});
	
	describe("removeClass", function(){
		
		it("should be a defined method", function(){
			expect(typeof(_div.removeClass)).toBe('function');
		});
		
		it("should remove a class from an element", function(){
			
			expect(_div.removeClass).not.toBeUndefined();
			_div.addClass('randomclass');
			expect(_div).toHaveClass('randomclass');
			_div.removeClass('randomclass');
			expect(_div).not.toHaveClass('randomclass');
		});
	});
});