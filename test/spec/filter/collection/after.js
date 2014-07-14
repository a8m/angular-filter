'use strict';

describe('afterFilter', function() {
  var filter;

  beforeEach(module('a8m.after'));

  beforeEach(inject(function ($filter) {
    filter = $filter('after');
  }));

  it('should get array as a collection and specified count, and returns all of the items' +
      'in the collection after the specified count.', function() {

    var array = [{ a: 1 }, { a: 2 }];

    expect(filter(array, 1)).toEqual([{ a:2 }]);

    expect(filter([1,2,3,4], 1)).toEqual([2,3,4]);
    expect(filter([1,2,3,4], 5)).toEqual([]);

  });

  it('should get object as a collection and specified count, and returns all of the items' +
      'in the collection after the specified count.', function() {

    var object = {
      0: { a: 1 },
      1: { a: 2 },
      2: { a: 3 },
      3: { a: 4 }
    };

    expect(filter(object, 3)).toEqual([{ a: 4 }]);
    expect(filter(object, 2)).toEqual([{ a: 3 }, { a: 4 }]);

    expect(filter(object, 10)).toEqual([]);

  });

  it('should get a !collection and return it as-is', function() {

    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
    expect(filter('string')).toEqual('string');

  });

});
