'use strict';

describe('inArrayFilter', function() {
  var filter;

  beforeEach(module('a8m.in-array'));
  beforeEach(inject(function($filter) {
    filter = $filter('inArray');
  }));

  it('should filter by specific properties and avoid the rest', function() {
    var srcarray =  [ {a: 1}, {a: 2}, {a:1}, {a:3} ];
    var filterarray = [1, 3];
    var filterproperty = 'a';
    var result = [ {a: 1}, {a: 1}, {a: 3} ];

    expect(filter(srcarray, filterarray, filterproperty)).toEqual(result);
    expect(filter(srcarray, [5, 6], filterproperty).length).toEqual(0);
    expect(filter(srcarray, undefined, undefined)).toEqual(srcarray);
  });

});
