'use strict';

describe('removeSpacesFilter', function () {

  var filter;

  beforeEach(module('remove-spaces'));

  beforeEach(inject(function ($filter) {
    filter = $filter('removeSpaces');
  }));

  it('should get a string with no replacer and replace spaces with dash(-)', function() {
    expect(filter('a a')).toEqual('a-a');
    expect(filter('foo bar baz')).toEqual('foo-bar-baz');
    expect(filter('lorem ipsum dolor sit amet')).toEqual('lorem-ipsum-dolor-sit-amet');
  });

  it('should get a string with replacer and replace spaces withit', function() {
    expect(filter('a a', 1)).toEqual('a1a');
    expect(filter('foo bar baz', '!')).toEqual('foo!bar!baz');
    expect(filter('lorem ipsum dolor sit amet', ' ')).toEqual('lorem ipsum dolor sit amet');
    expect(filter('lorem ipsum dolor sit amet', '-')).toEqual('lorem-ipsum-dolor-sit-amet');
  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
