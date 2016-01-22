'use strict';

describe('randomFilter', function() {
  var filter;

  beforeEach(module('a8m.random'));

  beforeEach(inject(function ($filter) {
    filter = $filter('random');
  }));

  it('should get array as collection and return a random value from the collection', function() {

    var numbArray = [10, 1, 2, 4, 9, 7, 5];
    var stringArray = ['foo', 'bar', 'baz'];
    var mixedArray = [1, 'foo', 9, 'bar', 4, 'baz'];

    expect(numbArray).toContain(filter(numbArray));
    expect(stringArray).toContain(filter(stringArray));
    expect(mixedArray).toContain(filter(mixedArray));

  });

  it('should get object as collection and return a random value from the collection', function() {

    var object = {
      0: { id: 1 },
      1: { id: 2 },
      2: { id: 3 }
    };

    expect(toArray(object)).toContain(filter(object));

  });

  it('should get !collection and return it as-is', function() {

    expect(filter(999)).toEqual(999);
    expect(filter('hello world!')).toEqual('hello world!');
    expect(filter(!1)).toBeFalsy();
    expect(null).toEqual(null);

  });
});
