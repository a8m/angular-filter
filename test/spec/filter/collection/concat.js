'use strict';

describe('concatFilter', function() {

  var filter;

  beforeEach(module('a8m.concat'));

  beforeEach(inject(function($filter) {
    filter = $filter('concat');
  }));

  it('should get 2 arrays as parameters and return merged one', function() {

    expect(filter([1,2,3], [4,5,6])).toEqual([1,2,3,4,5,6]);
    expect(filter([], [4,5,6])).toEqual([4,5,6]);
    expect(filter([true, false], [])).toEqual([true, false]);

    expect(filter([{a: 1}], [{a: 2}])).toEqual([{a: 1}, {a: 2}]);
  });

  it('should get a wrong ot none parameters, and not touch it', function () {

    expect(filter('string', [])).toEqual('string');
    expect(filter('string')).toEqual('string');

    expect(filter([], undefined)).toEqual([]);
    expect(filter(undefined, [])).toEqual(undefined);

  });

  it('should get a mixed parameters and return merged collection', function() {

    var array = [{a: 1}],
      object = {
        0: {a: 2},
        1: {a: 3}
      };

    expect(filter(array, object)).toEqual([{a: 1}, {a: 2}, {a: 3}]);
    expect(filter(object, array)).toEqual([{a: 2}, {a: 3}, {a: 1}]);

    expect(filter(object, object)).toEqual([{a: 2}, {a: 3}, {a: 2}, {a: 3}]);
    expect(filter(array, array)).toEqual([{a: 1}, {a: 1}]);

  });

});
