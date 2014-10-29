'use strict';

describe('lcfirstFilter', function () {

  var filter;

  beforeEach(module('a8m.lcfirst'));

  beforeEach(inject(function ($filter) {
    filter = $filter('lcfirst');
  }));

  it('should get a string and return it uppercase only for the first letter', function() {
    expect(filter('a')).toEqual('a');
    expect(filter('Foo bar baz')).toEqual('foo bar baz');
    expect(filter('Lorem Ipsum is simply dummy.... industry.')).toEqual('lorem Ipsum is simply dummy.... industry.');
  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
