'use strict';

describe('flattenFilter', function() {
  var filter;

  beforeEach(module('a8m.flatten'));

  beforeEach(inject(function($filter) {
    filter = $filter('flatten');
  }));

  it('should get a multiple nested array and return it flatten', function() {
    expect(filter([[[[[0]]]]])).toEqual([0]);

    expect(filter([[], 'A', 'B', ['C', 'D'], ['E', ['F'], []]]))
      .toEqual(['A', 'B', 'C', 'D', 'E', 'F']);

    expect(filter([[[[null]]], [[null]], [null]]))
      .toEqual([null, null, null]);

    expect(filter([[], 1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, [12, [[[[[13], [[[[14, 15]]]]]]]]]]]]]))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it('should have ability to get object as a collection', function() {
    expect(filter({ 0: 1, 1: 2, 2: [3, 4], 3: [5, [6, 7, [8]]] }))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(filter({}))
      .toEqual([]);
  });

  it('should flattened a single level, if shallow set to true', function() {
    expect(filter(['out', ['out', ['in']], ['out', 'out', ['in', 'in']], ['out', 'out']], true))
      .toEqual(['out', 'out', ['in'], 'out', 'out', ['in', 'in'], 'out', 'out']);
    expect(filter([[], 1, [1, [0, [0, [0]]], 1, [0]], 1, [1, [0]]], true))
      .toEqual([1, 1, [0, [0, [0]]], 1, [0], 1, 1, [0]]);
  });

  it('should get !collection, and return it as-is', function() {
    expect(filter('string')).toEqual('string');
    expect(filter(1, true)).toEqual(1);
    expect(filter(~~undefined)).toEqual(0);
    expect(filter(null)).toEqual(null);
  });

});
