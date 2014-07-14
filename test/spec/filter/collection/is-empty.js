'use strict';

describe('isEmptyFilter', function() {
  var filter;

  beforeEach(module('a8m.is-empty'));

  beforeEach(inject(function ($filter) {
    filter = $filter('isEmpty');
  }));

  it('should get collection or string, and return true if it empty', function() {

    expect(filter([])).toBeTruthy();
    expect(filter({})).toBeTruthy();
    expect(filter('')).toBeTruthy();

    expect(filter([1,2])).toBeFalsy();
    expect(filter({foo: 'bar'})).toBeFalsy();
    expect(filter('lorem ipsum')).toBeFalsy();

  });

});
