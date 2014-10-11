#Table Of Contents

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
###startsWith
return whether string starts with the starts parameter.<br/>
usage: ```string | startsWith: 'start': case-sensitive[optional]```<br/>
```html
 {{ 'Lorem ipsum' | startsWith: 'lorem' }}
 {{ 'Lorem Ipsum' | startsWith: 'lorem': true }}
 <!--result:
  true
  false
```
###endsWith
return whether string ends with the ends parameter.<br/>
usage: ```string | endsWith: 'ends': case-sensitive[optional]```<br/>
```html
 {{ 'image.JPG' | endsWith: '.jpg' }}
 {{ 'image.JPG' | endsWith: '.jpg': true }}
 <!--result:
  true
  false
```
###stripTags
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
###reverse
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
