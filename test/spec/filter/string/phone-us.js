'use strict';

describe('phoneUSFilter', function () {

  var filter;

  beforeEach(module('a8m.phoneUS'));

  beforeEach(inject(function ($filter) {
    filter = $filter('phoneUS');
  }));

  it('should format a number as a US-style phone number', function () {
    expect(filter(1234567890)).toEqual('(123) 456-7890');
  });

  it('should format a string as a US-style phone number', function () {
    expect(filter('1234567890')).toEqual('(123) 456-7890');
  });

});
