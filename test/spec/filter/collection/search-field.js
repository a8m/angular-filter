'use strict';

describe('searchFieldFilter', function() {
  var filter;

  beforeEach(module('a8m.search-field'));

  beforeEach(inject(function ($filter) {
    filter = $filter('searchField');
  }));

  it('should get array as a collection, and several keys for searchFiled and' +
    'return new array with the new "searchField" property', function() {

    var input = [
      { first_name: 'Sharon', last_name: 'Melendez' },
      { first_name: 'Edmundo', last_name: 'Hepler' },
      { first_name: 'Marsha', last_name: 'Letourneau' }
    ];

    var output = [
      { first_name: 'Sharon', last_name: 'Melendez', searchField: 'Sharon Melendez' },
      { first_name: 'Edmundo', last_name: 'Hepler', searchField: 'Edmundo Hepler' },
      { first_name: 'Marsha', last_name: 'Letourneau', searchField: 'Marsha Letourneau' }
    ];

    expect(filter(input, 'first_name', 'last_name')).toEqual(output);

    expect(filter([{a: 'a', b: 'b'}], 'a', 'b')).toEqual([{a: 'a', b: 'b', searchField: 'a b'}]);

  });

  it('should support nested properties to', function() {

    var input = [
      { user: { first_name: 'Sharon', last_name: 'Melendez' } },
      { user: { first_name: 'Edmundo', last_name: 'Hepler' } },
      { user: { first_name: 'Marsha', last_name: 'Letourneau' } }
    ];

    var output = [
      { user: { first_name: 'Sharon', last_name: 'Melendez' }, searchField: 'Sharon Melendez' },
      { user: { first_name: 'Edmundo', last_name: 'Hepler' }, searchField: 'Edmundo Hepler' },
      { user: { first_name: 'Marsha', last_name: 'Letourneau' }, searchField: 'Marsha Letourneau' }
    ];

    var inputObject = { user: { details: { name: { first: 'Ariel', last: 'Mashraki' } } } },
      outputObject = { user: { details: { name: { first: 'Ariel', last: 'Mashraki' } } }, searchField: 'Ariel Mashraki' };

    expect(filter(input, 'user.first_name', 'user.last_name')).toEqual(output);

    expect(filter([inputObject], 'user.details.name.first', 'user.details.name.last')).toEqual([outputObject]);

  });

  it('should change the original/source collection', function() {

    var mutable = [{a: 'a', b: 'b'}];
    filter(mutable, 'a', 'b');

    expect(mutable).toEqual([{a: 'a', b: 'b', searchField: 'a b'}]);

  });

  it('should get !collection and return it as-is', function() {

    expect(filter('string', 'foo')).toEqual('string');
    expect(filter(1)).toEqual(1);
    expect(filter(!1)).toBeFalsy();
    expect(filter(null)).toBeNull();

  });

});
