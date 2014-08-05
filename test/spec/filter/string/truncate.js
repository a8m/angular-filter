describe('truncateFilter', function () {
  var filter;

  beforeEach(module('a8m.truncate'));

  beforeEach(inject(function($filter) {
    filter = $filter('truncate');
  }));

  it('should cut a string if it is longer than the provided length', function () {

    expect(filter('lorem ipsum dolor sit amet', 5, '', false)).toEqual('lorem');
    expect(filter('lorem ipsum dolor sit amet', 11, '', false)).toEqual('lorem ipsum');
    expect(filter('lorem ipsum dolor sit amet', 50, '', false)).toEqual('lorem ipsum dolor sit amet');

    expect(filter('abcdef', 3, '', false)).toEqual('abc');
    expect(filter('abcd ef', 6, '', false)).toEqual('abcd e');

  });

  it('should not cut words in the middle if preserve is true', function () {

    expect(filter('lorem ipsum dolor sit amet', 7, '', true)).toEqual('lorem ipsum');
    expect(filter('lorem ipsum dolor sit amet', 13, '', true)).toEqual('lorem ipsum dolor');
    expect(filter('lorem ipsum dolor sit amet', 50, '', true)).toEqual('lorem ipsum dolor sit amet');

    expect(filter('abcdef', 3, '', true)).toEqual('abcdef');
    expect(filter('abcd ef', 6, '', true)).toEqual('abcd ef');

  });

  it('should append the provided prefix if a string has been cut', function () {

    expect(filter('lorem ipsum dolor sit amet', 7, '...', true)).toEqual('lorem ipsum...');
    expect(filter('lorem ipsum dolor sit amet', 13, '...', true)).toEqual('lorem ipsum dolor...');
    expect(filter('lorem ipsum dolor sit amet', 50, '...', true)).toEqual('lorem ipsum dolor sit amet');

  });

  it('should get !string and return it as-is', function() {

    expect(filter([])).toEqual([]);
    expect(filter({})).toEqual({});
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();

  });

});