'use strict';

describe('regExpMatchFilter', function(){

    var filter;
    var regExp = new RegExp("[\\d]");

    beforeEach(module('a8m.regExpMatch'));

    beforeEach(inject(function ($filter) {
        filter = $filter('regExpMatch');
    }));

    it('Should match a string against string regex representation', function() {
        expect(filter('999-0000-222', '[\\d]{3}-[0-9]{4}-[0-9]{3}')).toBeTruthy();
    });

    it('Should match a string with lower and uppercase letters with uppercase only regular expression and ignore-case flag', function(){
        var uppercaseEngLetters = '[A-Z]+';
        //Ignore case
        expect(filter('UnitedStates', uppercaseEngLetters, true)).toBeTruthy();

        //Do not ignore by default
        expect(filter('UnitedStates', uppercaseEngLetters)).toBeFalsy();

        //Add unsupported character
        expect(filter('United-States', uppercaseEngLetters, true)).toBeFalsy();
    });

    it('Should match an array against regular expression object', function(){
        //Flat array
        expect(filter([1,2,3,4,5,6,7], regExp)).toBeTruthy();

        //Flat array with non-matching value
        expect(filter([1,2,3,'a',5,6,7], regExp)).toBeFalsy();
    });

    it('Should match multi-digit number with a one-digit regular expression', function(){
        var singleDigitRegex = '[\\d]';
        //Flat array with non-matching value
        expect(filter([1,1,2,323434], singleDigitRegex)).toBeFalsy();

        //Primitive non-matching value
        expect(filter(323434, singleDigitRegex)).toBeFalsy();

        expect(filter(1, singleDigitRegex)).toBeTruthy();

        expect(filter(false, singleDigitRegex)).toBeFalsy();
    });

    it('Should do recursive match', function(){

        //Nested arrays with non-matching values inside inner array
        expect(filter([1,2,3,4,5,6,7,['b',3,'a',5]], regExp)).toBeFalsy();

        //Object nested inside an array
        expect(filter([1,2,3,4,5,6,7,{b:3, a:5}], regExp)).toBeTruthy();

    });

    it('Should return false when input or regExp params are undefined', function(){
        expect(filter(undefined)).toBeFalsy();
    });

});