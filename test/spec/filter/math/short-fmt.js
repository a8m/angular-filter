'use strict';

describe('shortFmtFilter', function () {

  var filter;

  beforeEach(module('a8m.math.shortFmt'));

  beforeEach(inject(function ($filter) {
    filter = $filter('shortFmt');
  }));

  it('should return the correct display from the number', function() {
    expect(filter(0,2)).toEqual('0');
    expect(filter(5,2)).toEqual('5');
    expect(filter(1024,0)).toEqual("1 K");
    expect(filter(1993,2)).toEqual("1.99 K");
    expect(filter(1049901,5)).toEqual("1.0499 M"); 
    expect(filter(1909234901,2)).toEqual("1.91 B"); 
    
  });
  
  it('should return NaN if bytes is not a number', function(){
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
