'use strict';

describe('fuzzyByFilter', function() {
  var filter,
    collection = [
      { title: 'The DaVinci Code' },
      { title: 'The Great Gatsby' },
      { title: 'Angels & Demons'  },
      { title: 'The Lost Symbol'  },
      { title: 'Old Man\'s War'   }
    ];

  beforeEach(module('a8m.fuzzy-by'));

  beforeEach(inject(function ($filter) {
    filter = $filter('fuzzyBy');
  }));

  it('should get array as collection, property, search, and filter by fuzzy searching', function() {

    expect(filter(collection, 'title', 'tha')).toEqual([collection[0], collection[1]]);
    expect(filter(collection, 'title', 'thesy')).toEqual([collection[1], collection[3]]);
    expect(filter(collection, 'title', 'omwar')).toEqual([collection[4]]);


  });

  it('should be case sensitive if set to true', function() {

    expect(filter(collection, 'title', 'tha', true)).toEqual([]);
    expect(filter(collection, 'title', 'thesy', true)).toEqual([]);
    expect(filter(collection, 'title', 'omwar', true)).toEqual([]);

    expect(filter(collection, 'title', 'TDC', true)).toEqual([collection[0]]);
    expect(filter(collection, 'title', 'ThLSy', true)).toEqual([collection[3]]);
    expect(filter(collection, 'title', 'OldWar', true)).toEqual([collection[4]]);

  });

  it('should support nested properties', function() {

    collection = [
      { details: { title: 'The DaVinci Code' } },
      { details: { title: 'The Great Gatsby' } },
      { details: { title: 'Angels & Demons'  } },
      { details: { title: 'The Lost Symbol'  } },
      { details: { title: 'Old Man\'s War'   } }
    ];

    expect(filter(collection, 'details.title', 'tha')).toEqual([collection[0], collection[1]]);
    expect(filter(collection, 'details.title', 'thesy')).toEqual([collection[1], collection[3]]);
    expect(filter(collection, 'details.title', 'omwar')).toEqual([collection[4]]);

  });

  it('should not get a property and return the collection as-is', function() {

    var array = [{ name: 'foo' }];

    expect(filter(array)).toEqual(array);

  });

  it('should get a !collection and return it as-is', function() {

    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
    expect(filter('string')).toEqual('string');

  });

});
