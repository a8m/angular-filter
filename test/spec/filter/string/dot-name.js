'use strict';

describe('dotNameFilter', function () {

  var filter;

  beforeEach(module('a8m.dot-name'));

  beforeEach(inject(function ($filter) {
    filter = $filter('dotName');
  }));

  it('should convert first and all middle names to dot', function() {

    expect(filter('Gale Lewin')).toEqual('G. Lewin');
    expect(filter('Mandi Baines')).toEqual('M. Baines');
    expect(filter('Ariel Washington')).toEqual('A. Washington');

    expect(filter('Sonny Teresa Hopson')).toEqual('S. T. Hopson');
    expect(filter('Dannie Royston Stacie Ford')).toEqual('D. R. S. Ford');
    expect(filter('Beth Storm Braith Terrence Swindlehurst')).toEqual('B. S. B. T. Swindlehurst');

  });

  it('should handle hyphens', function() {

    expect(filter('Dannie-Royston Stacie Ford')).toEqual('D. S. Ford');
    expect(filter('Dannie Royston-Stacie Ford')).toEqual('D. R. Ford');
    expect(filter('Dannie Royston Stacie-Ford')).toEqual('D. R. Stacie-Ford');

  });

  it('should ignore single string', function() {

    expect(filter('Ford')).toEqual('Ford');

  });

  it('should get a !string and not touch it', function() {
    expect(filter({})).toEqual({});
    expect(filter([])).toEqual([]);
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
  });

});
