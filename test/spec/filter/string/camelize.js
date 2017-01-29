'use strict';

describe('camelizeFilter', function () {

  var filter;

  beforeEach(module('a8m.camelize'));

  beforeEach(inject(function ($filter) {
    filter = $filter('camelize');
  }));

  it('should camelize valid strings', function() {
    expect(filter('a_simple_word')).toEqual('aSimpleWord');
    expect(filter('a_medium_word_here')).toEqual('aMediumWordHere');
    expect(filter('ANUPPERCASEDWORDHERE')).toEqual('anuppercasedwordhere');
    expect(filter('alowercasedword')).toEqual('alowercasedword');
    expect(filter('     s', true)).toEqual('S');
    expect(filter('  SOME WHITE SPACES  ')).toEqual('someWhiteSpaces');
    expect(filter('  SOME-WHITE-SPACES  ', true)).toEqual('SomeWhiteSpaces');
    expect(filter('-1  SOME-WHITE-SPACES0  2-', true)).toEqual('1SomeWhiteSpaces02');
  });

  it('should not camelize invalid strings', function() {
    expect(filter(null)).not.toEqual('null');
    expect(filter(undefined)).not.toEqual('undefined');
    expect(filter('ANUPPERCASEDWORDHERe')).not.toEqual('aNUPPERCASEDWORDHERE');
  });

});
