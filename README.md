#Angular-filter

##Table of contents:
- [Collection](#collection)
  - [concat](#concat)
  - [unique](#unique)
  - [where](#where)
  - [after](#after)
  - [afterWhere](#afterwhere)
  - [before](#before)
  - [beforeWhere](#beforewhere)
  - [isEmpty](#isempty)
- [String](#string)
  - [ucfirst](#ucfirst)
  - [uriEncode](#uriencode)
  - [removeSpaces](#removespaces)
  - [stripTags](#striptags)
  - [stringular](#stringular)
  - [truncate](#truncate)
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
###striptags
strip out html tags from string<br/>
**Important: this filter jobs it's not to replace ng-bind-html directive, it's only for tiny plain text

```js
$scope.text = '<p class="paragraph">Lorem Ipsum is simply dummy text of the printing...</p>';
```
```html
<p>{{ text | stripTags }}</p>
<!--result: 
<p>Lorem Ipsum is simply dummy text of the printing...</p>
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
usage: ``` | filter: [length]: [suffix-optional]: [preserve-optinal]```<br/>
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
-->
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
