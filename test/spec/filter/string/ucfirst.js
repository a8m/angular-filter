'use strict';

describe('ucfirstFilter', function () {

  var filter;

  beforeEach(module('a8m.ucfirst'));

  beforeEach(inject(function ($filter) {
    filter = $filter('ucfirst');
  }));

  it('should get a string and return it uppercase each first letter', function() {
    expect(filter('a')).toEqual('A');
    expect(filter('foo bar baz')).toEqual('Foo Bar Baz');
    expect(filter('lorem ipsum is simply dummy.... industry.')).toEqual('Lorem Ipsum Is Simply Dummy.... Industry.');
  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
