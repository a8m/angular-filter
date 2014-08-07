'use strict';

describe('removeWithFilter', function() {
  var filter;

  beforeEach(module('a8m.remove-with'));

  beforeEach(inject(function ($filter) {
    filter = $filter('removeWith');
  }));

  it('should get array and properties object and return' +
    'array filtered by equivalent property values.', function() {

    var array = [
      { id: 1, name: 'ariel' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(filter(array, { id: 1 })).toEqual([{ id: 2, name: 'baz' }]);
    expect(filter(array, { id: 1, name: 'ariel' })).toEqual([{ id: 2, name: 'baz' }, { id: 1, name: 'bar' }]);

    expect(filter(array, {})).toEqual([]);

  });

  it('should get object and properties object and return' +
    'array of all elements that have equivalent property values.', function() {

    var object = {
      0: { id: 1, name: 'ariel' },
      1: { id: 2, name: 'baz' },
      2: { id: 1, name: 'ariel' },
      3: { id: 1, name: 'bar' }
    };

    expect(filter(object, { id: 1 })).toEqual([ object[1] ]);
    expect(filter(object, { id: 1 , name: 'ariel' })).not.toContain(object[0]);

    expect(filter(object, {}).length).toEqual(0);

  });

  it('should not get properties object and return the collection as is', function() {

    expect(filter([{ a: 1 }])).toEqual([{ a:1 }]);
    expect(filter([{ a: 1 }, { b: 2 }])).toEqual([{ a:1 }, { b: 2 }]);

  });

  it('should get !collection and return it as-is', function() {
    expect(filter(999)).toEqual(999);
    expect(filter(!1)).toBeFalsy();
    expect(null).toEqual(null);
  });

});
