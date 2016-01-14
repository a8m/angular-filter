'use strict';

describe('containsFilter', function() {
  var filter;

  beforeEach(module('a8m.contains'));

  beforeEach(inject(function ($filter) {
    filter = $filter('contains');
  }));
  
  it('should find elements which are objects', function() {
    var needle = {};
    var haystack = [needle];
    
    expect(filter(haystack, needle)).toBeTruthy();
  });

  it('should get collection of primitives and use strict comparison(===)', function() {
    expect(filter(['foo', 'bar'], 'bar')).toBeTruthy();
    expect(filter([1,2,3,4], 4)).toBeTruthy();

    expect(filter(['foo', 'bar'], 'baz')).toBeFalsy();
    expect(filter([1,2,3,4], -1)).toBeFalsy();
  });

  it('should get array as collection and return if given expression is ' +
    'present in one or more object in the collection', function() {
    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(filter(array, 'id === 2')).toBeTruthy();
    expect(filter(array, 'id >= 1 && name === \'foo\'')).toBeTruthy();
    expect(filter(array)).toBeFalsy();

    expect(filter(array, 'id > 77')).toBeFalsy();
    expect(filter(array, 'name.indexOf(\'u\') !== -1')).toBeFalsy();
  });

  it('should get object as collection and return if given expression is ' +
    'present in one or more object in the collection', function() {
    var object = {
      0: { id: 1, name: 'foo' },
      1: { id: 2, name: 'baz' },
      2: { id: 1, name: 'ariel' },
      3: { id: 1, name: 'bar' }
    };

    expect(filter(object, 'id === 2')).toBeTruthy();
    expect(filter(object, 'id >= 1 && name === "foo"')).toBeTruthy();
    expect(filter(object)).toBeFalsy();

    expect(filter(object, 'id > 77')).toBeFalsy();
    expect(filter(object, 'name.indexOf(\'u\') !== -1')).toBeFalsy();
  });

  it('should get function as expression', function() {
    var array = [1, 2, 3, 4, 5];

    function mod2(elm) {
      return !(elm % 2);
    }

    expect(filter(array, mod2)).toBeTruthy();
  });

  it('should get !collection and return always true', function() {
    expect(filter('lorem ipsum')).toBeFalsy();
    expect(filter(1, null)).toBeFalsy();
    expect(filter(!1)).toBeFalsy();
  });

});
