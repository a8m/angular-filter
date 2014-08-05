'use strict';

describe('percentFilter', function () {

  var filter;

  beforeEach(module('a8m.math.percent'));

  beforeEach(inject(function ($filter) {
    filter = $filter('percent');
  }));

  it('should return percentage between two numbers', function() {

    expect(filter(10, 100)).toEqual(10);
    expect(filter(1, 100)).toEqual(1);
    expect(filter(23, 500)).toEqual(4.6);

  });

  it('should get string as a number', function() {

    expect(filter('20', 400)).toEqual(5);
    expect(filter('100', 100)).toEqual(100);

  });

  it('should return a round number if set to true', function() {

    expect(filter('20.2', 400, true)).toEqual(5);
    expect(filter('100.3', 100, true)).toEqual(100);
    expect(filter(23.4, 100, true)).toEqual(23);

  });

  it('should set divided to 100, if not defined', function() {

    expect(filter(32)).toEqual(32);
    expect(filter(200)).toEqual(200);

  });

  it('should get a !number and return it as-is', function() {

    expect(filter('string')).toEqual('string');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();
    expect(filter([])).toEqual([]);

  });

});
