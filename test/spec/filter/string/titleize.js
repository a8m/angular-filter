'use strict';

describe('titleizeFilter', function () {

  var filter;

  beforeEach(module('a8m.titleize'));

  beforeEach(inject(function ($filter) {
    filter = $filter('titleize');
  }));

  it('should return a title-cased string', function () {
    expect(filter('lorem ipsum dolor sit amet')).toEqual('Lorem Ipsum Dolor Sit Amet');
  });

  it('should return undefined if not given a string', function () {
    expect(filter()).toEqual(undefined);
  });
});
