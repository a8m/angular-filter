'use strict';

describe('uriEncodeFilter', function() {

  var filter;

  beforeEach(module('a8m.uri-encode', function($provide) {
    $provide.value('$window', {
      encodeURI: function(){}
    });
  }));

  beforeEach(inject(function($filter) {
    filter = $filter('uriEncode');
  }));

  it('it should get string as parameter and called encodeURI', inject(function($window) {

    var string = 'foo bar baz';

    spyOn($window, 'encodeURI');

    filter(string);

    expect($window.encodeURI).toHaveBeenCalledWith(string)
  }));

  it('should get !string as parameter and return it as is', inject(function($window) {

    spyOn($window, 'encodeURI');

    expect(filter([])).toEqual([]);
    expect(filter({})).toEqual({});
    expect(filter(777)).toEqual(777);
    expect($window.encodeURI).not.toHaveBeenCalled();
  }));

});
