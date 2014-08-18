#Angular-filter &nbsp; [![Build Status](https://travis-ci.org/a8m/angular-filter.svg?branch=master)](https://travis-ci.org/a8m/angular-filter)  [![Coverage Status](https://coveralls.io/repos/a8m/angular-filter/badge.png?branch=master)](https://coveralls.io/r/a8m/angular-filter?branch=master)
>Bunch of useful filters for angularJS, **v0.4.0**

##Table of contents:
- [Get Started](#get-started)
- [Development](#development)
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
###filterby
Filter by specific properties and avoid the rest<br/>
**Usage:** ```collection | filterBy: [prop, nested.prop, etc..]: search```<br/>
**Note:** can create custom field to search(e.g: ```|filterBy: [property + property]: model```)<br/>
```js
$scope.users = [
  { id: 1, user: { first_name: 'foo', last_name: 'bar',  mobile: 4444 } },
  { id: 2, user: { first_name: 'bar', last_name: 'foo',  mobile: 3333 } },
  { id: 3, user: { first_name: 'foo', last_name: 'baz',  mobile: 2222 } },
  { id: 4, user: { first_name: 'baz', last_name: 'foo',  mobile: 1111 } }
];
```
```html
<!--search only by id -->
<th ng-repeat="user in users | filterBy: ['id']: 1">
  {{ user.id }} : {{ user.first_name }} {{ user.last_name }}
</th>
<!--result:
  1: foo bar
```
```html
<!--search by first_name and last_name -->
<th ng-repeat="user in users | filterBy: ['user.first_name', 'user.last_name']: 'bar'">
  {{ user.first_name }} {{ user.last_name }}
</th>
<!--result:
  1: foo bar
  2: bar foo
```
```html
<!--search by full name -->
<th ng-repeat="user in users | filterBy: ['user.first_name + user.last_name']: 'foo ba'">
  {{ user.id }}: {{ user.first_name }} {{ user.last_name }}
</th>
<!--result:
  1: foo bar
  3: foo baz
```
###first
Gets the first element or first n elements of a collection,<br/>
if expression is provided, is returns as long the expression return truthy<br/>
***Usage:*** See below <br/>
```js
$scope.users = [
  { id: 1, name: { first: 'foo', last: 'bar' } },
  { id: 2, name: { first: 'baz', last: 'bar' } },
  { id: 3, name: { first: 'bar', last: 'bar' } },
  { id: 4, name: { first: 'lol', last: 'bar' } }
];
```
```html
{{ users | first }}
<!--result:
{ id: 1, name: { first: 'foo', last: 'bar' } }
```

```html
<!-- collection | first: expression -->
{{ users | first: 'name.first === \'lol\' && name.last === \'bar\'' }}
<!--result:
{ id: 4, name: { first: 'lol', last: 'bar' } }
```

```html
<!-- collection | first: n -->
<th ng-repeat="user in users | first: 2">
  {{ user.name }}
</th>
<!--result:
foo
baz
```
```html
<!-- collection | first: n: expression -->
<th ng-repeat="user in users | first: 2: '!(id%2)'">
  {{ user.name }}
</th>
<!--result:
baz
lol
```
###last
Gets the last element or last n elements of a collection,<br/>
if expression is provided, is returns as long the expression return truthy<br/>
***Usage:*** See below <br/>
```js
$scope.users = [
  { id: 1, name: { first: 'foo', last: 'bar' } },
  { id: 2, name: { first: 'baz', last: 'bar' } },
  { id: 3, name: { first: 'bar', last: 'bar' } },
  { id: 4, name: { first: 'lol', last: 'bar' } }
];
```
```html
{{ users | last }}
<!--result:
{ id: 4, name: { first: 'lol', last: 'bar' } }
```

```html
<!-- collection | last: expression -->
{{ users | last: 'name.last === \'bar\'' }}
<!--result:
{ id: 4, name: { first: 'lol', last: 'bar' } }
```

```html
<!-- collection | last: n -->
<th ng-repeat="user in users | last: 2">
  {{ user.name }}
</th>
<!--result:
bar
lol
```
```html
<!-- collection | last: n: expression -->
<th ng-repeat="user in users | last: 2: '!(id%2)'">
  {{ user.name }}
</th>
<!--result:
baz
lol
```

###fuzzy
fuzzy string searching(approximate string matching). [Read more](http://en.wikipedia.org/wiki/Approximate_string_matching)<br/>
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
each key is an array of the elements.<br/>
**usage:** ```(key, value) in collection | groupBy: 'property'``` or ```... | groupBy: 'nested.property'```
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
###countby
Create an object composed of keys generated from the result of running each element of a collection,<br/>
each key is the count of objects in each group<br/>
**usage:** ```(key, value) in collection | countBy: 'property'``` or ```... | countBy: 'nested.property'```
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
<ul ng-repeat="(key, value) in players | countBy: 'team'" >
  Group name: {{ key }}, length: {{ value }}
</ul>
<!-- result:
  Group name: alpha, length: 1
  Group name: beta, length: 2
  Group name: gamma, length: 2
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
return collection without the omitted objects(by expression).<br/>
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
1, 3, 5
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
id: 1, name: foo
```
###pick
return collection composed of the picked objects(by expression).<br/>
usage: ```collection | pick: expression```<br/>
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
<tr ng-repeat="obj in collection | pick:'id > 1 && user.name.indexOf(\'b\') !== -1'">
  id: {{ obj.id }}, name: {{ obj.user.name }}
</tr>
<!--result:
id: 2, name: bar
id:3, name: baz
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
###contains
Checks if given expression(or value) is present in one or more object in the collection<br/>
**Usage:** ```collection | contains: 'expression'```<br/>
**Aliases:** some<br/>
example 1:
```js
$scope.array = [1,2,3,4];
```
```html
<th ng-show="{{ array | contains: 2 }}">...</th>
```
example 2:
```js
$scope.collection = [
  { user: { id: 1, name: 'foo' } },
  { user: { id: 2, name: 'bar' } },
  { user: { id: 3, name: 'baz' } }
];
```
```html
<th ng-show="{{ collection | some: '!(user.id % 2) && user.name.indexOf(\'b\') === 0' }}">...</th>
<!--result: true
```
###every
Checks if given expression(or value) return truthy value for all members of a collection<br/>
**Usage:** ```collection | every: 'expression'```<br/>
example 1:
```js
$scope.array = [1,1,1,1];
```
```html
<th ng-show="{{ array | every: 1 }}">...</th>
<!--result: true
```
example 2:
```js
$scope.collection = [
  { user: { id: 4, name: 'foo' } },
  { user: { id: 6, name: 'bar' } },
  { user: { id: 8, name: 'baz' } }
];
```
```html
<th ng-show="{{ collection | every: !(user.id % 2) }}">...</th>
<!--result: true
```

###xor
Exclusive or between two collection<br/>
**Usage:** ```collection1 | xor: collection2: expression[optional]```<br/>

Example1:
```html
<p ng-repeat="elm in [1,2,3,4] | xor: [2,3,5]">
{{ elm }}
</p>
<!--result:
1 4 5
```
Example2:
```js
$scope.users1 = [
  { id: 0, details: { first_name: 'foo', last_name: 'bar' } },
  { id: 1, details: { first_name: 'foo', last_name: 'baz' } },
  { id: 2, details: { first_name: 'foo', last_name: 'bag' } }
];
$scope.users2 = [
  { id: 3, details: { first_name: 'foo', last_name: 'bar' } },
  { id: 4, details: { first_name: 'foo', last_name: 'baz' } }
];
```
```html
<th ng-repeat="user in users1 | xor: users2">
  {{ user.id }}
</th>
<!--result: 
1 2 3 4 5
-->
<th ng-repeat="user in users1 | xor: users2: 'details.last_name'">
  {{ user.id }}, {{ user.details.first_name }} {{ user.details.last_name }}
</th>
<!--result: 
2, foo bag
```
###toarray 
Convert objects into stable arrays. <br/>
**Usage:** ```object | toArray: addKey[optional]```<br/>
if addKey set to true,the filter also attaches a new property $key to the value containing the original key that was used in the object we are iterating over to reference the property
```html
<th ng-repeat="elm in object | toArray | orderBy: 'property'">
  {{ elm.name }}
</th>
```
###map
Returns a new collection of the results of each expression execution. <br/>
**Usage:** ```collection | map: expression``` <br/>
Example1:
```js
$scope.divide = function(elm) {
  return elm/2
}
```
```html
<th ng-repeat="i in [1, 2, 3, 4, 5] | map: divide">
  {{ i }}
</th>
<!--result: 
0.5, 1, 1.5, 2, 2.5
```
###pluck
Used map
```js
$scope.users = [
  { id:1, user: { name: 'Foo' } },
  { id:1, user: { name: 'Bar' } },
  { id:1, user: { name: 'Baz' } }
];
```
```html
<th ng-repeat="name in users | map: 'user.name' ">
  {{ name }}
</th>
<!--result:
Foo
Bar
Baz
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

###slugify
Transform text into a URL slug. Replaces whitespaces, with dash("-"), or given argument

```html
<a ng-href="http://domain.com/fetch/{{ 'Some string with spaces' | slugify }}">Link</a>
<!--replace with given argument-->
<a ng-href="http://domain.com/fetch/{{ 'Some string with spaces' | slugify:'=' }}">Link</a>
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
 {{ 'image.JPG' | endsWith: '.jpg' }}
 {{ 'image.JPG' | endsWith: '.jpg': true }}
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

<!--should not touch string that shorter than the provided length -->
<p>{{ text | truncate: 50: '...' }}</p>

<!--result:
lorem ipsum...
lorem ipsum d...
lorem ipsum dolor sit amet
```
###reverse string
Reverses a string
```js
$scope.text = 'lorem ipsum dolor sit amet';
```
```html
<p>{{ text | reverse }}</p>
<!--result:
tema tis rolod muspi merol
```
###wrap
Wrap a string with another string<br/>
usage: ```string | wrap: string: string[optional]```
```html
<p>{{ 'foo' | wrap: '/' }}</p>
<p>{{ 'foo' | wrap: '{{': '}}' }}</p>
<!--result:
/foo/
{{foo}}
```
###trim
Strip whitespace (or other characters) from the beginning and end of a string<br/>
usage: ```string | trim: chars[optional]```
```html
<p>{{ '    foo   ' | trim }}</p>
<p>{{ 'foobarfoo' | trim: 'foo' }}
<!--result:
foo
bar
```
###ltrim
Strip whitespace (or other characters) from the beginning of a string<br/>
usage: ```string | ltrim: chars[optional]```
```html
<p>{{ 'barfoobar' | ltrim: 'bar' }}
<!--result:
foobar
```
###rtrim
Strip whitespace (or other characters) from the end of a string<br/>
usage: ```string | rtrim: chars[optional]```
```html
<p>{{ 'barfoobar' | rtrim: 'bar' }}
<!--result:
barfoo
```
###repeat
Repeats a string n times<br/>
usage: ```string | repeat: n: separator[optional]```
```html
<p>{{ 'foo' | repeat: 3: '-' }}</p>
<!--repeat:
foo-foo-foo
```
#Math

###max

max find and return the largest number in a given array

```html
<p> {{ [1,2,3,4,7,8,9] | max }}</p>

<!--
result:
9
-->
```

###min

min find and return the lowest number in a given array

```html
<p> {{ [1,2,3,4,7,8,9] | min }}</p>

<!--
result:
1
```
###percent
Percentage between two numbers<br/>
**Usage:** ``` number | percent: total: round[optional]```, round by default false.
```html
<p>{{ 23 | percent: 500 }}</p>
<p>{{ 23 | percent: 500: true }}</p>
<!--result:
4.6
4
```
#Development
Clone the project: <br/>
```
$ git clone 
$ npm install
$ bower install
```
Run the tests:
```
$ grunt test
```
**Deploy:**<br/>
Run the build task, update version before(bower,package)
```
$ grunt build
$ git tag v0.*.*
$ git push origin master --tags
```
