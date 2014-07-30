'use strict';

describe('repeatFilter', function () {

  var filter;

  beforeEach(module('a8m.repeat'));

  beforeEach(inject(function ($filter) {
    filter = $filter('repeat');
  }));

  it('should repeat a string  n times', function() {

    expect(filter('a')).toEqual('a');
    expect(filter('a', 3)).toEqual('aaa');
    expect(filter('a ', 3)).toEqual('a a a ');

    expect(filter('foo', 3)).toEqual('foofoofoo');

  });

  it('should add a separator if given', function() {

    expect(filter('foo', undefined, 'bar')).toEqual('foo');
    expect(filter('a', 3, '^')).toEqual('a^a^a');
    expect(filter('^', 2, '_')).toEqual('^_^');
    expect(filter('foo', 2, 'bar')).toEqual('foobarfoo');

  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
