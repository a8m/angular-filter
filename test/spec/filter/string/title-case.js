'use strict';

describe('titleCaseFilter', function () {

  var filter;

  beforeEach(module('a8m.title-case'));

  beforeEach(inject(function ($filter) {
    filter = $filter('titleCase');
  }));

  it('should return a title-cased string', function () {
    expect(filter('lorem ipsum dolor sit amet')).toEqual('Lorem Ipsum Dolor Sit Amet');
  });

  it('should return undefined if not given a string', function () {
    expect(filter()).toEqual(undefined);
  });
});
