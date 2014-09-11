'use strict';

describe('lastFilter', function() {

  var filter;

  beforeEach(module('a8m.last'));

  beforeEach(inject(function($filter) {
    filter = $filter('last');
  }));

  it('should return the last member in a collection', function() {
    expect(filter([1,2,3,4,5])).toEqual(5);
    expect(filter(['a', 'b', 'c', 'd'])).toEqual('d');
    expect(filter([undefined, null, null])).toEqual(null);
    expect(filter({0: 'foo', 1: 'bar'})).toEqual('bar');
  });

  it('should return last n elements of a collection', function() {
    expect(filter([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
    expect(filter([undefined, null, null], 2)).toEqual([null, null]);
    expect(filter({0: 'foo', 1: 'bar'}, 2)).toEqual(['foo', 'bar']);
  });

  it('should return the last element that match the expression', function() {
    var users = [
      { id: 1, name: { first: 'foo', last: 'bar' } },
      { id: 2, name: { first: 'baz', last: 'bar' } },
      { id: 3, name: { first: 'bar', last: 'bar' } },
      { id: 4, name: { first: 'lol', last: 'bar' } }
    ];

    expect(filter(users, 'name.first === name.last')).toEqual([ users[2] ]);
    expect(filter(users, '!(id % 2)')).toEqual([ users[3] ]);
    expect(filter(users, 'name.first !== \'lol\' && name.last === \'bar\'')).toEqual([ users[2] ]);
    expect(filter(users, 'id > 5')).toEqual([]);
  });

  it('should return the last n element that match the expression', function() {
    var users = [
      { id: 1, name: { first: 'foo', last: 'bar' } },
      { id: 2, name: { first: 'baz', last: 'bar' } },
      { id: 3, name: { first: 'bar', last: 'bar' } },
      { id: 4, name: { first: 'lol', last: 'bar' } }
    ];

    expect(filter(users, 2, 'name.first !== name.last')).toEqual([users[1], users[3]]);
    expect(filter(users, 2, '(id % 2)')).toEqual([users[0], users[2]]);
    expect(filter(users, 'id > 5')).toEqual([]);

    function mod2(elm) {
      return !(elm%2);
    }

    expect(filter([1, 2, 3, 4, 5, 6], 2, mod2)).toEqual([4, 6]);
    expect(filter([1, 2, 3, 4, 6, 11], 2, mod2)).toEqual([4, 6]);
    expect(filter([2,1], 2, mod2)).toEqual([2]);
  });

  it('should get !collection and return it as-is', function() {
    expect(filter('string')).toEqual('string');
    expect(filter(1010)).toEqual(1010);
    expect(filter(!0)).toBeTruthy();
  });

});
