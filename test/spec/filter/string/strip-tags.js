'use strict';

describe('stripTagsFilter', function () {

  var filter;

  beforeEach(module('a8m.strip-tags'));

  beforeEach(inject(function ($filter) {
    filter = $filter('stripTags');
  }));

  it('should get a string with tags and splash it', function() {
    expect(filter('<p>lorem ipsum</p>')).toEqual('lorem ipsum');
    expect(filter('<div class="block">foo bar</div>')).toEqual('foo bar');
    expect(filter('<title>awesome title</title>')).toEqual('awesome title');
  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
