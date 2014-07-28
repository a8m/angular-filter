'use strict';

describe('endsWithFilter', function () {

  var filter;

  beforeEach(module('a8m.ends-with'));

  beforeEach(inject(function ($filter) {
    filter = $filter('endsWith');
  }));

  it('should return whether string ends with the ends parameter', function() {

    expect(filter('string', 'g')).toBeTruthy();
    expect(filter('string', 'ing')).toBeTruthy();
    expect(filter('foo bar', 'BAR')).toBeTruthy();

    expect(filter('.JPG', '.jpg')).toBeTruthy();
    expect(filter('string', 'str')).toBeFalsy();
    expect(filter('string', 'fing')).toBeFalsy();
    expect(filter('foo bar', 'baz')).toBeFalsy();

  });

  it('should be case sensitive', function() {

    expect(filter('.JPG', '.jpg', true)).toBeFalsy();
    expect(filter('string', 'ING', true)).toBeFalsy();
    expect(filter('string', 'ING', false)).toBeTruthy();
    expect(filter('foo bar', 'Foo B', true)).toBeFalsy();

  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
