'use strict';

describe('nl2brFilter', function () {

  var filter;

  beforeEach(module('a8m.nl2br'));

  beforeEach(inject(function ($filter) {
    filter = $filter('nl2br');
  }));

  it('should replace newlines (`\\n`) with html newline tag', function() {
    expect(filter('Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\n')).toEqual('Lorem ipsum dolor sit amet,<br/>consectetur adipiscing elit.<br/>');
    expect(filter('\r\n')).toEqual('<br/>');
    expect(filter('\r\nLorem ipsum dolor sit amet,\r\nconsectetur adipiscing elit.')).toEqual('<br/>Lorem ipsum dolor sit amet,<br/>consectetur adipiscing elit.');
  });

  it('should not change anything inside in those strings', function() {
    expect(filter('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    expect(filter([])).toEqual([]);
    expect(filter({})).toEqual({});
    expect(filter(!1)).toBeFalsy();
  });

});
