'use strict';

describe('uniqFilter', function() {
  var filter;

  beforeEach(module('a8m.unique'));
  beforeEach(inject(function ($filter) {
    filter = $filter('unique');
  }));


  it('should get a collection of primitives and return filtered collection', function() {
    //Boolean
    expect(filter([true, true, false, false, true])).toEqual([true, false]);
    //numbers
    expect(filter([1, 1, 2, 3, 4, 5, 5, 5, 5])).toEqual([1, 2, 3, 4, 5]);
    //strings
    expect(filter(["Ariel", "Ariel", "Ariel"])).toEqual(["Ariel"]);
  });

  it('should get array as collection, property(nested to) as identifier and filter', function() {

    var orders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:12, customer: { name: 'foo', id: 1 } },
      { id:13, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'baz', id: 3 } },
    ];

    var filteredOrders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'baz', id: 3 } },
    ];

    expect(filter(orders, 'customer.id')).toEqual(filteredOrders);
    expect(filter(orders, 'customer.id').length).toEqual(filteredOrders.length);

    expect(filter(orders, 'customer.name')).toEqual(filteredOrders);
    expect(filter(orders, 'customer.name').length).toEqual(filteredOrders.length);

    expect(filter(orders, 'id')).toEqual(orders);
    expect(filter(orders, 'id').length).toEqual(orders.length);

  });

  it('should filtered by property and not touch members without this property', function() {

    var array = [
      { id: 1, person: { name: 'Ariel' , age: 25 } },
      { id: 2, person: { name: 'Joe' , age: 25 } },
      { id: 3, person: { name: 'Bob' , age: 42 } },
      { id: 4, person: { name: 'Marie' , age: 42 } },
      {}, [], 1,2, 'foo', true, null
    ];

    var filteredArray = [
      { id: 1, person: { name: 'Ariel' , age: 25 } },
      { id: 3, person: { name: 'Bob' , age: 42 } },
      {}, [], 1,2, 'foo', true, null
    ];

    //filter by person.age
    expect(filter(array, 'person.age')).toEqual(filteredArray);

    //should not touch members without this property
    expect(filter(array, 'id')).toEqual(array);

  });

  it('should get object as collection and return filtered collection', function() {

    var dataObject = {
      0: { id: 1, data: {} },
      1: { id: 1, data: {} },
      2: { id: 2, data: {} },
      3: { id: 2, data: {} }
    };
    var dataArray = [
      { id: 1, data: {} },
      { id: 2, data: {}}
    ];

    expect(filter(dataObject, 'id')).toEqual(dataArray);

  });

  it('should support advance nested properties', function() {
    var orders = [
      { order: { person: { credit: { information: { num: 99999 } } } } },
      { order: { person: { credit: { information: { num: 99999 } } } } },
      { order: { person: { credit: { information: { num: 99999 } } } } }
    ];
    expect(filter(orders, 'order.person.credit.information.num')).toEqual([orders[0]]);
  });

  it('should get a !collection and return as-is', function() {
    expect(filter(undefined)).toEqual(undefined);
    expect(filter('foo')).toEqual('foo');
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
