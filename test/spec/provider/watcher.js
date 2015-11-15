'use strict';

describe('filterWatcherProvider', function() {
  //helpers
  var stub = { fn: function(x) { return x; } };

  beforeEach(module('a8m.filter-watcher'));

  it('should have 2 main functions `isMemoized` and `memoize`', inject(function(filterWatcher) {
    expect(filterWatcher.isMemoized).toEqual(jasmine.any(Function));
    expect(filterWatcher.memoize).toEqual(jasmine.any(Function));
  }));

  it('should call the function if it\'s not cached',
    inject(function(filterWatcher) {
      var spy = spyOn(stub, 'fn');
      (function memoizedOnly(n) {
        return filterWatcher.isMemoized('fName',n) || stub.fn(n);
      })();
      expect(spy).toHaveBeenCalled();
      expect(spy.callCount).toEqual(1);
  }));

  it('should not crash in circular structure situations',
    inject(function(filterWatcher, $document, $window, $rootScope) {
      var o1 = { a: 1, b: 2 };
      var o2 = { a: 1, b: 2 };
      o1.own = o1;
      o1.window = $window;
      o1.document = $document;
      o1.scope = $rootScope;
      o1.trait = o2;
      o2.own = o2;
      (function memoizedOnly(n) {
        return filterWatcher.isMemoized('fName',n) || stub.fn(n);
      })(o1);
    }));

  it('should get the result from cache if it\'s memoized',
    inject(function(filterWatcher, $rootScope) {
      var scope = $rootScope.$new();
      var spy = spyOn(stub, 'fn').andCallThrough();
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
      var spy = spyOn(stub, 'fn').andCallThrough();
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

  it('should clear cache manually', function() {
    window.setTimeout = function(cb) { cb(); };
    inject(function(filterWatcher) {
      var src = [1,2]
        , result = [3,4];
      filterWatcher.memoize('fName', src, null, result);
      expect(filterWatcher.isMemoized('fName', src)).toBeFalsy();
    });
  });
});