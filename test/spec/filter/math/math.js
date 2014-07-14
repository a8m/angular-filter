'use strict';

describe('$mathFactory', function () {

  var $math,
    $window;

  beforeEach(module('a8m.math'));

  beforeEach(inject(function (_$math_, _$window_) {
    $math = _$math_;
    $window = _$window_;
  }));

  it('should return a reference to global Math Object', function() {
    expect($math).toEqual($window.Math);
  });

});
