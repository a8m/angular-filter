'use strict';

describe('byteFmtFilter', function () {

  var filter;

  beforeEach(module('a8m.math.byteFmt'));

  beforeEach(inject(function ($filter) {
    filter = $filter('byteFmt');
  }));

  it('should return the correct display from number of bytes', function() {
    expect(filter(0,2)).toEqual("0 B");
    expect(filter(5,2)).toEqual("5 B");
    expect(filter(1024,0)).toEqual("1 KB");
    expect(filter(1998,2)).toEqual("1.95 KB");
    expect(filter(1049901,5)).toEqual("1.00126 MB"); 
    expect(filter(909234901,1)).toEqual("867.1 MB"); 
    expect(filter(1339234901,5)).toEqual("1.24726 GB"); 
    expect(filter(23423234234,2)).toEqual("21.81 GB");
    expect(filter(23985391855616,2)).toEqual("21.81 TB");
    expect(filter(95340189555097611,1)).toEqual("84.7 PB");
    expect(filter(2249548013871562752,3)).toEqual("1.951 EB");
    expect(filter(5180591620717411303425,2)).toEqual("4.39 ZB");
    expect(filter(5123980591620717411303425,2)).toEqual("4.24 YB");
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
