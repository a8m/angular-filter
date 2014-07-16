'use strict';

describe('isNullFilter', function () {

  var filter;

  beforeEach(module('a8m.is-null'));

  beforeEach(inject(function ($filter) {
    filter = $filter('isNull');
  }));

  it('should returns true if the value is null, else false.', function() {

    expect(filter(null)).toBeTruthy();

    expect(filter({})).toBeFalsy();
    expect(filter([])).toBeFalsy();
    expect(filter(1)).toBeFalsy();
    expect(filter(!1)).toBeFalsy();
    expect(filter('string')).toBeFalsy();
    expect(filter(undefined)).toBeFalsy();

  });

});
