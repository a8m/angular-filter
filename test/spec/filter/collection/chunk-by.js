'use strict';

describe('chunkByFilter', function() {
  var filter;

  beforeEach(module('a8m.chunk-by'));
  beforeEach(inject(function($filter) {
    filter = $filter('chunkBy');
  }));

  it('should collect data into fixed-length chunks or blocks', function() {
    expect(filter([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });
  it('should collect data into fixed-length chunks or blocks', function() {
    expect(filter([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]]);
  });
  it('should collect data into fixed-length chunks or blocks', function() {
    expect(filter(['a', 'b', 'c', 'd'], 4)).toEqual([['a', 'b', 'c', 'd']]);
  });

  it('should get an fill-value and complete blocks that less than `n`', function() {
    expect(filter([1, 2, 3, 4, 5], 2, 0)).toEqual([[1, 2], [3, 4], [5, 0]]);
  });
  it('should get an fill-value and complete blocks that less than `n`', function() {
    expect(filter([1, 2, 3, 4], 3, 1)).toEqual([[1, 2, 3], [4, 1, 1]]);
  });

  it('should get a !collection and return it as-is', function() {
    expect(filter(!1)).toBeFalsy();
    expect(filter(1)).toEqual(1);
  });
  it('should get a !collection and return it as-is', function() {
    expect(filter('string')).toEqual('string');
  });
  it('should get a !collection and return it as-is', function() {
    expect(filter(undefined)).toEqual(undefined);
  });

  describe('inside the DOM', function() {
    it('should not throw and not trigger the infinite digest exception',
      inject(function($rootScope, $compile) {
        var scope = $rootScope.$new();
        scope.list = [
          { name: 'foo', team: 'a' },
          { name: 'lol', team: 'b' },
          { name: 'bar', team: 'b' },
          { name: 'baz', team: 'a' },
          { name: 'bag', team: 'a' }
        ];
        scope.search = '';
        var elm = angular.element(
            '<ul>' +
            '<li ng-repeat="players in list | filter: search | chunkBy: 3">' +
            '<p ng-repeat="player in players"> {{ player }}</p>' +
            '</li>' +
            '</ul>'
        );
        var temp = $compile(elm)(scope);
        expect(function() { scope.$digest() }).not.toThrow();
        expect(angular.element(temp.children()[0]).children().length).toEqual(3);
        expect(angular.element(temp.children()[1]).children().length).toEqual(2);
      }));
  });
});
