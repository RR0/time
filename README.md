# @rr0/time [![CircleCI](https://dl.circleci.com/status-badge/img/gh/Javarome/edtf/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/Javarome/edtf/tree/main)

Zero-dependency JavaScript API for managing fuzzy dates.

This package implements [EDTF](https://www.loc.gov/standards/datetime/) (levels 0, 1 and 2), which extended over the [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) to add fuzziness, 
and was eventually integrated in [ISO 8601-2019](https://www.iso.org/obp/ui/#iso:std:iso:8601:-1:ed-1:v1:en).

| EDTF           | ISO Standard             |
|----------------|--------------------------|
| Level 0 (2012) | ISO-8601-1 (Basic rules) |
| Level 1 (2016) | ISO-8601-2 (Extensions)  |
| Level 2 (2019) | ISO-8601-2 (Extensions)  |
| Level 3        | ISO-8601-3               |

EDTF dates or components (year, month, day, hour, minute, second) can be created either:
- **programmatically**, like `new level1.Year(1985, true)` to create an uncertain year;
- through **parsing**, like `level1.Year.fromString("1985?")` to instantiate the same uncertain year from an EDTF string.

## Programmatic API

### Components
Each date calendar and time component can be individually instantiated. 
```js
import level0 from "@rr0/time"

const currentYear = level0.Year.newInstance()
const someYear = new level0.Year(1985)
console.log(someYear.value)  // "1985"
```

### Date

You can select the API level you want to use. For example using level 0:
```js
import level0 from "@rr0/time"

const currentDate = level0.Date.newInstance()
const someDate = new level0.Date(1985, 12, 30, 15, 45, 54)
```

## Parsing API
The parsing API allows to build objects above from an EDTF string.

### Components
Each date calendar and time component can be individually instantiated.
```js
import level0 from "@javarome/edtf"

const someYear = level0.Date.fromString("1985")
```

### Date

You can select the API level you want to use. For example using level 0:
```js
import level0 from "@javarome/edtf"

const someDate = level0.Date.fromString("1985-04-12")
```
