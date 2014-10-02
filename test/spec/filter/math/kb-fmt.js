'use strict';

describe('kbFmtFilter', function () {

  var filter;

  beforeEach(module('a8m.math.kbFmt'));

  beforeEach(inject(function ($filter) {
    filter = $filter('kbFmt');
  }));

  it('should return the correct display from number of kilobytes', function() {
    expect(filter(0,2)).toEqual("0 KB");
    expect(filter(5,2)).toEqual("5 KB");
    expect(filter(1024,0)).toEqual("1 MB");
    expect(filter(1998,2)).toEqual("1.95 MB");
    expect(filter(1049901,5)).toEqual("1.00126 GB"); 
    expect(filter(909234901,1)).toEqual("867.1 GB");  
    
  });
  
  it('should return NaN if kilobytes is not a number', function(){
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
