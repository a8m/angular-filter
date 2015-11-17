'use strict';

describe('filterByFilter', function() {
  var filter;

  beforeEach(module('a8m.filter-by'));
  beforeEach(inject(function($filter) {
    filter = $filter('filterBy');
  }));

  it('should filter by specific properties and avoid the rest', function() {
    var users = [
      { id: 1, user: { first_name: 'foo', last_name: 'bar',  mobile: 4444 } },
      { id: 2, user: { first_name: 'bar', last_name: 'foo',  mobile: 3333 } },
      { id: 3, user: { first_name: 'foo', last_name: 'baz',  mobile: 2222 } },
      { id: 4, user: { first_name: 'baz', last_name: 'foo',  mobile: 1111 } }
    ];

    expect(filter(users, ['user.first_name', 'user.last_name'], 'foo')).toEqual(users);
    expect(filter(users, ['user.first_name'], 'foo')).toEqual([users[0], users[2]]);
    expect(filter(users, ['user.last_name'], 'bar')).toEqual([users[0]]);

    expect(filter(users, ['id', 'user.mobile'], '1')).toEqual([users[0], users[3]]);
    expect(filter(users, ['id'], '1')).toEqual([users[0]]);
    expect(filter(users, ['id', 'user.mobile'], '11')).toEqual([users[3]]);
  });

  it('should support to get object as collection', function() {
    var users = {
      0: { id: 1, user: { first_name: 'foo', last_name: 'bar',  mobile: 4444 } },
      1: { id: 2, user: { first_name: 'bar', last_name: 'foo',  mobile: 3333 } },
      2: { id: 3, user: { first_name: 'foo', last_name: 'baz',  mobile: 2222 } },
      3: { id: 4, user: { first_name: 'baz', last_name: 'foo',  mobile: 1111 } }
    };

    expect(filter(users, ['user.first_name', 'user.last_name'], 'foo')).toEqual(users);
    expect(filter(users, ['user.first_name'], 'oo')).toEqual([users[0], users[2]]);
    expect(filter(users, ['user.last_name'], 'bar')).toEqual([users[0]]);
  });

  it('should parse concatenate properties, and search them by one field', function() {
    var users = [
      { id: 1, user: { first_name: 'foo', last_name: 'bar',  mobile: 4444 } },
      { id: 2, user: { first_name: 'bar', last_name: 'foo',  mobile: 3333 } },
      { id: 3, user: { first_name: 'foo', last_name: 'baz',  mobile: 2222 } },
      { id: 4, user: { first_name: 'baz', last_name: 'foo',  mobile: 1111 } }
    ];

    expect(filter(users, ['user.first_name + user.last_name'], 'foo bar')).toEqual([users[0]]);
    expect(filter(users, ['user.first_name+user.last_name'], 'foo bar')).toEqual([users[0]]);
    expect(filter(users, ['user.first_name + user.mobile'], 'foo 4444')).toEqual([users[0]]);

    expect(filter(users, ['user.first_name + user.undefined'], 'foo')).toEqual([users[0], users[2]]);

    expect(filter(users, ['user.first_name + user.last_name'], 'a')).toEqual(users);
    expect(filter(users, ['user.first_name + user.last_name'], 'ba')).toEqual(users);
    expect(filter(users, ['user.first_name + user.last_name'], 'foo')).toEqual(users);
  });

  it('should take care on extreme conditions', function() {
    var users = [
      { id: 1, user: { first_name: 'foo', last_name: 'bar',  mobile: 4444 } },
      { id: 2, user: { first_name: 'bar', last_name: 'foo',  mobile: 3333 } },
      { id: 3, user: { first_name: 'foo', last_name: 'baz',  mobile: 2222 } },
      { id: 4, user: { first_name: 'baz', last_name: 'foo',  mobile: 1111 } }
    ];

    expect(filter(users, ['id'], 1)).toEqual([users[0]]);
    expect(filter(users, ['id'])).toEqual(users);
    expect(filter(users, ['id', 'phone'], 4)).toEqual([users[3]]);
    expect(filter(users, ['id', 'phone'], null)).toEqual(users);
    expect(filter(users, null, null)).toEqual(users);
    expect(filter(users, [], [])).toEqual(users);
  });

  it('should get a !collection and return it as-is', function() {
    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
    expect(filter('string')).toEqual('string');
    expect(filter(undefined)).toEqual(undefined);
  });

  it('should not coerce non-string/number properties', function() {
    var users = [
      { id: [1, 2], user: { first_name: 'foo', last_name: 'bar',  mobile: 4444 } }
    ];

    expect(filter(users, ['id'], 1)).toEqual([]);
  });

  describe('strict mode', function() {
    var users = [
      { id: 1, user: { first_name: 'foo', last_name: 'bar',  mobile: 4444 } }
    ];

    it('should only return exact matches', function() {
      expect(filter(users, ['user.first_name'], 'fo', true)).toEqual([]);
      expect(filter(users, ['user.first_name'], 'foo', true)).toEqual(users);
    });

    it('should handle multiple properties', function() {
      expect(filter(users, ['user.first_name', 'user.last_name'], 'ba', true)).toEqual([]);
      expect(filter(users, ['user.first_name', 'user.last_name'], 'bar', true)).toEqual(users);
    });

    it('should handle concatenation', function() {
      expect(filter(users, ['user.first_name + user.last_name'], 'foo ba', true)).toEqual([]);
      expect(filter(users, ['user.first_name + user.last_name'], 'foo bar', true)).toEqual(users);
    });
  });
});
