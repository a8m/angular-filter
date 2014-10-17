'use strict';

describe('groupByFilter', function() {
  var filter;

  beforeEach(module('a8m.group-by'));
  beforeEach(inject(function ($filter) {
    filter = $filter('groupBy');
  }));

  it('should get array as collection, property(nested to) as identifier and ' +
    'returns the composed aggregate object.', function() {

    var players = [
      {name: 'Gene', team: 'alpha'},
      {name: 'George', team: 'beta'},
      {name: 'Steve', team: 'gamma'},
      {name: 'Paula', team: 'beta'},
      {name: 'Scruath', team: 'gamma'}
    ];

    expect(filter(players, 'team')).toEqual( {
      alpha: [players[0]],
      beta: [players[1], players[3]],
      gamma: [players[2], players[4]]
    });

  });

  it('should support nested properties to', function() {

    var orders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:12, customer: { name: 'foo', id: 1 } },
      { id:13, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'bar', id: 3 } },
      2, null, true
    ];

    expect(filter(orders, 'customer.name')).toEqual( {
      foo: [orders[0], orders[2]],
      bar: [orders[1], orders[3], orders[4]],
      undefined: [2, null, true]
    });

  });


  it('should get object as collection, property(nested to) as identifier and ' +
    'returns the composed aggregate object.', function() {

    var dataObject = {
      0: { id: 1, data: {} },
      1: { id: 1, data: {} },
      2: { id: 2, data: {} },
      3: { id: 2, data: {} }
    };

    expect(filter(dataObject, 'id')).toEqual({
      1: [dataObject[0], dataObject[1]],
      2: [dataObject[2], dataObject[3]]
    });

  });

  it('should get !collection and return it as-is ', function() {

    expect(filter('string')).toEqual('string');
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
    expect(filter(null)).toBeNull();

  });

  it('should replace null when asked, get array as collection, property(nested to) as identifier and ' +
    'returns the composed aggregate object.', function() {

    var players = [
      {name: 'Gene', team: 'alpha'},
      {name: 'George', team: 'beta'},
      {name: 'Steve', team: 'gamma'},
      {name: 'Paula', team: 'beta'},
      {name: 'Scruath', team: 'gamma'},
      {name: 'Alex', team: null },
      {name: 'Rob' },
      {name: 'Sven', team: false }
    ];

    expect(filter(players, 'team', 'a')).toEqual( {
      a: [players[5], players[6]],
      alpha: [players[0]],
      beta: [players[1], players[3]],
      gamma: [players[2], players[4]],
      'false': [players[7]]
    });

  });

  it('should replace null when asked, support nested properties to', function() {
    var orders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:12, customer: { name: 'foo', id: 1 } },
      { id:13, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'bar', id: 3 } },
      { id:15, customer: { name: null } },
      { id:16, customer: {} },
      2, null, true
    ];

    expect(filter(orders, 'customer.name', 0)).toEqual( {
      foo: [orders[0], orders[2]],
      bar: [orders[1], orders[3], orders[4]],
      0: [orders[5], orders[6], 2, null, true]
    });

  });


  it('should replace null when asked, get object as collection, property(nested to) as identifier and ' +
    'returns the composed aggregate object.', function() {
    var dataObject = {
      0: { id: 1, data: {} },
      1: { id: 1, data: {} },
      2: { id: 2, data: {} },
      3: { id: 2, data: {} },
      4: { id: null, data: {} }
    };

    expect(filter(dataObject, 'id', 0)).toEqual({
      0: [dataObject[4]],
      1: [dataObject[0], dataObject[1]],
      2: [dataObject[2], dataObject[3]]
    });

  });
});
