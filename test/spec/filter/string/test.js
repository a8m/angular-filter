'use strict';

describe('testFilter', function () {

  var filter;

  beforeEach(module('a8m.test'));

  beforeEach(inject(function ($filter) {
    filter = $filter('test');
  }));

  it('should test a string with given pattern', function() {

    expect(filter('15/12/2003', '^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$', 'i')).toEqual(true);
    expect(filter('foobarbaz', '^[a-z]{3,}$')).toEqual(true);
    expect(filter('FOOBARBAZ', '^[a-z]{3,}$', 'i')).toEqual(true);
    expect(filter('FOOBARBAZ', '^[a-z]{3,}$')).toEqual(false);
    expect(filter('foobarbaz', '\\W')).toEqual(false);
    expect(filter('foobarbaz', '\\w')).toEqual(true);
    expect(filter('1a/bb/2003', '^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$', 'i')).toEqual(false);

  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
