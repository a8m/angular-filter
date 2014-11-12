'use strict';

describe('filterWatcherProvider', function() {

  //helpers
  function n(n) { return n; }
  var stub = { fn: function(x) { return n(x) } };

  beforeEach(module('a8m.filter-watcher'));

  it('should have 2 main functions `isMemoized` and `memozie`', inject(function(filterWatcher) {
    expect(filterWatcher.isMemoized).toEqual(jasmine.any(Function));
    expect(filterWatcher.memoize).toEqual(jasmine.any(Function));
  }));

  it('should called the function if it\'s not cached',
    inject(function(filterWatcher) {
      var spy = spyOn(stub, 'fn');
      (function memoizedOnly(n) {
        return filterWatcher.isMemoized('fName',n) || stub.fn(n);
      })();
      expect(spy).toHaveBeenCalled();
      expect(spy.callCount).toEqual(1);
  }));

  it('should get the result from cache if it\'s memoize',
    inject(function(filterWatcher, $rootScope) {
      var scope = $rootScope.$new();
      var spy = spyOn(stub, 'fn').andCallFake(function() {
        return 1;
      });
      function memoize(n) {
        return filterWatcher.isMemoized('fName', n) ||
          filterWatcher.memoize('fName', n, scope, stub.fn(n));
      }
      [1,1,1,1,4,4,4,4,4].forEach(function(el) {
        memoize(el);
      });
      expect(spy).toHaveBeenCalled();
      expect(spy.callCount).toEqual(2);
  }));

  it('should clear cache from scope listeners on `$destroy`',
    inject(function(filterWatcher, $rootScope) {
      var scope;
      var spy = spyOn(stub, 'fn').andCallFake(function() {
        return 1;
      });
      function memoize(n) {
        return filterWatcher.isMemoized('fName', n) ||
          filterWatcher.memoize('fName', n, scope = $rootScope.$new(), stub.fn(n));
      }
      [1,1,1,1,1,1,1,1,1,1].forEach(function(el) {
        memoize(el);
        scope.$destroy();
      });
      expect(spy.callCount).toEqual(10);
    }));
});