'use strict';

describe('sentenceCaseFilter', function () {

  var filter;

  beforeEach(module('a8m.sentence-case'));

  beforeEach(inject(function ($filter) {
    filter = $filter('sentenceCase');
  }));

  it('should get a string and return it uppercase for each first letter of the first word of each sentence', function() {
    expect(filter('hello george')).toEqual('Hello george');
    expect(filter('foo bar. baz')).toEqual('Foo bar. Baz');
    expect(filter('testable by comparison. cOmparable by TESTS')).toEqual('Testable by comparison. COmparable by TESTS');
  });

  it('should return all spacing intact', function(){
    expect(filter('    hello  .  george')).toEqual('    Hello  .  George');
    expect(filter(' hellll.l lo  .llo  ')).toEqual(' Hellll.L lo  .Llo  ');
  });

});
