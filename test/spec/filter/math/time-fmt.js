'use strict';

describe('timeFmtFilter', function () {

  var filter;

  beforeEach(module('a8m.math.timeFmt'));

  beforeEach(inject(function ($filter) {
    filter = $filter('timeFmt');
  }));

  it('should return the correct display from number of seconds', function() {
    expect(filter(0)).toEqual("just now");
    expect(filter(5)).toEqual("5 seconds ago");
    expect(filter(1024)).toEqual("17 minutes ago");
    expect(filter(3600)).toEqual("1 hour ago"); 
    expect(filter(42588)).toEqual("12 hours ago"); 
    expect(filter(169200)).toEqual("2 days ago"); 
    expect(filter(691200)).toEqual("1 week ago"); 
    expect(filter(8640000)).toEqual("3 months ago"); 
    expect(filter(133081920)).toEqual("4 years ago"); 
  });
  
  it('should return NaN if seconds is not a number', function(){
	expect(filter("0")).toEqual("NaN");
	expect(filter([0])).toEqual("NaN");
	expect(filter({number:0})).toEqual("NaN");
  });
  
});
