# Table Of Contents

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
###radix
Converting decimal numbers to different bases(radix)<br/>
**Usage:** ```number | radix: base```
```html
<p>{{ 8 | radix: 2 }}</p>
<p>{{ 32586 | radix: 16 }}</p>
<!--result:
1000
7F4A
```
###sum
Sum up all values within an array<br/>
**Usage:** ```array | sum: initial-value[optional]```
```html
{{ [2,3,5] | sum }}
{{ [2,3,5] | sum: 10 }}
<!--result
10
20
```
###degrees
Converts radians into degrees<br/>
**Usage:** ```radians | degrees: round-to-decimal```,
```html
<p>{{ 0.785398 | degrees: 0 }}</p>
<p>{{ -1.57 | degrees: 3 }}</p>
<!--result
45
-89.954
```
###radians
Converts degrees into radians<br/>
**Usage:** ```degrees | radians: round-to-decimal```,
```html
<p>{{ 45 | radians: 2 }}</p>
<p>{{ 180 | radians: 5 }}</p>
<!--result
0.79
3.14159
```
###shortFmt
Converts numbers into formatted display<br/>
**Usage:** ```number | shortFmt: round-to-decimal```,
```html
<p>{{ 45000 | shortFmt: 0 }}</p>
<p>{{ 18234822 | shortFmt: 1 }}</p>
<!--result
45 k
18.2 m
```
###byteFmt
Converts bytes into formatted display<br/>
**Usage:** ```number | byteFmt: round-to-decimal```,
```html
<p>{{ 1998 | byteFmt: 2 }}</p>
<p>{{ 1339234901 | byteFmt: 5 }}</p>
<!--result
1.95 KB
1.24726 GB
```
###kbFmt
Converts kilobytes into formatted display<br/>
**Usage:** ```number | kbFmt: round-to-decimal```,
```html
<p>{{ 1024 | kbFmt: 0 }}</p>
<p>{{ 1049901 | kbFmt: 5 }}</p>
<!--result
1 MB
1.00126 GB

```
