'use strict';

describe('beforeFilter', function() {
  var filter;

  beforeEach(module('a8m.before'));

  beforeEach(inject(function ($filter) {
    filter = $filter('before');
  }));

  it('should get array as a collection and specified count, and returns all of the items' +
      'in the collection before the specified count.', function() {

    var array = [{ a: 1 }, { a: 2 }];

    expect(filter(array, 2)).toEqual([{ a: 1 }]);

    expect(filter([1,2,3,4], 4)).toEqual([1,2,3]);
    expect(filter([1,2,3,4], 5)).toEqual([1,2,3,4]);

  });

  it('should get object as a collection and specified count, and returns all of the items' +
      'in the collection before the specified count.', function() {

    var object = {
      0: { a: 1 },
      1: { a: 2 },
      2: { a: 3 },
      3: { a: 4 }
    };

    expect(filter(object, 3)).toEqual([{ a: 1 }, { a: 2 }]);
    expect(filter(object, 1)).toEqual([]);

    expect(filter(object, 10)).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);

  });

  it('should get a !collection and return it as-is', function() {

    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
    expect(filter('string')).toEqual('string');

  });

});
