'use strict';

describe('filterWatcherProvider', function() {

  //Provider
  function setPrefix(name) {
    return function(filterWatcherProvider) {
      filterWatcherProvider.setPrefix(name);
    }
  }

  beforeEach(module('a8m.filter-watcher', function ($provide) {
    //mock setTimeout
    $provide.value('$window', {
      setTimeout: function(fn, mill) {
        fn.apply(null, [].slice.call(arguments, 2));
        return +new Date();
      }
    });
  }));

  it('should register watcher and return new object', inject(function(filterWatcher) {
    var watched = {},
      flag = filterWatcher.$watch('foo', watched);

    expect(flag).toEqual({});
    expect(watched).toEqual({ _$$foo : {} });
  }));

  it('should return the same watcher instance if already exist', inject(function(filterWatcher) {
    var watched = { _$$bar: [ 1, 2, 3] },
      flag = filterWatcher.$watch('bar', watched);

    expect(flag).toEqual([ 1, 2, 3]);
  }));

//  it('should be able to remove specific watcher instance', inject(function(filterWatcher) {
//    var watched = { _$$bar: [ 1, 2, 3] };
//    filterWatcher.$destroy('bar', watched);
//
//    expect(watched).toEqual({});
//  }));

  it('should be able to change the watcherPrefix', function() {
    module(setPrefix('a8m_'));
    inject(function(filterWatcher) {
      var watched = {},
        flag = filterWatcher.$watch('foo', watched);

      expect(flag).toEqual({});
      expect(watched).toEqual({ a8m_foo : {} });
    });
  });

});