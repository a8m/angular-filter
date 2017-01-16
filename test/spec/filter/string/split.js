'use strict';

describe('splitFilter', function () {

  var filter, sentence = "Today is a beautiful and sunny day!";

  beforeEach(module('a8m.split'));

  beforeEach(inject(function ($filter) {
    filter = $filter('split');
  }));

  it('should test a string with given pattern', function() {

    expect(filter(sentence, ' ', 3)).toEqual(['Today is a beautiful', 'and', 'sunny', 'day!']);
    expect(angular.equals(filter(sentence, '.'), [sentence])).toBeTruthy();
    expect(filter(sentence, ' ')).toEqual(['Today', 'is', 'a', 'beautiful', 'and', 'sunny', 'day!']);

  });

  it('should get a !string and return null', function() {
    expect(filter({})).toEqual(null);
    expect(filter([])).toEqual(null);
    expect(filter(1)).toEqual(null);
    expect(filter(!1)).toBeFalsy(null);
  });

});
