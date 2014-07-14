'use strict';

describe('uriEncodeFilter', function() {

  var filter,
      $window;

  beforeEach(module('a8m.uri-encode'));

  beforeEach(inject(function($filter, _$window_) {
    filter = $filter('uriEncode');
    $window = _$window_;
  }));

  it('it should get string as parameter and called encodeURI', function() {

    var string = 'foo bar baz';

    spyOn($window, 'encodeURI');

    filter(string);

    expect($window.encodeURI).toHaveBeenCalledWith(string)

  });

  it('should get !string as parameter and return it as is', function() {

    spyOn($window, 'encodeURI');

    expect(filter([])).toEqual([]);
    expect(filter({})).toEqual({});
    expect(filter(777)).toEqual(777);
    expect($window.encodeURI).not.toHaveBeenCalled();


  })

});
