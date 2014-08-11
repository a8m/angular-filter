'use strict';

describe('mapFilter', function() {
  var filter;

  beforeEach(module('a8m.map'));

  beforeEach(inject(function ($filter) {
    filter = $filter('map');
  }));

  it('should returns a new collection of the results of each expression execution', function() {

    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(filter(array, 'name')).toEqual(['foo', 'baz', 'ariel', 'bar']);
    expect(filter(array, 'id === 1 && name === "foo"')).toEqual([true, false, false, false]);
    expect(filter(array)).toEqual(array);

  });

  it('should get object as a collection and filter by expression', function() {

    var object = {
      0: { id: 1, name: 'foo' },
      1: { id: 2, name: 'baz' },
      2: { id: 1, name: 'ariel' },
      3: { id: 1, name: 'bar' }
    };

    expect(filter(object, 'name')).toEqual(['foo', 'baz', 'ariel', 'bar']);
    expect(filter(object, 'id === 1 && name === "foo"')).toEqual([true, false, false, false]);
    expect(filter(object)).toEqual([object[0], object[1], object[2], object[3]]);

  });

  it('should get function ad expression', function() {

    var array = [1, 2, 3, 4, 5];

    function divide(elm) {
      return (elm/2);
    }

    expect(filter(array, divide)).toEqual([0.5, 1, 1.5, 2, 2.5]);

  });

  it('should get !collection and return it as-is', function() {

    expect(filter('lorem ipsum')).toEqual('lorem ipsum');
    expect(filter(1, null)).toEqual(1);
    expect(filter(!1)).toBeFalsy();

  });

});
