'use strict';

describe('defaultsFilter', function() {
  var filter;

  beforeEach(module('a8m.defaults'));
  beforeEach(inject(function ($filter) {
    filter = $filter('defaults');
  }));

  it('should return the collection as-is, if default object not provided', function() {
    expect(filter([{}])).toEqual([{}]);
    expect(filter([])).toEqual([]);
  });

  it('should change the source object', function() {
    var array = [{ a: 1 }];
    var defaults = { b: 2 };
    var copy = angular.copy(array);

    expect(filter(array, defaults)).toEqual([{ a:1, b: 2 }]);
    expect(array).not.toEqual(copy);
  });

  //test the simple usage
  describe('should use fallback value', function() {
    var expectOrders = [
      { id:1, destination: { zip: 21908 }, name: 'Ariel M.' },
      { id:2, destination: { zip: 'Pickup' }, name: 'John F.' },
      { id:3, destination: { zip: 45841 }, name: 'Not available'},
      { id:4, destination: { zip: 78612 }, name: 'Danno L.' }
    ];
    var defaults = { name: 'Not available', destination: { zip: 'Pickup' } };

    it('should work with array', function() {
      var orders = [
        { id:1, destination: { zip: 21908 }, name: 'Ariel M.' },
        { id:2, name: 'John F.' },
        { id:3, destination: { zip: 45841 } },
        { id:4, destination: { zip: 78612 }, name: 'Danno L.' }
      ];
      var copyOrders = angular.copy(orders);

      expect(filter(copyOrders, defaults)).toEqual(expectOrders);
      expect(filter(copyOrders, defaults)).not.toEqual(orders);
    });

    it('should work with object', function() {
      var orders = {
        0: { id:1, destination: { zip: 21908 }, name: 'Ariel M.' },
        1: { id:2, name: 'John F.' },
        2: { id:3, destination: { zip: 45841 } },
        3: { id:4, destination: { zip: 78612 }, name: 'Danno L.' }
      };
      var copyOrders = angular.copy(orders);

      expect(filter(copyOrders, defaults)).toEqual(expectOrders);
      expect(filter(copyOrders, defaults)).not.toEqual(orders);
    });

  });

  it('should work fine with complex objects', function() {
    var array = [
      { a: 'string',
        b: { c: 1 },
        d: { e: { f: new Function() } },
        g: [],
        h: undefined,
        i: { j: { k: { l: 'm' } } },
        o: new RegExp }
    ];
    var copy = angular.copy(array);
    var defaults = { z: 'z', z1: { z2: 'z2' } , h: 1 };
    angular.extend(array[0], defaults);
    expect(filter(copy, defaults)).toEqual(array);
  });

  it('should get !collection and return it as-is ', function() {
    expect(filter('string')).toEqual('string');
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
    expect(filter(null)).toBeNull();
  });

});
