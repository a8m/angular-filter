'use strict';

describe('latinizeFilter', function () {

  var filter;

  beforeEach(module('a8m.latinize'));

  beforeEach(inject(function ($filter) {
    filter = $filter('latinize');
  }));

  it('should get a string and replace accents/diacritics with the ASCII equivalent', function() {
    expect(filter('a ç')).toEqual('a c');
    expect(filter('föo bàr baz')).toEqual('foo bar baz');
    expect(filter('Lòrém Ìpsûm dölôr sít Àmet')).toEqual('Lorem Ipsum dolor sit Amet');
  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
