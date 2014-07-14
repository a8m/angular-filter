#Angular-filter

##Table of contents:
- [Collection](#collection)
  - [concat](#concat)
  - [unique](#unique)
  - [isEmpty](#isempty)
- [String](#string)
  - [ucfirst](#ucfirst)
  - [uriEncode](#uriencode)
  - [removeSpaces](#removespaces)
  - [stripTags](#striptags)
- [Math](#math)
  - [min](#min)
  - [max](#max)


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
get collection and filter duplicate members.
if filter get a property(nested to) as argument it's filter by this property as unique identifier

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

###isempty
get collection or string and return if it empty

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
<!--
<p>Lorem Ipsum is simply dummy text of the printing...</p>
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
