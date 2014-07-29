'use strict';

describe('wrapFilter', function () {

  var filter;

  beforeEach(module('a8m.wrap'));

  beforeEach(inject(function ($filter) {
    filter = $filter('wrap');
  }));

  it('should wrap a string with given wrapper', function() {

    expect(filter('a', 'b')).toEqual('bab');
    expect(filter('a', 1)).toEqual('1a1');
    expect(filter('a', '.')).toEqual('.a.');

  });

  it('should wrap a string with starts and ends wrapper', function() {

    expect(filter('b', 'a', 'c')).toEqual('abc');
    expect(filter('a', 1, 2)).toEqual('1a2');
    expect(filter('a', '/', '.')).toEqual('/a.');

  });


  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
