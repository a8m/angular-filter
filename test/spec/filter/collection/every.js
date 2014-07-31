'use strict';

describe('everyFilter', function() {
  var filter;

  beforeEach(module('a8m.every'));

  beforeEach(inject(function ($filter) {
    filter = $filter('every');
  }));

  it('should get collection of primitives and use strict comparison(===)', function() {

    expect(filter(['bar', 'bar'], 'bar')).toBeTruthy();
    expect(filter([4,4,4,4], 4)).toBeTruthy();

    expect(filter(['foo', 'bar'], 'bar')).toBeFalsy();
    expect(filter([1,4,4,4], 4)).toBeFalsy();

  });

  it('should get array as collection and return if given expression is ' +
    'present all members in the collection', function() {

    var array = [
      { id: 1, name: 'faa' },
      { id: 1, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(filter(array, 'id === 1')).toBeTruthy();
    expect(filter(array, 'id >= 1 && name.indexOf(\'a\') !== -1')).toBeTruthy();
    expect(filter(array)).toBeTruthy();

    expect(filter(array, 'id > 77')).toBeFalsy();
    expect(filter(array, 'name.indexOf(\'b\') !== -1')).toBeFalsy();

  });

  it('should get object as collection and return if given expression is ' +
    'present all members in the collection', function() {

    var object = {
      0: { id: 2, name: 'faa' },
      1: { id: 2, name: 'baz' },
      2: { id: 2, name: 'ariel' },
      3: { id: 2, name: 'bar' }
    };


    expect(filter(object, 'id === 2')).toBeTruthy();
    expect(filter(object, 'id >= 1 && name.indexOf(\'a\') !== -1')).toBeTruthy();
    expect(filter(object)).toBeTruthy();

    expect(filter(object, 'id > 77')).toBeFalsy();
    expect(filter(object, 'name.indexOf(\'b\') !== -1')).toBeFalsy();

  });

  it('should get function as expression', function() {

    var array = [0, 2, 4, 6, 8];

    function mod2(elm) {
      return !(elm % 2);
    }

    expect(filter(array, mod2)).toBeTruthy();

  });

  it('should get !collection and return always true', function() {

    expect(filter('lorem ipsum')).toBeTruthy();
    expect(filter(1, null)).toBeTruthy();
    expect(filter(!1)).toBeTruthy();

  });

});
