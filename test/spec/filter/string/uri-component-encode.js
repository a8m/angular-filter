'use strict';

describe('uriComponentEncodeFilter', function() {

  var filter;

  beforeEach(module('a8m.uri-component-encode', function($provide) {
    $provide.value('$window', {
      encodeURIComponent: function(){}
    });
  }));

  beforeEach(inject(function($filter) {
    filter = $filter('uriComponentEncode');
  }));

  it('it should get string as parameter and called encodeURIComponent', inject(function($window) {

    var string = 'foo bar baz';

    spyOn($window, 'encodeURIComponent');

    filter(string);

    expect($window.encodeURIComponent).toHaveBeenCalledWith(string)
  }));

  it('should get !string as parameter and return it as is', inject(function($window) {

    spyOn($window, 'encodeURIComponent');

    expect(filter([])).toEqual([]);
    expect(filter({})).toEqual({});
    expect(filter(777)).toEqual(777);
    expect($window.encodeURIComponent).not.toHaveBeenCalled();
  }));

});
