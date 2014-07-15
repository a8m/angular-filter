'use strict';

describe('stringularFilter', function () {

  var filter;

  beforeEach(module('a8m.stringular'));

  beforeEach(inject(function ($filter) {
    filter = $filter('stringular');
  }));

  it('should return the text as it was if only one argument is passed', function () {
    expect(filter('lorem ipsum dolor sit amet')).toEqual('lorem ipsum dolor sit amet');
  });

  it('should replace {n} with arguments passed after the text argument', function () {
    expect(filter('lorem {0} dolor sit amet', 'ipsum')).toEqual('lorem ipsum dolor sit amet');
    expect(filter('lorem {0} dolor {1} amet', 'ipsum', 'sit')).toEqual('lorem ipsum dolor sit amet');
    expect(filter('{3} {0} dolor {1} amet', 'ipsum', 'sit', null, 'lorem')).toEqual('lorem ipsum dolor sit amet');
  });

  it('should keep {n} if no matching argument was found', function () {
    expect(filter('lorem {0} dolor sit amet')).toEqual('lorem {0} dolor sit amet');
    expect(filter('lorem {0} dolor {1} amet', 'ipsum')).toEqual('lorem ipsum dolor {1} amet');
  });

});
