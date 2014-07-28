#Angular-filter &nbsp; [![Build Status](https://travis-ci.org/a8m/angular-filter.svg?branch=master)](https://travis-ci.org/a8m/angular-filter)  [![Coverage Status](https://coveralls.io/repos/a8m/angular-filter/badge.png?branch=master)](https://coveralls.io/r/a8m/angular-filter?branch=master)

##Table of contents:
- [Get Started](#get-started)
- [Collection](#collection)
  - [after](#after)
  - [afterWhere](#afterwhere)
  - [before](#before)
  - [beforeWhere](#beforewhere)
  - [concat](#concat)
  - [fuzzy](#fuzzy)
  - [fuzzyBy](#fuzzyby)
  - [groupBy](#groupby)
  - [isEmpty](#isempty)
  - [omit](#omit)
  - [reverse](#reverse-collection)
  - [remove](#remove)
  - [removeWith](#remove-with)
  - [searchField](#searchfield)
  - [unique](#unique)
  - [where](#where)
- [String](#string)
  - [endsWith](#endswith)
  - [removeSpaces](#removespaces)
  - [reverse](#reverse-string)
  - [startsWith](#startswith)
  - [stripTags](#striptags)
  - [stringular](#stringular)
  - [truncate](#truncate)
  - [ucfirst](#ucfirst)
  - [uriEncode](#uriencode)
- [Math](#math)
  - [min](#min)
  - [max](#max)
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

#Get Started
**(1)** Get angular-filter in one of 3 ways:
  - clone & [build](#developing) this repository
  - via **[Bower](http://bower.io/)**: by running `$ bower install angular-filter` from your console
  - via cdnjs http://www.cdnjs.com/libraries/angular-filter 

**(2)** Include `angular-filter.js` (or `angular-filter.min.js`) in your `index.html`, after including Angular itself.

**(3)** Add `'angular.filter'` to your main module's list of dependencies.

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html ng-app="myApp">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
    <script src="js/angular-filter.min.js"></script>
    <script>
        var myApp = angular.module('myApp', ['angular.filter']);

    </script>
    ...
</head>
<body>
    ...
</body>
</html>
```

#Collection

###concat

concat filter, get two mixed(array/object) parameters and return merged collection


```js
function MainController ($scope) {
  $scope.array = [ {a: 1}, {a: 2} ];
  $scope.object = {
    0: {a: 3},
    1: {a: 4}
  };
}
```

```html
<li ng-repeat="elm in array | concat:object">
  {{ elm.a }}
</li>

<!--
result:
1 2 3 4
-->

<li ng-repeat="elm in object | concat:array">
  {{ elm.a }}
</li>

<!--
result:
3 4 1 2
-->
```

###unique
get collection and filter duplicate members.<br/>
if a property name is provided(nested to) it's filter by this property as unique identifier<br/>
aliases: uniq
```js
function MainController ($scope) {
  $scope.orders = [
    { id:1, customer: { name: 'foo', id: 10 } },
    { id:2, customer: { name: 'bar', id: 20 } },
    { id:3, customer: { name: 'foo', id: 10 } },
    { id:4, customer: { name: 'bar', id: 20 } },
    { id:5, customer: { name: 'baz', id: 30 } },
  ];
}
```
html : it's filters by customer id, i.e remove duplicate customers
```html
<th>All customers list: </th>
<tr ng-repeat="order in orders | unique: 'customer.id'" >
   <td> {{ order.customer.name }} , {{ order.customer.id }} </td>
</tr>

<!-- result:
All customers list:
foo 10
bar 20
baz 30

```
###fuzzy
fuzzy string searching(approximate string matching). [Ream more](http://en.wikipedia.org/wiki/Approximate_string_matching)<br/>
**note:** use fuzzyBy to filter by one property to improve performance<br/>
usage: ```collection | fuzzy: search: caseSensitive[optional]```
```js
$scope.books = [
  { title: 'The DaVinci Code', author: 'F. Scott Fitzgerald' },
  { title: 'The Great Gatsby', author: 'Dan Browns' },
  { title: 'Angels & Demons',  author: 'Dan Louis' },
  { title: 'The Lost Symbol',  author: 'David Maine' },
  { title: 'Old Man\'s War',   author: 'Rob Grant' }
];
```
```html
<input type="text" ng-model="search" placeholder="search book" />
<li ng-repeat="book in books | fuzzy: search">
  {{ book.title }}
</li>
<!--case sensitive-->
<li ng-repeat="book in books | fuzzy: search: true">
  {{ book.title }}
</li>
```
###fuzzyby
fuzzy string searching(approximate string matching) by property(nested to). [Ream more](http://en.wikipedia.org/wiki/Approximate_string_matching)<br/>
usage: ```collection | fuzzyBy: 'property': search: caseSensitive[optional]```
```js
$scope.books = [
  { title: 'The DaVinci Code' },
  { title: 'The Great Gatsby' },
  { title: 'Angels & Demons'  },
  { title: 'The Lost Symbol'  },
  { title: 'Old Man\'s War'   }
];
```
```html
<input type="text" ng-model="search" placeholder="search by title" />
<li ng-repeat="book in books | fuzzyBy: 'title': search">
  {{ book.title }}
</li>
<!--case sensitive-->
<li ng-repeat="book in books | fuzzyBy: 'title': search: true">
  {{ book.title }}
</li>
```
###groupby
Create an object composed of keys generated from the result of running each element of a collection,<br/>
each key is an array of the elements.

```js
$scope.players = [
  {name: 'Gene', team: 'alpha'},
  {name: 'George', team: 'beta'},
  {name: 'Steve', team: 'gamma'},
  {name: 'Paula', team: 'beta'},
  {name: 'Scruath', team: 'gamma'}
];
```
```html
<ul ng-repeat="(key, value) in players | groupBy: 'team'" >
  Group name: {{ key }}
  <li ng-repeat="player in value">
    player: {{ player.name }} 
  </li>
</ul>
<!-- result:
  Group name: alpha
    * player: Gene
  Group name: beta
    * player: George
    * player: Paula
  Group name: gamma
    * player: Steve
    * player: Scruath
```

###where
comparison for each element in a collection to the given properties object,<br/>
returning an array of all elements that have equivalent property values.
```js
  $scope.collection = [
    { id: 1, name: 'foo' },
    { id: 1, name: 'bar' },
    { id: 2, name: 'baz' }
  ]
```
```html
<tr ng-repeat="obj in collection | where:{id: 1}">
  {{ obj.name }}
</tr>
<!-- result: 
  foo
  bar
-->

<tr ng-repeat="obj in collection | where:{id: 1, name: 'foo'}">
  {{ obj.name }}
</tr>
<!-- result:
  foo
  -->
```
###omit
filter collection by expression.<br/>
usage: ```collection | omit: expression```<br/>
**example 1:**
```js
$scope.mod2 = function(elm) {
  return !(elm % 2);
}
```
```html
<tr ng-repeat="num in [1,2,3,4,5,6] | omit: mod2">
  {{ num }},
</tr>
<!--result
2, 4, 6
```
**example 2:**
```js
$scope.collection = [
  { id: 1, user: { name: 'foo' } },
  { id: 2, user: { name: 'bar' } },
  { id: 3, user: { name: 'baz' } }
]
```
```html
<tr ng-repeat="obj in collection | omit:'id > 1 && user.name.indexOf(\'b\') !== -1'">
  id: {{ obj.id }}, name: {{ obj.user.name }}
</tr>
<!--result:
id: 2, name: bar 
id: 3, name: baz
```
###remove
Returns a new collection of removed elements.
```js
$scope.foo = { name: 'foo' };
$scope.collection = [
  { name: 'bar' },
  $scope.foo,
  null, 1
];
```
```html
<tr ng-repeat="obj in collection | remove: foo: null: 1">
  {{ obj }}
</tr>
<!-- result:
  { "name": "bar" }
```
###remove-with
comparison for each element in a collection to the given properties object,<br/>
returning an array without all elements that have equivalent property values.
```js
  $scope.collection = [
    { id: 1, name: 'foo' },
    { id: 1, name: 'bar' },
    { id: 2, name: 'baz' }
  ]
```
```html
<tr ng-repeat="obj in collection | removeWith:{ id: 1 }">
  {{ obj.name }}
</tr>
<!-- result: 
  baz
-->

<tr ng-repeat="obj in collection | removeWith:{ id: 1, name: 'foo' }">
  {{ obj.name }}
</tr>
<!-- result:
  bar
  baz
```
###searchfield
if you want to use the filter in angular and want to filter for multiple values<br/>
so searchField filter return new collection with property called searchField<br/> 
**support nested properties with dot notation i.e:** ``` collection | searchFiled: 'prop': 'nested.prop' ```
```js
$scope.users = [
  { first_name: 'Sharon', last_name: 'Melendez' },
  { first_name: 'Edmundo', last_name: 'Hepler' },
  { first_name: 'Marsha', last_name: 'Letourneau' }
];
```
```html
<input ng-model="search" placeholder="search by full name"/> 
<th ng-repeat="user in users | searchField: 'first_name': 'last_name' | filter: search">
  {{ user.first_name }} {{ user.last_name }}
</th>
<!-- so now you can search by full name -->
```
###after
get a collection(array or object) and specified count, and returns all of the items
in the collection after the specified count.
```js
$scope.collection = [
    { name: 'foo' },
    { name: 'bar' },
    { name: 'baz' },
    { name: 'zap' },
  ];
```
```html
<tr ng-repeat="col in collection | after:2">
  {{ col.name }}
</tr>
<!--result:
  baz
  zap
-->

```
###afterWhere
get a collection and properties object, and returns all of the items, 
in the collection after the first that found with the given properties, including it.
```js
$scope.orders = [
  { id: 1, customer: { name: 'foo' }, date: 'Tue Jul 15 2014' },
  { id: 2, customer: { name: 'foo' }, date: 'Tue Jul 16 2014' },
  { id: 3, customer: { name: 'foo' }, date: 'Tue Jul 17 2014' },
  { id: 4, customer: { name: 'foo' }, date: 'Tue Jul 18 2014' },
  { id: 5, customer: { name: 'foo' }, date: 'Tue Jul 19 2014' }
];
```
```html
<tr ng-repeat="order in orders | afterWhere:{ date: 'Tue Jul 17 2014' }">
  order: {{ order.id }}, {{ order.date }}
</tr>
<!--result:
  order: 3, Tue Jul 17 2014
  order: 4, Tue Jul 18 2014
  order: 5, Tue Jul 19 2014
-->
```

###before
get a collection(array or object) and specified count, and returns all of the items
in the collection before the specified count.
```js
$scope.collection = [
    { name: 'foo' },
    { name: 'bar' },
    { name: 'baz' },
    { name: 'zap' },
  ];
```
```html
<tr ng-repeat="col in collection | before:3">
  {{ col.name }}
</tr>
<!--result:
  foo
  bar
-->

```

###beforeWhere
get a collection and properties object, and returns all of the items, 
in the collection before the first that found with the given properties, including it.
```js
$scope.orders = [
  { id: 1, customer: { name: 'foo' }, date: 'Tue Jul 15 2014' },
  { id: 2, customer: { name: 'foo' }, date: 'Tue Jul 16 2014' },
  { id: 3, customer: { name: 'foo' }, date: 'Tue Jul 17 2014' },
  { id: 4, customer: { name: 'foo' }, date: 'Tue Jul 18 2014' },
  { id: 5, customer: { name: 'foo' }, date: 'Tue Jul 19 2014' }
];
```
```html
<tr ng-repeat="order in orders | beforeWhere:{ date: 'Tue Jul 17 2014' }">
  order: {{ order.id }}, {{ order.date }}
</tr>
<!--result:
  order: 1, Tue Jul 15 2014
  order: 2, Tue Jul 16 2014
  order: 3, Tue Jul 17 2014
-->
```

###reverse collection
Reverse the order of the elements in a collection

```js
$scope.users = [
  { id: 1, name: 'bazzy' },
  { id: 2, name: 'dazzy' },
  { id: 3, name: 'lazzy' }
];
```
```html
<tr ng-repeat="user in users | reverse">
  user: {{ user.id }}, {{ user.name }}
</tr>
<!--result:
  user: 3, lazzy
  user: 2, dazzy,
  user: 1, bazzy
-->
```

###isempty
get collection or string and return if it empty[Bollean]

```html
<tr ng-repeat="order in orders" ng-hide="orders | isEmpty">
<!-- ..... -->
</tr>
<!--some replacer msg-->
<tr ng-show="orders | isEmpty">
  no content to show
</tr>
```

#String

###ucfirst

ucfirstFilter get string as parameter and return it capitalized

```html
<p> {{ 'foo bar baz' | ucfirst }}</p>

<!--
result:
Foo Bar Baz
-->
```

###uriencode
get string as parameter and return encoded uri

```html
<a ng-href="http://domain.com/fetch/{{ data.name | uriEncode }}">Link</a>
```

###removespaces
remove spaces from string, replace with "-" or given argument

```html
<a ng-href="http://domain.com/fetch/{{ 'some string with spaces' | removeSpaces }}">Link</a>
<!--replace with given argument-->
<a ng-href="http://domain.com/fetch/{{ 'some string with spaces' | removeSpaces:'=' }}">Link</a>
<!--
result:
<a ng-href="http://domain.com/fetch/some-string-with-spaces">Link</a>

<a ng-href="http://domain.com/fetch/some=string=with=spaces">Link</a>
-->
```
###startswith
return whether string starts with the starts parameter.<br/>
usage: ```string | startWith: 'start': case-sensitive[optional]```<br/>
```html
 {{ 'Lorem ipsum' | startWith: 'lorem' }}
 {{ 'Lorem Ipsum' | startWith: 'lorem': true }}
 <!--result:
  true
  false
```
###endswith
return whether string ends with the ends parameter.<br/>
usage: ```string | endsWith: 'ends': case-sensitive[optional]```<br/>
```html
 {{ 'image.JPG' | endstWith: '.jpg' }}
 {{ 'image.JPG' | startWith: '.jpg': true }}
 <!--result:
  true
  false
```
###striptags
strip out html tags from string<br/>
**Important: this filter jobs it's not to replace ng-bind-html directive, it's only for tiny plain text

```js
$scope.text = '<p class="paragraph">Lorem Ipsum is simply dummy text of the printing...</p>';
```
```html
<p>{{ text | stripTags }}</p>
<!--result: 
Lorem Ipsum is simply dummy text of the printing...
-->
```
###stringular
get string with {n} and replace match with enumeration values

```html
<p>{{ 'lorem {0} dolor {1} amet' | stringular:'ipsum':'sit' }}</p>
<p>{{ '{3} {0} dolor {1} amet' | stringular:'ipsum':'sit':null:'lorem' }}</p>

<!-- result: 
<p>lorem ipsum dolor sit amet</p>
<p>lorem ipsum dolor sit amet</p>
-->

<p>{{ 'lorem {0} dolor sit amet' | stringular }}<p>
<!--result:
<p>lorem {0} dolor sit amet</p>
```
###truncate
truncates a string given a specified length, providing a custom string to denote an omission.<br/>
usage: ``` | truncate: [length]: [suffix-optional]: [preserve-optinal]```<br/>
```js
$scope.text = 'lorem ipsum dolor sit amet';
```
```html
<!--should not cut words in the middle if preserve is true-->
<p>{{ text | truncate: 7: '...': true }}</p>

<p>{{ text | truncate: 13: '...' }}</p>

<!--result:
lorem ipsum...
lorem ipsum d...
```
###reverse string
Reverses a string
```js
$scope.text = 'lorem ipsum dolor sit amet';
```
```html
<p>{{ text | reverse }}
<!--result:
tema tis rolod muspi merol
```

#Math

###max

maxFilter find and return the largest number in a given array

```html
<p> {{ [1,2,3,4,7,8,9] | max }}</p>

<!--
result:
9
-->
```

###min

minFilter find and return the lowest number in a given array

```html
<p> {{ [1,2,3,4,7,8,9] | min }}</p>

<!--
result:
1
-->
```
