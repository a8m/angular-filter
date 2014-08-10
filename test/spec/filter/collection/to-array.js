'use strict';

describe('toArray', function() {
  var filter;

  beforeEach(module('a8m.to-array'));

  beforeEach(inject(function($filter) {
    filter = $filter('toArray');
  }));

  it('should convert an object to an array of values', function() {
    var object = {
      0: { f: 'foo' },
      1: { b: 'bar' },
      2: { b: 'baz' }
    };

    expect(filter(object)).toEqual([object[0], object[1], object[2]]);

    expect(filter({ 0: 0, 1: 1, 2: 2 })).toEqual([0, 1, 2]);
  });

  it('should add $key property if addKey param is true', function() {
    var object = {
      0: { f: 'foo' },
      1: { b: 'bar' },
      2: { b: 'baz' }
    };

    expect(filter(object, true)).toEqual([
      { $key: '0', f: 'foo' },
      { $key: '1', b: 'bar' },
      { $key: '2', b: 'baz' }
    ]);
  });

  it('should get !object and return it as-is', function() {
    expect(filter(1)).toEqual(1);
    expect(filter(!0)).toBeTruthy();
    expect(filter('string')).toEqual('string');
    expect(filter(undefined)).toEqual(undefined);
  });

});
