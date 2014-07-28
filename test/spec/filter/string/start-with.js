'use strict';

describe('startWithFilter', function () {

  var filter;

  beforeEach(module('a8m.start-with'));

  beforeEach(inject(function ($filter) {
    filter = $filter('startWith');
  }));

  it('should return whether string starts with the starts parameter', function() {

    expect(filter('string', 's')).toBeTruthy();
    expect(filter('string', 'str')).toBeTruthy();
    expect(filter('foo bar', 'Foo B')).toBeTruthy();

    expect(filter('string', 'tring')).toBeFalsy();
    expect(filter('string', 'ig')).toBeFalsy();
    expect(filter('foo bar', 'bar')).toBeFalsy();

  });

  it('should be case sensitive', function() {

    expect(filter('string', 'STR', true)).toBeFalsy();
    expect(filter('string', 'STR', false)).toBeTruthy();
    expect(filter('foo bar', 'Foo B', true)).toBeFalsy();

  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
