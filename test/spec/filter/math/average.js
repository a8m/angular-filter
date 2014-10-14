'use strict';

describe('averageFilter', function () {

  var filter;
  var array = [
      { name: 'Dan', score: 80 },
      { name: 'Edd', score: 90 },
      { name: 'Edi', score: 40 },
      { name: 'Ari', score: 87 },
      { name: 'Tod', score: 99 }
    ];

  beforeEach(module('a8m.math.average'));

  beforeEach(inject(function ($filter) {
    filter = $filter('average');
  }));


  it('should get an array of numbers and return its average', function() {

    expect(filter(array, 'score')).toEqual(79.2);
  });

  it('should get an !array and return it as-is', function() {

    expect(filter('angular', 'name')).toEqual('angular');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();

  });

});
