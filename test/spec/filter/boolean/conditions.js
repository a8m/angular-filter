'use strict';

describe('conditionsFilter', function () {

  var isGreaterThan,
      isGreaterThanOrEqualTo,
      isLessThan,
      isLessThanOrEqualTo,
      isEqualTo,
      isNotEqualTo,
      isIdenticalTo,
      isNotIdenticalTo;

  beforeEach(module('a8m.conditions'));

  beforeEach(inject(function ($filter) {
    isGreaterThan = $filter('isGreaterThan');
    isGreaterThanOrEqualTo = $filter('isGreaterThanOrEqualTo');
    isLessThan = $filter('isLessThan');
    isLessThanOrEqualTo = $filter('isLessThanOrEqualTo');
    isEqualTo = $filter('isEqualTo');
    isNotEqualTo = $filter('isNotEqualTo');
    isIdenticalTo = $filter('isIdenticalTo');
    isNotIdenticalTo = $filter('isNotIdenticalTo');
  }));

  it('should check expected conditions', function() {
    expect(isGreaterThan(1, 2)).toBe(false);
    expect(isGreaterThanOrEqualTo(1, 1)).toBe(true);

    expect(isLessThan(1, 2)).toBe(true);
    expect(isLessThanOrEqualTo(3, 2)).toBe(false);

    expect(isEqualTo(3, '3')).toBe(true);
    expect(isNotEqualTo(3, '3')).toBe(false);

    expect(isIdenticalTo(3, 3)).toBe(true);
    expect(isNotIdenticalTo(3, 3)).toBe(false);
  });

  it('should be aliases for each condition filter', inject(
    function($filter){
      var filters = {
        isGreaterThan: '>',
        isGreaterThanOrEqualTo: '>=',
        isLessThan: '<',
        isLessThanOrEqualTo: '<=',
        isEqualTo: '==',
        isNotEqualTo: '!=',
        isIdenticalTo: '===',
        isNotIdenticalTo: '!=='
      };
      //expectations
      angular.forEach(filters, function(val, key) {
        expect($filter(val).toString()).toEqual($filter(key).toString());
      });
    }));

});
