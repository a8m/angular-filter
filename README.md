# Angular-filter &nbsp; [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url] [![License][license-image]][license-url]
Bunch of useful filters for AngularJS *(with no external dependencies!)*

<h3 align="center">
<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="50" alt="angular pipes"><br/>
 Angular 2 version is now available: <a href="https://github.com/a8m/ng-pipes">ng-pipes</a>
 </h3>

## Table of contents:
- [![Gitter][gitter-image]][gitter-url]
- [Get Started](#get-started)
- [Common Questions](https://github.com/a8m/angular-filter/wiki/Common-Questions)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [TODO](#todo)
- [Collection](#collection)
  - [after](#after)
  - [afterWhere](#afterwhere)
  - [before](#before)
  - [beforeWhere](#beforewhere)
  - [concat](#concat)
  - [contains](#contains)
  - [countBy](#countby)
  - [chunkBy](#chunkby)
  - [defaults](#defaults)
  - [every](#every)
  - [filterBy](#filterby)
  - [first](#first)
  - [flatten](#flatten)
  - [fuzzy](#fuzzy)
  - [fuzzyBy](#fuzzyby)
  - [groupBy](#groupby)
  - [isEmpty](#isempty)
  - [join](#join)
  - [last](#last)
  - [map](#map)
  - [omit](#omit)
  - [pick](#pick)
  - [pluck](#pluck)
  - [range](#range)
  - [reverse](#reverse)
  - [remove](#remove)
  - [removeWith](#removewith)
  - [searchField](#searchfield)
  - [some](#contains)
  - [toArray](#toarray)
  - [unique](#unique)
  - [where](#where)
  - [xor](#xor)
- [String](#string)
  - [endsWith](#endswith)
  - [latinize](#latinize)
  - [repeat](#repeat)
  - [reverse](#reverse-1)
  - [slugify](#slugify)
  - [split](#split)
  - [startsWith](#startswith)
  - [stripTags](#striptags)
  - [stringular](#stringular)
  - [match](#match)
  - [phoneUS](#phoneus)
  - [test](#test)
  - [trim](#trim)
  - [ltrim](#ltrim)
  - [rtrim](#rtrim)
  - [truncate](#truncate)
  - [ucfirst](#ucfirst)
  - [uriEncode](#uriencode)
  - [uriComponentEncode](#uricomponentencode)
  - [wrap](#wrap)
- [Math](#math)
  - [min](#min)
  - [max](#max)
  - [abs](#abs)
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

## Get Started
**(1)** You can install angular-filter using 4 different methods:
  - clone & [build](#Contributing) this repository
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
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.0/angular.min.js"></script>
    <script src="bower_components/angular-filter/dist/angular-filter.min.js"></script>
    ...
    <script>
        var myApp = angular.module('myApp', ['angular.filter']);

    </script>
    ...
</body>
</html>
```

## Collection

### concat

Concatenates an array/object into another one.


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

### unique
Remove duplicates from an array/object.<br/>
If a string is provided, it will filter out duplicates using the provided expression.<br/>
**Usage:** ```collection | unique: 'property' ```<br/>
**aliases:** uniq
```js
function MainController ($scope) {
  $scope.orders = [
    { id:1, customer: { name: 'John', id: 10 } },
    { id:2, customer: { name: 'William', id: 20 } },
    { id:3, customer: { name: 'John', id: 10 } },
    { id:4, customer: { name: 'William', id: 20 } },
    { id:5, customer: { name: 'Clive', id: 30 } }
  ];
}
```
Ex: Filter by customer.id
```html
<th>Customer list:</th>
<tr ng-repeat="order in orders | unique: 'customer.id'" >
   <td> {{ order.customer.name }} , {{ order.customer.id }} </td>
</tr>

<!-- result:
All customers list:
John 10
William 20
Clive 30

```
### filterBy
Filter a collection by a specific property.<br/>
**Usage:** ```collection | filterBy: [prop, nested.prop, etc..]: search: strict[optional]```<br/>
**Note:** You can even use compound properties (e.g: ```|filterBy: [property + property]: model```)<br/>

```js
$scope.users = [
  { id: 1, user: { first_name: 'Rob', last_name: 'John',  mobile: 4444 } },
  { id: 2, user: { first_name: 'John', last_name: 'Wayne',  mobile: 3333 } },
  { id: 3, user: { first_name: 'Rob', last_name: 'Johansson',  mobile: 2222 } },
  { id: 4, user: { first_name: 'Mike', last_name: 'Terry',  mobile: 1111 } }
];
```
Return users whose id is 1
```html
<!--search only by id -->
<th ng-repeat="user in users | filterBy: ['id']: 1">
  {{ user.id }} : {{ user.first_name }} {{ user.last_name }}
</th>
<!--result:
  1: Rob John
-->

```
Return users whose first name or last name is 'John' (uses nested properties).
```html
<!--search by first_name and last_name -->
<th ng-repeat="user in users | filterBy: ['user.first_name', 'user.last_name']: 'John'">
  {{ user.first_name }} {{ user.last_name }}
</th>
<!--result:
  1: Rob John
  2: John Wayne
-->

```
Return users whose full name is
```html
<!--search by full name -->
<th ng-repeat="user in users | filterBy: ['user.first_name + user.last_name']: 'Rob Joh'">
  {{ user.id }}: {{ user.first_name }} {{ user.last_name }}
</th>
<!--result:
  1: Rob John
  3: Rob Johannson
-->
```
### first
Gets the first element(s) of a collection.<br/>
If an expression is provided, it will only return elements whose expression is truthy.<br/>
***Usage:*** See below <br/>

```js
$scope.users = [
  { id: 1, name: { first: 'John', last: 'Wayne' } },
  { id: 2, name: { first: 'Mike', last: 'Johannson' } },
  { id: 3, name: { first: 'William', last: 'Kyle' } },
  { id: 4, name: { first: 'Rob', last: 'Thomas' } }
];
```
Returns the first user.
```html
{{ users | first }}
<!--result:
{ id: 1, name: { first: 'John', last: 'Wayne' } }
-->

```
Returns the first user whose first name is 'Rob' and last name is 'Thomas'
```html
<!-- collection | first: expression -->
{{ users | first: 'name.first === \'Rob\' && name.last === \'Thomas\'' }}
<!--result:
[ { id: 4, name: { first: 'Rob', last: 'Thomas' } } ]
-->

```
Return the first two users
```html
<!-- collection | first: n -->
<th ng-repeat="user in users | first: 2">
  {{ user.name.first }}
</th>
<!--result:
John
Mike
-->

```
Return the first two users with even id
```html
<!-- collection | first: n: expression -->
<th ng-repeat="user in users | first: 2: '!(id%2)'">
  {{ user.name }}
</th>
<!--result:
Mike
Rob
```
### last
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
[ { id: 4, name: { first: 'lol', last: 'bar' } } ]
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
### flatten
Flattens a nested array (the nesting can be to any depth).<br/>
If you pass shallow, the array will only be flattened a single level<br/>
**Usage:** ```collection | flatten: shallow[optional]```
```js
$scope.weirdArray = [[], 1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, [12, [[[[[13], [[[[14, 15]]]]]]]]]]]]];
```
```html
<th ng-repeat="elm in wierdArray | flatten">
 {{ elm }},
</th>
<!--result:
1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
```

### join
Joins the contents of a collection into a string.<br/>
By default, it will join elements with a *single space*, but you can provide your own delimiter.

**Usage:** ```collection | join:', '```

Example:

```js
$scope.names = ['John', 'Sebastian', 'Will', 'James'];
```

```html
<p>{{ names | join:', ' }}</p>
<!-- Will print "John, Sebastian, Will, James" -->

```


### fuzzy
fuzzy string searching(approximate string matching). [Read more](http://en.wikipedia.org/wiki/Approximate_string_matching)<br/>
**note:** use fuzzyBy to filter by one property to improve performance<br/>
**Usage:** ```collection | fuzzy: search: caseSensitive[optional]```
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
### fuzzyBy
fuzzy string searching(approximate string matching) by property(nested to). [Read more](http://en.wikipedia.org/wiki/Approximate_string_matching)<br/>
**Usage:** ```collection | fuzzyBy: 'property': search: caseSensitive[optional]```
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
### groupBy
Create an object composed of keys generated from the result of running each element of a collection,<br/>
each key is an array of the elements.<br/>
**Usage:** ```(key, value) in collection | groupBy: 'property'``` or ```... | groupBy: 'nested.property'```
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
<ul>
  <li ng-repeat="(key, value) in players | groupBy: 'team'">
    Group name: {{ key }}
    <ul>
      <li ng-repeat="player in value">
        player: {{ player.name }}
      </li>
    </ul>
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
### countBy
Create an object composed of keys generated from the result of running each element of a collection,<br/>
each key is the count of objects in each group<br/>
**Usage:** ```(key, value) in collection | countBy: 'property'``` or ```... | countBy: 'nested.property'```
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
<li ng-repeat="(key, value) in players | countBy: 'team'" >
  Group name: {{ key }}, length: {{ value }}
</li>
<!-- result:
  Group name: alpha, length: 1
  Group name: beta, length: 2
  Group name: gamma, length: 2
```
### chunkBy
Collect data into fixed-length chunks or blocks
**Usage:** ```(key, value) in collection | chunkBy: 'n': fill-value(optional)```
```js
$scope.array = [1, 2, 3, 4, 5, 6];
```
```html
<li ng-repeat="block in array | chunkBy: 2" >
  Block: {{ block }}
</li>
<!-- result:
  Block: [1, 2]
  Block: [3, 4]
  Block: [5, 6]
-->
<-- Example with fill value -->
<li ng-repeat="block in array | chunkBy: 4: 0" >
  Block: {{ block }}
</li>
<!-- result:
  Block: [1, 2, 3, 4]
  Block: [5, 6, 0, 0]
```

### defaults
`defaultsFilter` allows to specify a default fallback value for properties that resolve to undefined.<br/>
**Usage:** `col in collection | defaults: fallback`
```js
$scope.orders = [
      { id:1, destination: { zip: 21908 }, name: 'Ariel M' },
      { id:2, name: 'John F' },
      { id:3, destination: { zip: 45841 } },
      { id:4, destination: { zip: 78612 }, name: 'Danno L' },
  ];
$scope.fallback = {
      name: 'Customer name not available',
      destination: { zip: 'Pickup' }
  };
```
```html
<li ng-repeat="order in orders | defaults: fallback">
    <b>id:</b> {{ order.id }},
    <b>name:</b> {{ order.name }},
    <b>shipping address:</b> {{ order.destination.zip }}
</li>
<!--Results:
* id: 1, name: Ariel M, shipping address: 21908
* id: 2, name: John F, shipping address: Pickup
* id: 3, name: Customer name not available, shipping address: 45841
* id: 4, name: Danno L, shipping address: 78612
```
**Note:** `defaultsFilter` change the source object.<br/>
**Why?** if we not change the source object, it's actually means we gonna return **new** object(copy operation)  **each digest cycle**.<br/>
And it will cause adverse memory and performance implications.<br/>
**How to avoid it?** see below
```js
//We copy it once, and it's really cheaper
$scope.ordersWithFallback = angular.copy($scope.orders);
```
```html
<li ng-repeat="order in ordersWithFallback | defaults: fallback">
    <!-- ..... -->
</li>
```
### where
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
### omit
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
### pick
return collection composed of the picked objects(by expression).<br/>
usage: ```collection | pick: expression```<br/>
**example 1:**
```js
$scope.mod2 = function(elm) {
  return !(elm % 2);
}
```
```html
<tr ng-repeat="num in [1,2,3,4,5,6] | pick: mod2">
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

### remove
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
### removeWith
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
### searchField
if you want to use the filter in angular and want to filter for multiple values<br/>
so searchField filter return new collection with property called searchField<br/>
**support nested properties with dot notation i.e:** ``` collection | searchField: 'prop': 'nested.prop' ```
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
### after
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
### afterWhere
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

### before
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

### beforeWhere
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

### reverse
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

### isEmpty
get collection or string and return if it empty[Boolean]

```html
<tr ng-repeat="order in orders" ng-hide="orders | isEmpty">
<!-- ..... -->
</tr>
<!--some replacer msg-->
<tr ng-show="orders | isEmpty">
  no content to show
</tr>
```
### contains
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
### every
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
<th ng-show="{{ collection | every: '!(user.id % 2)' }}">...</th>
<!--result: true
```

### xor
Exclusive or between two collections<br/>
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
### toArray
Convert objects into stable arrays. <br/>
**Usage:** ```object | toArray: addKey[optional]```<br/>
if addKey set to true, the filter also attaches a new property $key to the value containing the original key that was used in the object we are iterating over to reference the property
```html
<th ng-repeat="elm in object | toArray | orderBy: 'property'">
  {{ elm.name }}
</th>
```
### map
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
### pluck
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
### range
Return a new collection from a given length, start, increment, and callback<br/>
By default start is 0, increment is 1, and callback is null.
**Usage:** ```collection | range: length:start:increment:callback```<br/>
```html
[<span ng-repeat="i in [] | range: 3">{{i}},</span>]
<!--result:
[0,1,2,]
-->
```
```html
[<span ng-repeat="i in [] | range: 10:10">{{i}},</span>]
<!--result:
[10,11,12,13,14,15,16,17,18,19,]
-->
```
```html
[<span ng-repeat="i in [] | range: 10:5:2">{{ i }},</span>]
<!--result:
[5, 7, 9, 11, 13, 15, 17, 19, 21, 23]
-->
```
```html
[<span ng-repeat="i in [] | range: 11:4:2">{{ i }},</span>]
<!--result:
[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
-->
```
```js
$scope.double = function(i) {
  return i * 2;
}
```
```html
[<span ng-repeat="i in [] | range: 11:4:2:double">{{ i }},</span>]
<!--result:
[8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]
-->
```

## String

### ucfirst

ucfirstFilter get string as parameter and return it capitalized

```html
<p> {{ 'foo bar baz' | ucfirst }}</p>

<!--
result:
Foo Bar Baz
-->
```

### uriEncode
get string as parameter and return encoded uri

```html
<a ng-href="http://domain.com/fetch/{{ data.name | uriEncode }}">Link</a>
```

### uriComponentEncode
get string as parameter and return encoded uri component

```html
<a ng-href="http://domain.com/fetch/{{ 'Some&strange=chars' | uriComponentEncode }}">Link</a>
```

### slugify
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

### latinize
Remove accents/diacritics from a string

```html
 {{ 'Sòme strÏng with Âccénts' | latinize }}
<!--
result:
  Some strIng with Accents
-->
```
### startsWith
return whether string starts with the starts parameter.<br/>
usage: ```string | startsWith: 'start': case-sensitive[optional]```<br/>
```html
 {{ 'Lorem ipsum' | startsWith: 'lorem' }}
 {{ 'Lorem Ipsum' | startsWith: 'lorem': true }}
 <!--result:
  true
  false
```
### endsWith
return whether string ends with the ends parameter.<br/>
usage: ```string | endsWith: 'ends': case-sensitive[optional]```<br/>
```html
 {{ 'image.JPG' | endsWith: '.jpg' }}
 {{ 'image.JPG' | endsWith: '.jpg': true }}
 <!--result:
  true
  false
```
### stripTags
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
### stringular
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

### phoneUS
Format a string or a number into a us-style phone number  
```html
<p>{{ 1234567890 | phoneUS }}</p>

<!--result:
<p>(123) 456-7890</p>
```

### truncate
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
### split
truncates a string given a specified length, providing a custom string to denote an omission.<br/>
usage: ``` | split: [delimiter]: [skip-optional]```<br/>
```js
$scope.text = 'lorem ipsum dolor sit amet';
```
```html

<p>{{ text | split: ' ' }}</p>

<p>{{ text | split: ' ': 2}}</p>

<!--result:
['lorem', 'ipsum', 'dolor', 'sit', 'amet']
['lorem ipsum dolor', 'sit', 'amet']
```
### reverse
Reverses a string
```js
$scope.text = 'lorem ipsum dolor sit amet';
```
```html
<p>{{ text | reverse }}</p>
<!--result:
tema tis rolod muspi merol
```
### wrap
Wrap a string with another string<br/>
usage: ```string | wrap: string: string[optional]```
```html
<p>{{ 'foo' | wrap: '/' }}</p>
<p>{{ 'foo' | wrap: '{{': '}}' }}</p>
<!--result:
/foo/
{{foo}}
```
### trim
Strip whitespace (or other characters) from the beginning and end of a string<br/>
usage: ```string | trim: chars[optional]```
```html
<p>{{ '    foo   ' | trim }}</p>
<p>{{ 'foobarfoo' | trim: 'foo' }}
<!--result:
foo
bar
```
### ltrim
Strip whitespace (or other characters) from the beginning of a string<br/>
usage: ```string | ltrim: chars[optional]```
```html
<p>{{ 'barfoobar' | ltrim: 'bar' }}
<!--result:
foobar
```
### rtrim
Strip whitespace (or other characters) from the end of a string<br/>
usage: ```string | rtrim: chars[optional]```
```html
<p>{{ 'barfoobar' | rtrim: 'bar' }}
<!--result:
barfoo
```
### repeat
Repeats a string n times<br/>
**Usage:** ```string | repeat: n: separator[optional]```
```html
<p>{{ 'foo' | repeat: 3: '-' }}</p>
<!--repeat:
foo-foo-foo
```
### test
Test if a string match a pattern<br/>
**Usage:** ```string | test: pattern: flag[optional]```
```html
<p>{{ '15/12/2003' | test: '^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$': 'i' }}</p>
<p>{{ '0123456' | test: '\\D': 'i' }}</p>
<!--result:
true
true
```
### match
Return an array of matched element in a string<br/>
**Usage:** ```string | match: pattern: flag[optional]```
```html
<p>{{ '15/12/2003' | match: '\\d+': 'g' }}</p>
<!--result:
['15', '12', '2003']
```

## Math

### max
max find and return the largest number in a given array.
if an `expression` is provided, will return max value by expression.
**Usage:** ```array | max: expression[optional]```
```js
$scope.users = [
  { user: { score: 988790 } },
  { user: { score: 123414 } },
  { user: { rank : 988999 } },
  { user: { score: 987621 } }
];
```
```html
<p> {{ [1,2,3,4,7,8,9] | max }}</p>
<p> {{ users | max: 'user.score || user.rank' }}</p>
<!--
result:
* 9
* { user: { rank : 988999 } }
```

### min
min find and return the lowest number in a given array.
if an `expression` is provided, will return min value by expression.
**Usage:** ```array | min: expression[optional]```
```js
$scope.users = [
  { user: { score: 988790 } },
  { user: { score: 123414 } },
  { user: { score: 987621 } }
];
```
```html
<p> {{ [1,2,3,4,7,8,9] | min }}</p>
<p> {{ users | min: 'user.score' }}</p>
<!--
result:
* 1
* { user: { score: 123414 } }
```
### abs
Returns the absolute value of a number
**Usage:** ```number | string```
```html
<div ng-repeat="val in [-2.2, 1.3, '-3.4', '4.5']">The absolute value of {{val}} is {{val | abs}}</div>
<!--
result:
* The absolute value of -1.2 is 1.2
* The absolute value of 2.3 is 2.3
* The absolute value of -3.4 is 3.4
* The absolute value of '4.5' is 4.5
```
### percent
Percentage between two numbers<br/>
**Usage:** ``` number | percent: total: round[optional]```, round by default false.
```html
<p>{{ 23 | percent: 500 }}</p>
<p>{{ 23 | percent: 500: true }}</p>
<!--result:
4.6
4
```
### radix
Converting decimal numbers to different bases(radix)<br/>
**Usage:** ```number | radix: base```
```html
<p>{{ 8 | radix: 2 }}</p>
<p>{{ 32586 | radix: 16 }}</p>
<!--result:
1000
7F4A
```
### sum
Sum up all values within an array<br/>
**Usage:** ```array | sum: initial-value[optional]```
```html
{{ [2,3,5] | sum }}
{{ [2,3,5] | sum: 10 }}
<!--result
10
20
```
### degrees
Converts radians into degrees<br/>
**Usage:** ```radians | degrees: round-to-decimal```,
```html
<p>{{ 0.785398 | degrees: 0 }}</p>
<p>{{ -1.57 | degrees: 3 }}</p>
<!--result
45
-89.954
```
### radians
Converts degrees into radians<br/>
**Usage:** ```degrees | radians: round-to-decimal```,
```html
<p>{{ 45 | radians: 2 }}</p>
<p>{{ 180 | radians: 5 }}</p>
<!--result
0.79
3.14159
```
### shortFmt
Converts numbers into formatted display<br/>
**Usage:** ```number | shortFmt: round-to-decimal```,
```html
<p>{{ 45000 | shortFmt: 0 }}</p>
<p>{{ 18234822 | shortFmt: 1 }}</p>
<!--result
45 k
18.2 m
```
### byteFmt
Converts bytes into formatted display<br/>
**Usage:** ```number | byteFmt: round-to-decimal```,
```html
<p>{{ 1998 | byteFmt: 2 }}</p>
<p>{{ 1339234901 | byteFmt: 5 }}</p>
<!--result
1.95 KB
1.24726 GB
```
### kbFmt
Converts kilobytes into formatted display<br/>
**Usage:** ```number | kbFmt: round-to-decimal```,
```html
<p>{{ 1024 | kbFmt: 0 }}</p>
<p>{{ 1049901 | kbFmt: 5 }}</p>
<!--result
1 MB
1.00126 GB

```
## Boolean
>Used for boolean expression in chaining filters

### isGreaterThan
**aliases:** `>`
```html
<div ng-show="{{ array | map | sum | isGreaterThan: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | >: num }}"></div>
```

### isGreaterThanOrEqualTo
**aliases:** `>=`
```html
<div ng-show="{{ array | map | sum | isGreaterThanOrEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | >=: num }}"></div>
```

### isLessThan
**aliases:** `<`
```html
<div ng-show="{{ array | map | sum | isLessThan: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | <: num }}"></div>
```

### isLessThanOrEqualTo
**aliases:** `<=`
```html
<div ng-show="{{ array | map | sum | isLessThanOrEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | <=: num }}"></div>
```

### isEqualTo
**aliases:** `==`
```html
<div ng-show="{{ array | map | sum | isEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | ==: num }}"></div>
```

### isNotEqualTo
**aliases:** `!=`
```html
<div ng-show="{{ array | map | sum | isNotEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | !=: num }}"></div>
```

### isIdenticalTo
**aliases:** `===`
```html
<div ng-show="{{ array | map | sum | isIdenticalTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | ===: num }}"></div>
```

### isNotIdenticalTo
**aliases:** `!==`
```html
<div ng-show="{{ array | map | sum | isNotIdenticalTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | !==: num }}"></div>
```
## Changelog
### 0.5.7
* fix issue #119

### 0.5.6
* fix issue #145

### 0.5.5
* add `range` and `chunk-by` filters
* fix issue #139

### 0.5.4
* add `match` and `test` filters

### 0.5.3
* add `latinize` filter

### 0.5.1
* `min` and `max` can get a property as an argument.
* improve `slugify` filter.
* refactor `filterWatcher`(memoize), now it works like a charm.
* refactor `groupBy` now it can get be chain with other filters

### 0.4.9
* fix issue #38 with [reverseFilter](#reverse)

### 0.4.8
* add [defaultsFilter](#defaults)
* improve docs, tests

### 0.4.7
* add [condition filters](#Boolean) set.
<br/>
<br/>

## TODO
- Add project website on branch gh-pages, see **[Github-help](https://help.github.com/articles/creating-project-pages-manually)**

## Contributing
* If you planning add some feature please **create issue before**.
* Don't forget about tests.

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

[npm-image]: https://img.shields.io/npm/v/angular-filter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/angular-filter
[travis-image]: https://img.shields.io/travis/a8m/angular-filter.svg?style=flat-square
[travis-url]: https://travis-ci.org/a8m/angular-filter
[coveralls-image]: https://img.shields.io/coveralls/a8m/angular-filter.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/a8m/angular-filter
[license-image]: http://img.shields.io/npm/l/angular-filter.svg?style=flat-square
[license-url]: LICENSE
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/a8m/angular-filter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
