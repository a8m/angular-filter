'use strict';

describe('chunkByFilter', function() {
  var filter;

  beforeEach(module('a8m.chunk-by'));
  beforeEach(inject(function($filter) {
    filter = $filter('chunkBy');
  }));

  it('should collect data into fixed-length chunks or blocks', function() {
    expect(filter([1, 2, 3, 4], 2)).toEqual([[1,2], [3,4]]);
    expect(filter([1, 2, 3, 4], 3)).toEqual([[1,2, 3], [4]]);
    expect(filter(['a', 'b', 'c', 'd'], 4)).toEqual([['a', 'b', 'c', 'd']]);
  });

  it('should get an fill-value and complete blocks that less than `n`', function() {
    expect(filter([1, 2, 3, 4, 5], 2, 0)).toEqual([[1, 2], [3, 4], [5, 0]]);
    expect(filter([1, 2, 3, 4], 3, 1)).toEqual([[1, 2, 3], [4, 1, 1]]);
  });

  it('should get a !collection and return it as-is', function() {
    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
    expect(filter('string')).toEqual('string');
    expect(filter(undefined)).toEqual(undefined);
  });
});
