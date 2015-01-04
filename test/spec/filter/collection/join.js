'use strict';

describe('isJoinFilter', function () {
  var joinFilter;

  beforeEach(module('a8m.join'));

  beforeEach(inject(function (_joinFilter_) {
    joinFilter = _joinFilter_;
  }));

  describe('given a collection', function () {
    var arr;

    describe('which is empty', function () {
      beforeEach(function () {
        arr = [];
      });

      it('should return an empty string', function () {
        expect(joinFilter(arr)).toEqual('');
      });

    });

    describe('of strings', function () {
      beforeEach(function () {
        arr = ['hello', 'world'];
      });

      describe('with no delimiter', function () {
        it('should join elements with a space', function () {
          expect(joinFilter(arr)).toEqual('hello world');
        });
      });

      describe('with a custom delimiter', function () {
        var delim;

        describe('which is not a string', function () {
          it('should join elements with a toString representation of the delimiter', function () {
            delim = true;
            expect(joinFilter(arr, delim)).toEqual('hellotrueworld');

            delim = 10;
            expect(joinFilter(arr, delim)).toEqual('hello10world');

            delim = {toString: function () { return ' - ' }}
            expect(joinFilter(arr, delim)).toEqual('hello - world');
          });
        });

        it('should join elements with the given delimiter', function () {
          delim = ', '
          expect(joinFilter(arr, delim)).toEqual('hello, world');
        });
      });
    });

  });

  describe('given something that is not a collection', function () {
    var str, obj, bool, num;
    beforeEach(function () {
      str = 'string';
      obj = {'a': 'b'};
      bool = true;
      num = 5;
    });

    it('should return the input as is', function () {
      expect(joinFilter(str)).toEqual(str);
      expect(joinFilter(obj)).toEqual(obj);
      expect(joinFilter(bool)).toEqual(bool);
      expect(joinFilter(num)).toEqual(num);
    });
  });
});
