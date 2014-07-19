'use strict';

describe('reverseFilter', function() {
  var filter;

  beforeEach(module('a8m.reverse'));

  beforeEach(inject(function ($filter) {
    filter = $filter('reverse');
  }));

  it('should get array as collection and return it revered', function() {

    var array = [1,2,3,4];

    expect(filter(array)).toEqual(array.reverse());
    expect(filter([1])).toEqual([1]);
    expect(filter(['foo', 'bar'])).toEqual(['bar', 'foo']);

  });

  it('should get object as collection and return it revered array', function() {

    var object = {
      0: { id: 1 },
      1: { id: 2 },
      2: { id: 3 }
    };

    expect(filter(object)).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);

  });

  it('should get string as a parameter and return it reversed', function() {

    expect(filter('foobar')).toEqual('raboof');
    expect(filter('Lorem Ipsum')).toEqual('muspI meroL');
    expect(filter('FOO, BAR, BAZ')).toEqual('ZAB ,RAB ,OOF');

  });

  it('should get !string and !collection and return it as-is', function() {

    expect(filter(999)).toEqual(999);
    expect(filter(!1)).toBeFalsy();
    expect(null).toEqual(null);

  });

});
