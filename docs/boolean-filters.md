# Table Of Contents

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


>Used for boolean expression in chaining filters

###isGreaterThan
**aliases:** `>`
```html
<div ng-show="{{ array | map | sum | isGreaterThan: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | >: num }}"></div>
```

###isGreaterThanOrEqualTo
**aliases:** `>=`
```html
<div ng-show="{{ array | map | sum | isGreaterThanOrEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | >=: num }}"></div>
```

###isLessThan
**aliases:** `<`
```html
<div ng-show="{{ array | map | sum | isLessThan: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | <: num }}"></div>
```

###isLessThanOrEqualTo
**aliases:** `<=`
```html
<div ng-show="{{ array | map | sum | isLessThanOrEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | <=: num }}"></div>
```

###isEqualTo
**aliases:** `==`
```html
<div ng-show="{{ array | map | sum | isEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | ==: num }}"></div>
```

###isNotEqualTo
**aliases:** `!=`
```html
<div ng-show="{{ array | map | sum | isNotEqualTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | !=: num }}"></div>
```

###isIdenticalTo
**aliases:** `===`
```html
<div ng-show="{{ array | map | sum | isIdenticalTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | ===: num }}"></div>
```

###isNotIdenticalTo
**aliases:** `!==`
```html
<div ng-show="{{ array | map | sum | isNotIdenticalTo: num }}"></div>
<!--or: -->
<div ng-show="{{ array | map | sum | !==: num }}"></div>
```
