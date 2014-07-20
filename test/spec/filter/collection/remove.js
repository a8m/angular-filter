'use strict';

describe('removeFilter', function() {
  var filter;

  beforeEach(module('a8m.remove'));

  beforeEach(inject(function ($filter) {
    filter = $filter('remove');
  }));

  it('should get array as a collection and members as an arguments' +
    'and remove them from collection', function() {

    var array = [
      { id: 1, name: 'ariel' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(filter(array, { id: 1 , name: 'ariel' })).toEqual([{ id: 2, name: 'baz' }, { id: 1, name: 'bar' }]);
    expect(filter(array, { id: 1, name: 'ariel' }, { id: 1, name: 'bar' })).toEqual([{ id: 2, name: 'baz' }]);

    expect(filter([1,2,3, null], null, 2, 1)).toEqual([3]);

    expect(filter(array, {})).toEqual(array);

  });

  it('should get object as a collection and members as an arguments' +
    'and remove them from collection.', function() {

    var object = {
      0: { id: 1, name: 'ariel' },
      1: { id: 2, name: 'baz' },
      2: { id: 1, name: 'ariel' },
      3: { id: 1, name: 'bar' }
    };

    expect(filter(object, { id: 1, name: 'ariel' })).toEqual([{ id: 2, name: 'baz' }, { id: 1, name: 'bar' }]);
    expect(filter(object, { id: 1 , name: 'ariel' })).not.toContain(object[0]);

    expect(filter(object, {}).length).toEqual(4);

  });

  it('should not arguments and return the collection as is', function() {

    expect(filter([{ a: 1 }])).toEqual([{ a:1 }]);
    expect(filter([{ a: 1 }, { b: 2 }])).toEqual([{ a:1 }, { b: 2 }]);

  });

  it('should get !collection and return it as-is', function() {

    expect(filter('lorem ipsum')).toEqual('lorem ipsum');
    expect(filter(1, null)).toEqual(1);

  });

});
