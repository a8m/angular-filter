'use strict';

describe('linkifyFilter', function () {

    var filter;

    beforeEach(module('a8m.linkify'));

    beforeEach(inject(function ($filter) {
        filter = $filter('linkify');
    }));

    it('should return proper format for domain url either https or not, and either with tags or space before/after', function() {

        expect(filter('http://domain.com')).toEqual("<a target='_blank' href='http://domain.com'>domain.com</a>");
        expect(filter('http://www.domain.com')).toEqual("<a target='_blank' href='http://www.domain.com'>www.domain.com</a>");
        expect(filter('https://www.domain.com')).toEqual("<a target='_blank' href='https://www.domain.com'>www.domain.com</a>");
        expect(filter('<p>some tags before</p>http://www.domain.com some txt')).toEqual("<p>some tags before</p><a target='_blank' href='http://www.domain.com'>www.domain.com</a> some txt");
        expect(filter('some text http://www.domain.com<p>some tags after</p>')).toEqual("some text <a target='_blank' href='http://www.domain.com'>www.domain.com</a><p>some tags after</p>");

    });

    it('should return proper format for ftp url either https or not, and either with tags or space before/after', function() {

        expect(filter('ftp://domain.com')).toEqual("<a target='_blank' href='ftp://domain.com'>domain.com</a>");
        expect(filter('ftp://www.domain.com')).toEqual("<a target='_blank' href='ftp://www.domain.com'>www.domain.com</a>");
        expect(filter('ftps://www.domain.com')).toEqual("<a target='_blank' href='ftps://www.domain.com'>www.domain.com</a>");
        expect(filter('<p>some tags before</p>ftps://www.domain.com some txt')).toEqual("<p>some tags before</p><a target='_blank' href='ftps://www.domain.com'>www.domain.com</a> some txt");
        expect(filter('some text ftps://www.domain.com<p>some tags after</p>')).toEqual("some text <a target='_blank' href='ftps://www.domain.com'>www.domain.com</a><p>some tags after</p>");

    });

    it('should return proper format for mail url', function() {

        expect(filter('email@domain.com')).toEqual("<a href='mailto:email@domain.com'>email@domain.com</a>");

    });

    it('should return proper format for mail url even for space or with tags', function() {

        var textToBeScan = "someText here email@domain.com<p>someTag</p>",
            textToBeReturned = "someText here <a href='mailto:email@domain.com'>email@domain.com</a><p>someTag</p>";

        expect(filter(textToBeScan)).toEqual(textToBeReturned);

    });
});
