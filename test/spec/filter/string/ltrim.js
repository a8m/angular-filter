'use strict';

describe('ltrimFilter', function () {

  var filter;

  beforeEach(module('a8m.ltrim'));

  beforeEach(inject(function ($filter) {
    filter = $filter('ltrim');
  }));

  it('should strip whitespace from the beginning of a string', function() {

    expect(filter('   a')).toEqual('a');
    expect(filter('   foo bar   ')).toEqual('foo bar   ');
    expect(filter('   ')).toEqual('');

  });

  it('should strip specific chars from the beginning of a string', function() {

    expect(filter('__a__', '__')).toEqual('a__');
    expect(filter('//foo bar//', '//')).toEqual('foo bar//');
    expect(filter('barfoobar', 'bar')).toEqual('foobar');

    expect(filter('barfoobar', 'foo')).toEqual('barfoobar');

  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
