'use strict';

describe('minFilter', function () {

  var filter;

  beforeEach(module('a8m.math.min'));

  beforeEach(inject(function ($filter) {
    filter = $filter('min');
  }));

  it('should get an array of numbers and return the lowest one', function() {
    expect(filter([1,2,3,4,5])).toEqual(1);
    expect(filter([2,0,2,2,2])).toEqual(0);
    expect(filter([1])).toEqual(1);
  });

  it('should get an array and expression and return an object', function() {
    var users = [
      { user: { score: 988790 } },
      { user: { score: 123414 } },
      { user: { rank : 100000 } },
      { user: { score: 987621 } }
    ];
    expect(filter(users, 'user.score || user.rank')).toEqual(users[2]);
    expect(filter(users, 'user.score || 1e9')).toEqual(users[1]);
  });


  it('should get an !array and return it as-is', function() {
    expect(filter('string')).toEqual('string');
    expect(filter({})).toEqual({});
    expect(filter(!0)).toBeTruthy();
  });

});
