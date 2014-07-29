'use strict';

describe('omitFilter', function() {
  var filter;

  beforeEach(module('a8m.omit'));

  beforeEach(inject(function ($filter) {
    filter = $filter('omit');
  }));

  it('should get array as a collection and filter by expression', function() {

    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(filter(array, 'id === 1')).toEqual([array[1]]);
    expect(filter(array, 'id === 1 && name === "foo"')).toEqual([array[1], array[2], array[3]]);
    expect(filter(array)).toEqual(array);

  });

  it('should get object as a collection and filter by expression', function() {

    var object = {
      0: { id: 1, name: 'foo' },
      1: { id: 2, name: 'baz' },
      2: { id: 1, name: 'ariel' },
      3: { id: 1, name: 'bar' }
    };

    expect(filter(object, 'id === 1')).toEqual([object[1]]);
    expect(filter(object, 'id === 1 && name === "foo"')).toEqual([object[1], object[2], object[3]]);
    expect(filter(object, 'name === german')).toEqual([object[0], object[1], object[2], object[3]]);

  });

  it('should get function ad expression', function() {

    var array = [1, 2, 3, 4, 5];

    function mod2(elm) {
      return !(elm % 2);
    }

    expect(filter(array, mod2)).toEqual([1, 3, 5]);

  });

  it('should get !collection and return it as-is', function() {

    expect(filter('lorem ipsum')).toEqual('lorem ipsum');
    expect(filter(1, null)).toEqual(1);
    expect(filter(!1)).toBeFalsy();

  });

});
