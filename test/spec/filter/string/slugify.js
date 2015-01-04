'use strict';

describe('slugifyFilter', function () {

  var filter;

  beforeEach(module('a8m.slugify'));

  beforeEach(inject(function ($filter) {
    filter = $filter('slugify');
  }));

  it('should get a string with no replacer and replace spaces with dash(-)', function() {
    expect(filter('a a')).toEqual('a-a');
    expect(filter('foo bar baz')).toEqual('foo-bar-baz');
    expect(filter('Lorem ipsum dolor sit amet')).toEqual('lorem-ipsum-dolor-sit-amet');
  });

  it('should get a string with replacer and replace spaces with it', function() {
    expect(filter('a a', 1)).toEqual('a1a');
    expect(filter('foo bar baz', '!')).toEqual('foo!bar!baz');
    expect(filter('lorem ipsum dolor sit amet', ' ')).toEqual('lorem ipsum dolor sit amet');
    expect(filter('Lorem ipsum dolor sit amet', '-')).toEqual('lorem-ipsum-dolor-sit-amet');
    expect(filter('Lorem ipsum dolor sit amet', '')).toEqual('loremipsumdolorsitamet');
  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
