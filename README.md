#Angular-filter

##Table of contents:
- [Collection](#collection)
  - [concatFilter](#concat)
  - [uniqueFilter](#unique)
- [String](#string)
  - [ucfirstFilter](#ucfirst)



#Collection

###concat

concat filter, get two mixed(array/object) parameters and return merged collection


```js
function MainController($scope) {
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

###uriEncode
get string as parameter and return encoded uri

```html
<a ng-href="http://domain.com/fetch/{{ data.name | uriEncode }}">Link</a>
```
