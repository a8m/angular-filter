'use strict';

describe('degreesFilter', function () {

  var filter;

  beforeEach(module('a8m.math.degrees'));

  beforeEach(inject(function ($filter) {
    filter = $filter('degrees');
  }));

  it('should return the correct degrees from radians', function() {
    expect(filter(1.5,2)).toEqual(85.94);
    expect(filter(0,0)).toEqual(0);
    expect(filter(0.3235,0)).toEqual(19);
    expect(filter(0.8222235,5)).toEqual(47.10994);
	expect(filter(-0.8222235,5)).toEqual(-47.10994);
	expect(filter(45,2)).toEqual(2578.31);
    
  });
  
  it('should return NaN if radians is not a number', function(){
	expect(filter("0",2)).toEqual("NaN");
	expect(filter([0],2)).toEqual("NaN");
	expect(filter({number:0},0)).toEqual("NaN");
  });
  
  it('should return NaN if decimal point is less than zero or not a number', function(){
	expect(filter(0.45,-1)).toEqual("NaN");
	expect(filter(-0.25,-101)).toEqual("NaN");
	expect(filter(0.45,1.3)).toEqual("NaN");
	expect(filter(0.45,"0")).toEqual("NaN");
	expect(filter(0.45,[3])).toEqual("NaN");
	expect(filter(0.45,{num : 4})).toEqual("NaN");	
  });
  
});
