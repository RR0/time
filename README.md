# @rr0/time [![CircleCI](https://dl.circleci.com/status-badge/img/gh/RR0/time/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/RR0/time/tree/master)

Zero-dependency JavaScript API for managing fuzzy dates.

This package implements [EDTF](https://www.loc.gov/standards/datetime/) (levels 0, 1 and 2), 
which extended over the [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) standard to add fuzziness, 
and was eventually integrated in [ISO 8601-2019](https://www.iso.org/obp/ui/#iso:std:iso:8601:-1:ed-1:v1:en).

By fuzziness, we mean:
- **uncertainty** (`?`, `X`), like "maybe June 2025"
- **approximation** (`~`), like "around June 2025"
- **both** (`%`), like "maybe around June 2025"

| EDTF           | ISO Standard             | Contents                                                                                                      |
|----------------|--------------------------|---------------------------------------------------------------------------------------------------------------|
| Level 0 (2012) | ISO-8601-1 (Basic rules) | Dates, intervals, but no fuzziness                                                                            |
| Level 1 (2016) | ISO-8601-2 (Extensions)  | Date part fuzziness, open intervals, seasons, big years                                                       |
| Level 2 (2019) | ISO-8601-2 (Extensions)  | Per-component date fuzziness, digits uncertainty, extended seasons w/ quarters, dates sets, exponential years |
| Level 3        | ISO-8601-3               | Seasons intervals                                                                                             |


## Data types
This package supports fuzziness (or not) for:
- **Dates**
- **Date components** (year, year, month, day, hour, minute, second, timeshift), each of these referencing a **Unit**
- **Intervals**
- **Durations**

## Features
Each data type can be:
- **instantiated** programmatically (like `new EdtfDate({year: 2024, month: 8, day: 25, uncertain: true})`);
- **parsed** from EDTF strings by default (like `EdtfDate.fromString("2024-08-25~")`), but you can use your own parser;
- **rendered** in EDTF format by default (like `edtfDate.toString()`), but you can use your own renderer, to render in some language words for instance.

## Examples

The examples below apply for both JavaScript and TypeScript.

### Imports
To allow using only what you need, the API is exported per level. 

You can import a type from its precise location:
```js
import { Level2Date } from "@rr0/time/src/level2/date/Level2Date.mjs"
```
or from package root (but it will load all code):
```js
import { Level2Date } from "@rr0/time"
```
You can also add the alias of your choice to an imported type:
```js
import { Level2Date as EdtfDate } from "@rr0/time"
```

### Parsing

Dates, date components (year, month, etc.), intervals or durations can be instantiated `fromString`.

#### Dates
```js
import { Level2Date as EdtfDate } from "@rr0/time"

const maybeAugust = EdtfDate.fromString("2024-?08-25")
maybeAugust.month.value // 8
maybeAugust.month.uncertain // true
maybeAugust.year.uncertain // false
maybeAugust.uncertain // true
const aroundMarch2025 = EdtfDate.fromString("2025-03~")
aroundMarch2025.approximate = true
```

#### Intervals
Date intervals can be parsed: 
```js
import { Level2Interval as EdtfInterval } from "@rr0/time/level2/interval/index.mjs"

const maybeAugust = EdtfDate.fromString("2024/2025-~06")
maybeAugust.start.year // 2024
maybeAugust.end.year // 2025
maybeAugust.end.month // 6
maybeAugust.end.approximate // true
```

#### Individual date components
Each date calendar (year, month, day) and time (hour, minute, second) component can also be individually instantiated.
```js
import { Level2Year as EdtfYear } from "@rr0/time/level2/year/index.mjs"

const inTheFifities = EdtfYear.fromString("195X")
```

#### Duration

You can select the API level you want to use. For example using level 0:
```js
import {Level1Duration as Duration} from "@rr0/time"

const aroundTenMinutes = Duration.fromString("P10M~")
```

### Programmatic API

Dates, date components (year, month, etc.), intervals or durations can be instantiated through their own constructors.

#### Components
Each date calendar and time component can be individually instantiated.
```js
import { Level2Year as EdtfYear } from "@rr0/time/level2/year/index.mjs"

const someYear = new EdtfYear(1985)
console.log(someYear.value)  // "1985"
const currentYear = EdtfYear.newInstance()
console.log(someYear.value)  // Displays current year
```

#### Date
You can select the API level you want to use. For example using level 0:
```js
import { Level2Date as EdtfDate } from "@rr0/time/level2/date/index.mjs"

const currentDate = EdtfDate.newInstance()
const someDate = new EdtfDate({ year: 1985, month: 4, day: 12 })
```

## API

### Date
Several APIs are available on dates, such as:
```js
maybeAugust.isEqual(aroundMarch2025)  // false
maybeAugust.isBefore(aroundMarch2025) // true
aroundMarch2025.isAfter(maybeAugust)  // true
const delta = aroundMarch2025.delta(maybeAugust).toSpec()
delta.months //  6
delta.days   // 16
```
