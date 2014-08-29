'use strict';

describe('sumFilter', function () {

    // load the filter's module
    beforeEach(module('a8m.math.max'));

    // initialize a new instance of the filter before each test
    var sum, input, objPath;
    beforeEach(inject(function ($filter) {
        sum = $filter('sum');
    }));

    describe('Passing an array without literal objects', function () {
        beforeEach(function(){
            objPath='any.path';
        });
        describe('Passing an array of numbers', function () {
            it('should return the value 10', function () {
                input = [1,2,3,4];
                expect(sum(input)).toEqual(10);
            });
            it('should return the value 10 and disregard the objPath', function () {
                input = [1,2,3,4];
                expect(sum(input, objPath)).toEqual(10);
            });
        });

        describe('Passing an array of strings', function () {
            it('should return the value 10', function () {
                input = ['1','2','3','4'];
                expect(sum(input)).toEqual(10);
            });
            it('should return the value 10  and disregard the objPath', function () {
                input = ['1','2','3','4'];
                expect(sum(input, objPath)).toEqual(10);
            });
        });

        describe('Passing a mixed array of strings and numbers', function () {
            it('should return the value 10', function () {
                input = ['1',2,'3g',4];
                expect(sum(input)).toEqual(10);
            });
            it('should return the value 10  and disregard the objPath', function () {
                input = ['1','2','3','4'];
                expect(sum(input, objPath)).toEqual(10);
            });
        });

        describe('Passing a mixed array of strings and numbers and strings that fail parse', function () {
            it('should return the value 10', function () {
                input = ['1',2,'3',4, 'foo', 'bar', NaN];
                expect(sum(input)).toEqual(10);
            });
            it('should return the value 10  and disregard the objPath', function () {
                input = ['1','2','3','4'];
                expect(sum(input, objPath)).toEqual(10);
            });
        });

        describe('Passing an array of mixed types', function () {
            it('should return the value 10', function () {
                input = ['1',2,'3',4, 'foo', 'bar', NaN, function(){}, true, false];
                expect(sum(input)).toEqual(10);
            });
            it('should return the value 10  and disregard the objPath', function () {
                input = ['1','2','3','4'];
                expect(sum(input, objPath)).toEqual(10);
            });
        });

    });

    describe('Passing non arrays', function () {

        describe('Passing a number', function () {
            it('should return the value 10', function () {
                input = 10;
                expect(sum(input)).toEqual(10);
            });
        });

        describe('Passing a string', function () {
            it('should return the value "foo"', function () {
                input = 'foo';
                expect(sum(input)).toEqual('foo');
            });
        });

        describe('Passing a function', function () {
            it('should return the function', function () {
                input = function(){};
                expect(sum(input)).toEqual(input);
            });
        });

        describe('Passing a boolean', function () {
            it('should return the value false', function () {
                input = false;
                expect(sum(input)).toEqual(false);
            });
        });

    });

    describe('Passing arrays with literal objects', function () {
        describe('Passing array with a literal object that has values on the first level', function () {
            it('should return the value 10', function () {
                input = [
                    {value: 1},
                    {value: 2},
                    {value: 3},
                    {value: 4}
                ];
                objPath = 'value';
                expect(sum(input, objPath)).toEqual(10);
            });
        });
        describe('Passing array with a literal object that has mixed values on the first level', function () {
            it('should return the value 10', function () {
                input = [
                    {value: 1},
                    {value: '2'},
                    {value: 3},
                    {value: '4g'},
                    {value: 'foo'}
                ];
                objPath = 'value';
                expect(sum(input, objPath)).toEqual(10);
            });
        });
        describe('Passing array with a literal object and wrong path', function () {
            it('should return the value 10', function () {
                input = [
                    {value: 1},
                    {value: 2},
                    {value: 3},
                    {value: 4}
                ];
                objPath = 'values';
                expect(sum(input, objPath)).toEqual(0);
            });
        });
        describe('Passing array with a literal object and a path that is too long', function () {
            it('should return the value 10', function () {
                input = [
                    {value: 1},
                    {value: 2},
                    {value: 3},
                    {value: 4}
                ];
                objPath = 'values.in.the.object';
                expect(sum(input, objPath)).toEqual(0);
            });
        });
        describe('Passing array with a literal object and nested objects', function () {
            it('should return the value 10', function () {
                input = [
                    {
                        name: 'Adanac apple',
                        inventory: {
                            amount: 1
                        }
                    },
                    {
                        name: 'Smith apple',
                        inventory: {
                            amount: 2
                        }
                    },
                    {
                        name: 'Annie apple',
                        inventory: {
                            amount: 3
                        }
                    },
                    {
                        name: 'Pacific apple',
                        inventory: {
                            amount: 4
                        }
                    }
                ];
                objPath = 'inventory.amount';
                expect(sum(input, objPath)).toEqual(10);
            });
        });

        describe('Passing array with a literal object and nested objects and mixed types', function () {
            it('should return the value 10', function () {
                input = [
                    {
                        name: 'Adanac apple',
                        inventory: {
                            amount: 1
                        }
                    },
                    {
                        name: 'Smith apple',
                        inventory: {
                            amount: '2'
                        }
                    },
                    {
                        name: 'Annie apple',
                        inventory: {
                            amount: 3
                        }
                    },
                    {
                        name: 'Pacific apple',
                        inventory: {
                            amount: '4g'
                        }
                    }
                ];
                objPath = 'inventory.amount';
                expect(sum(input, objPath)).toEqual(10);
            });
        });

    });
});
