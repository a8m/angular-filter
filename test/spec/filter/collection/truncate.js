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
  });

  it('should not cut words in the middle if preserve is true', function () {
    expect(filter('lorem ipsum dolor sit amet', 7, '', true)).toEqual('lorem ipsum');
    expect(filter('lorem ipsum dolor sit amet', 13, '', true)).toEqual('lorem ipsum dolor');
    expect(filter('lorem ipsum dolor sit amet', 50, '', true)).toEqual('lorem ipsum dolor sit amet');
  });

  it('should append the provided prefix if a string has been cut', function () {
    expect(filter('lorem ipsum dolor sit amet', 7, '...', true)).toEqual('lorem ipsum...');
    expect(filter('lorem ipsum dolor sit amet', 13, '...', true)).toEqual('lorem ipsum dolor...');
    expect(filter('lorem ipsum dolor sit amet', 50, '...', true)).toEqual('lorem ipsum dolor sit amet...');
  });
});