#Angular-filter &nbsp; [![Build Status](https://travis-ci.org/a8m/angular-filter.svg?branch=master)](https://travis-ci.org/a8m/angular-filter)  [![Coverage Status](https://coveralls.io/repos/a8m/angular-filter/badge.png?branch=master)](https://coveralls.io/r/a8m/angular-filter?branch=master)
>Bunch of useful filters for angularJS (with no external dependencies!), **v0.4.7**

##Table of contents:
- [Get Started](#get-started)
- [Common Questions](https://github.com/a8m/angular-filter/wiki/Common-Questions)
- [Development](#development)
- [TODO](#todo)
- [Collection](#collection)
  - [after](#after)
  - [afterWhere](#afterwhere)
  - [before](#before)
  - [beforeWhere](#beforewhere)
  - [concat](#concat)
  - [contains](#contains)
  - [countBy](#countby)
  - [every](#every)
  - [filterBy](#filterby)
  - [first](#first)
  - [flatten](#flatten)
  - [fuzzy](#fuzzy)
  - [fuzzyBy](#fuzzyby)
  - [groupBy](#groupby)
  - [isEmpty](#isempty)
  - [last](#last)
  - [map](#map)
  - [omit](#omit)
  - [pick](#pick)
  - [pluck](#pluck)
  - [reverse](#reverse-collection)
  - [remove](#remove)
  - [removeWith](#remove-with)
  - [searchField](#searchfield)
  - [some](#contains)
  - [toArray](#toarray)
  - [unique](#unique)
  - [where](#where)
  - [xor](#xor)
- [String](#string)
  - [endsWith](#endswith)
  - [repeat](#repeat)
  - [reverse](#reverse-string)
  - [slugify](#slugify)
  - [startsWith](#startswith)
  - [stripTags](#striptags)
  - [stringular](#stringular)
  - [trim](#trim)
  - [ltrim](#ltrim)
  - [rtrim](#rtrim)
  - [truncate](#truncate)
  - [ucfirst](#ucfirst)
  - [uriEncode](#uriencode)
  - [wrap](#wrap)
- [Math](#math)
  - [min](#min)
  - [max](#max)
  - [percent](#percent)
  - [radix](#radix)
  - [sum](#sum)
  - [degrees](#degrees)
  - [radians](#radians)
  - [shortFmt](#shortfmt)
  - [byteFmt](#bytefmt)
  - [kbFmt](#kbfmt)
- [Boolean](#boolean)
  - [isNull](#isnull)
  - [isDefined](#isdefined)
  - [isUndefined](#isundefined)
  - [isString](#isstring)
  - [isNumber](#isnumber)
  - [isObject](#isobject)
  - [isArray](#isarray)
  - [isFunction](#isfunction)
  - [isEqual](#isequal)
  - [isGreaterThan](#isgreaterthan) `>`
  - [isGreaterThanOrEqualTo](#isgreaterthanorequalto) `>=`
  - [isLessThan](#islessthan) `<`
  - [isLessThanOrEqualTo](#islessthanorequalto) `<=`
  - [isEqualTo](#isequalto) `==`
  - [isNotEqualTo](#isnotequalto) `!=`
  - [isIdenticalTo](#isidenticalto) `===`
  - [isNotIdenticalTo](#isnotidenticalto) `!==`

#Get Started
**(1)** You can install angular-filter using 4 different methods:
  - clone & [build](#developing) this repository
  - via **[Bower](http://bower.io/)**: by running `$ bower install angular-filter` from your terminal
  - via **[npm](https://www.npmjs.org/)**: by running `$ npm install angular-filter` from your terminal
  - via cdnjs http://www.cdnjs.com/libraries/angular-filter

**(2)** Include `angular-filter.js` (or `angular-filter.min.js`) in your `index.html`, after including Angular itself.

**(3)** Add `'angular.filter'` to your main module's list of dependencies.

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html ng-app="myApp">
<head>
   
</head>
<body>
    ...
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
    <script src="bower_components/js/angular-filter.min.js"></script>
    ...
    <script>
        var myApp = angular.module('myApp', ['angular.filter']);

    </script>
    ...
</body>
</html>
```

---

# Available filters
* [Collection Filters](docs/collection-filters.md)
* [String Filters](docs/string-filters.md)
* [Math Filters](docs/math-filters.md)
* [Boolean Filters](docs/boolean-filters.md)

---

#TODO
- Add project website on branch gh-pages, see **[Github-help](https://help.github.com/articles/creating-project-pages-manually)**

#Development
* Don't forget about tests.
* If you planning add some feature please create issue before.

Clone the project: <br/>
```bash
$ git clone
$ npm install
$ bower install
```
Run the tests:
```bash
$ grunt test
```
**Deploy:**<br/>
Run the build task, update version before(bower,package)
```bash
$ grunt build
$ git tag v0.*.*
$ git push origin master --tags
```
