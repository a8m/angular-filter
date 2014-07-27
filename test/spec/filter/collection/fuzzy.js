'use strict';

describe('fuzzyFilter', function() {
  var filter,
    collection = [
      { title: 'The DaVinci Code', author: 'F. Scott Fitzgerald' },
      { title: 'The Great Gatsby', author: 'Dan Browns' },
      { title: 'Angels & Demons',  author: 'Dan Louis' },
      { title: 'The Lost Symbol',  author: 'David Maine' },
      { title: 'Old Man\'s War',   author: 'Rob Grant' }
    ];

  beforeEach(module('a8m.fuzzy'));

  beforeEach(inject(function ($filter) {
    filter = $filter('fuzzy');
  }));

  it('should get array as collection, search, and filter by fuzzy searching', function() {

    //search by title
    expect(filter(collection, 'tha')).toEqual([collection[0], collection[1]]);
    expect(filter(collection, 'thesy')).toEqual([collection[1], collection[3]]);
    expect(filter(collection, 'omwar')).toEqual([collection[4]]);

    //search by author
    expect(filter(collection, 'sfd')).toEqual([collection[0]]);
    expect(filter(collection, 'danos')).toEqual([collection[1], collection[2]]);
    expect(filter(collection, 'rgnt')).toEqual([collection[4]]);

  });

  it('should be case sensitive if set to true', function() {

    expect(filter(collection, 'tha', true)).toEqual([]);
    expect(filter(collection, 'thesy', true)).toEqual([]);
    expect(filter(collection, 'omwar', true)).toEqual([]);

    expect(filter(collection,'TDC', true)).toEqual([collection[0]]);
    expect(filter(collection,'ThLSy', true)).toEqual([collection[3]]);
    expect(filter(collection,'OldWar', true)).toEqual([collection[4]]);

  });

  it('should get array of strings, search, and filter by fuzzy searching', function() {

    var array = ['Dan Brown', 'Dan Louis', 'David Maine', 'Rob Grant', 'F. Scott Fitzgerald'];

    expect(filter(array)).toEqual(array);
    expect(filter(array, 'da')).toEqual([ 'Dan Brown', 'Dan Louis', 'David Maine' ]);
    expect(filter(array, 'oa')).toEqual([ 'Rob Grant', 'F. Scott Fitzgerald' ]);
    expect(filter(array, 'S', true)).toEqual([ 'F. Scott Fitzgerald' ]);

  });

  it('should not get a search and return the collection as-is', function() {

    var array = [{ name: 'foo' }];

    expect(filter(array)).toEqual(array);

  });

  it('should get a !collection and return it as-is', function() {

    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
    expect(filter('string')).toEqual('string');

  });

});
