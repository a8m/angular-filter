'use strict';

describe('matchFilter', function () {

  var filter;

  beforeEach(module('a8m.match'));

  beforeEach(inject(function ($filter) {
    filter = $filter('match');
  }));

  it('should test a string with given pattern', function() {

    expect(filter('15/12/2003', '\\d+', 'g')).toEqual(['15', '12', '2003']);
    expect(angular.equals(filter('foobarbaz', '[a-z]{3}'), ['foo'])).toBeTruthy();
    expect(filter('foobarbaz', '[a-z]{3}', 'g')).toEqual(['foo', 'bar', 'baz']);

  });

  it('should get a !string and return null', function() {
    expect(filter({})).toEqual(null);
    expect(filter([])).toEqual(null);
    expect(filter(1)).toEqual(null);
    expect(filter(!1)).toBeFalsy(null);
  });

});
