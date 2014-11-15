'use strict';

describe('whereFilter', function() {
  var filter;

  beforeEach(module('a8m.where'));

  beforeEach(inject(function ($filter) {
    filter = $filter('where');
  }));

  it('should get array and properties object and return' +
    'array of all elements that have equivalent property values.', function() {

    var array = [
      { id: 0, name: 'ariel' },
      { id: 1, name: 'baz' },
      { id: 0, name: 'ariel' },
      { id: 0, name: 'bar' }
    ];

    expect(filter(array, { id: 0, name: 'ariel' })).toEqual([array[0], array[2]]);
    expect(filter(array, { id: 0 })).not.toContain(array[1]);

    expect(filter(array, {})).toEqual(array);

  });

  it('should get object and properties object and return' +
    'array of all elements that have equivalent property values.', function() {

    var object = {
      0: { id: 1, name: 'ariel' },
      1: { id: 2, name: 'baz' },
      2: { id: 1, name: 'ariel' },
      3: { id: 1, name: 'bar' }
    };

    expect(filter(object, { id: 1, name: 'ariel' })).toEqual([object[0], object[2]]);
    expect(filter(object, { id: 1 })).not.toContain(object[1]);

    expect(filter(object, {}).length).toEqual(4);

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
