'use strict';

describe('lcwordsFilter', function () {

  var filter;

  beforeEach(module('a8m.lcwords'));

  beforeEach(inject(function ($filter) {
    filter = $filter('lcwords');
  }));

  it('should get a string and return it lowercase each first letter', function() {
    expect(filter('A')).toEqual('a');
    expect(filter('Foo Bar Baz')).toEqual('foo bar baz');
    expect(filter('Lorem Ipsum Is Simply Dummy.... Industry.')).toEqual('lorem ipsum is simply dummy.... industry.');
  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
