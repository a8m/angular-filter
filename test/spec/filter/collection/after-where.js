'use strict';

describe('afterWhereFilter', function() {
  var filter;

  beforeEach(module('a8m.after-where'));

  beforeEach(inject(function ($filter) {
    filter = $filter('afterWhere');
  }));

  it('should get array as a collection and properties object, and returns all of the items,' +
    'in the collection after the first that found with the given properties including it.', function() {

    var array = [{ a: 1 }, { a: 2 }, { a: 3 }],
      orders = [
        { id: 1, customer: { name: 'foo' }, date: 'Tue Jul 15 2014' },
        { id: 2, customer: { name: 'foo' }, date: 'Tue Jul 16 2014' },
        { id: 3, customer: { name: 'foo' }, date: 'Tue Jul 17 2014' },
        { id: 4, customer: { name: 'foo' }, date: 'Tue Jul 18 2014' },
        { id: 5, customer: { name: 'foo' }, date: 'Tue Jul 19 2014' }
      ];

    expect(filter(array, { a: 2 })).toEqual([{ a: 2 }, { a: 3 }]);
    //get all orders after July include
    expect(filter(orders, { date: 'Tue Jul 17 2014' })).toEqual([ orders[2], orders[3], orders[4] ]);

    //if identifier not exist, return it as-is
    expect(filter(orders, { date: 'Tue Jul 10 2014' })).toEqual(orders);
  });

  it('should get object as a collection and properties object, and returns all of the items,' +
    'in the collection after the first that found with the given properties including it.', function() {

    var object = {
      0: { a: 1 },
      1: { a: 2 },
      2: { a: 3 },
      3: { a: 4 }
    },orders = {
      0: { id: 1, customer: { name: 'foo' }, date: 'Tue Jul 15 2014' },
      1: { id: 2, customer: { name: 'foo' }, date: 'Tue Jul 16 2014' },
      2: { id: 3, customer: { name: 'foo' }, date: 'Tue Jul 17 2014' },
      3: { id: 4, customer: { name: 'foo' }, date: 'Tue Jul 18 2014' },
      4: { id: 5, customer: { name: 'foo' }, date: 'Tue Jul 19 2014' }
    };

    expect(filter(object, { a: 3 } )).toEqual([{ a: 3 }, { a: 4 }]);

    expect(filter(orders, { date: 'Tue Jul 18 2014' } )).toEqual([orders[3], orders[4]]);

  });

  it('should get a !collection and return it as-is', function() {

    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
    expect(filter('string')).toEqual('string');

  });

  it('should return the collection as-is, if not get a properties object', function() {

    expect(filter([{}, {}])).toEqual([{}, {}]);
    expect(filter([])).toEqual([]);

  });

});
