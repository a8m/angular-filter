'use strict';

describe('andFilter', function() {
  var filter;

  beforeEach(module('a8m.and'));

  beforeEach(inject(function($filter) {
    filter = $filter('and');
  }));

  it('should get 2 array collection and return exclusive or between them', function() {
    expect(filter([1,2], [1])).toEqual([1]);
    expect(filter([1, 2, 3], [5, 2, 1, 4])).toEqual([1, 2]);

    expect(filter([1, 2, 3], [4, 5])).toEqual([]);
    expect(filter([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it('should get objects as collection', function() {
    expect(filter({ 0: 1, 1: 2 }, { 0: 3 })).toEqual([]);
    expect(filter({ 0: 1, 1: 2 }, { 0: 1 })).toEqual([1]);
  });

  it('should get an objects collection and filters by value', function() {

    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' }
    ];

    expect(filter(array, array)).toEqual(array);
    expect(filter(array, [ { id: 1, name:'foo' } ])).toEqual([array[0]]);

    expect(filter(array, [ { id: 1 } ])).toEqual([]);
  });

  it('should filter by specific property', function() {
    var users = [
      { id: 0, details: { first_name: 'foo', last_name: 'bar' } },
      { id: 1, details: { first_name: 'foo', last_name: 'baz' } },
      { id: 2, details: { first_name: 'foo', last_name: 'bag' } }
    ];

    expect(filter(users, [{ details: { first_name: 'foo' } }], 'details.first_name'))
      .toEqual(users);
    expect(filter(users, [{ id: 0 }, { id: 1 }], 'id')).toEqual([users[0], users[1]]);

    expect(filter(users, [{ id: 3, details: { first_name: 'foo', last_name: 'bag' }}], 'id'))
      .toEqual([]);
  });

  it('should filter by expression', function() {
    expect(filter([ { id: 2 }, { id: 3 }], [ { id: 4 } ], 'id % 2')).toEqual([{ id: 2 }]);
  });

  it('should get !collection and return it as-is', function() {
    expect(filter(999)).toEqual(999);
    expect(filter(!1)).toBeFalsy();
    expect(null).toEqual(null);
  });

});
