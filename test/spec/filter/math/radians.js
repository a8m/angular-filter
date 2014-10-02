'use strict';

describe('radiansFilter', function () {

  var filter;

  beforeEach(module('a8m.math.radians'));

  beforeEach(inject(function ($filter) {
    filter = $filter('radians');
  }));

  it('should return the correct radians from degrees', function() {
    expect(filter(180,2)).toEqual(3.14);
    expect(filter(180,0)).toEqual(3);
	expect(filter(50,2)).toEqual(0.87);
	expect(filter(130,2)).toEqual(2.27);
	expect(filter(-30,4)).toEqual(-0.5236);
	expect(filter(1030,5)).toEqual(17.97689);
  });
  
  it('should return NaN if degrees is not a number', function(){
	expect(filter("0",2)).toEqual("NaN");
	expect(filter([0],2)).toEqual("NaN");
	expect(filter({number:0},0)).toEqual("NaN");
  });
  
  it('should return NaN if decimal point is less than zero or not a number', function(){
	expect(filter(45,-1)).toEqual("NaN");
	expect(filter(-25,-101)).toEqual("NaN");
	expect(filter(45,1.3)).toEqual("NaN");
	expect(filter(45,"0")).toEqual("NaN");
	expect(filter(45,[3])).toEqual("NaN");
	expect(filter(45,{num : 4})).toEqual("NaN");	
  });
  
});
