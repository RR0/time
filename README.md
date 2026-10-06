# @rr0/time [![CircleCI](https://dl.circleci.com/status-badge/img/gh/RR0/time/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/RR0/time/tree/master)

Zero-dependency JavaScript API for managing fuzzy dates.

This package implements [EDTF](https://www.loc.gov/standards/datetime/) (levels 0, 1 and 2), 
which extended over the [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) standard to add fuzziness, 
and was eventually integrated in [ISO 8601-2019](https://www.iso.org/obp/ui/#iso:std:iso:8601:-1:ed-1:v1:en).

By fuzziness, we mean:
- **uncertainty** (`?`), like "maybe June 2025"
- **(im)precision** (`X`), to express that some date has missing component(s) info 
- **approximation** (`~`), like "around June 2025"
- **both** (`%`), like "maybe around June 2025"

| EDTF           | ISO Standard             | Contents                                                                                                      |
|----------------|--------------------------|---------------------------------------------------------------------------------------------------------------|
| Level 0 (2012) | ISO-8601-1 (Basic rules) | Dates, intervals, but no fuzziness                                                                            |
| Level 1 (2016) | ISO-8601-2 (Extensions)  | Date part fuzziness, open intervals, seasons, big years                                                       |
| Level 2 (2019) | ISO-8601-2 (Extensions)  | Per-component date fuzziness, digits uncertainty, extended seasons w/ quarters, dates sets, exponential years |
| Level 3        | ISO-8601-3               | Seasons intervals                                                                                             |

Accordingly, this API is split in level-specific sub-packages. 

You can use `Level0Date` only for instance, but using `Level2Date` will implicitly rely on `Level1Date` which implicitly rely on `Level0Date`,
as each of those standards are extending one on another.


## Data types
This package supports fuzziness/no fuzziness for:
- **[Dates](https://github.com/RR0/time/wiki/Date)**
- **[Date components](https://github.com/RR0/time/wiki/DateComponent)** (year, month, day, hour, minute, second, timeshift), each of these referencing a **Unit**
- **[Intervals](https://github.com/RR0/time/wiki/Interval)** between two dates
- **[Durations](https://github.com/RR0/time/wiki/Duration)**

## Features
Each data type can be:
- **instantiated** programmatically (like `new EdtfDate({year: 2024, month: 8, day: 25, uncertain: true})`);
- **parsed** from EDTF strings by default (like `EdtfDate.fromString("2024-08-25~")`), but you can use your own parser;
- **rendered** in EDTF format by default (like `edtfDate.toString()`), but you can use your own renderer, to render in some language words for instance.

## Bundle size

Data classes (`Level2Date`, `Level2Duration`, etc.) do not depend on parsers, and the package declares its side effects, so bundlers only include what you import.

| Import                                                          | Minified | Gzipped |
|-----------------------------------------------------------------|---------:|--------:|
| `Level0Duration` from `@rr0/time/core`                          |   6.5 kB |  1.9 kB |
| `Level0Date` from `@rr0/time/core`                              |  11.0 kB |  2.9 kB |
| `Level2Duration` from `@rr0/time/core`                          |  15.6 kB |  3.2 kB |
| `Level2Date` from `@rr0/time/core`                              |  19.7 kB |  4.0 kB |
| `Level2Date` + `Level2Duration` from `@rr0/time/core`           |  21.6 kB |  4.4 kB |
| `Level2Duration` + `Level2DurationParser`                       |  30.3 kB |  6.3 kB |
| `Level2Date` + `Level2DateParser`                               |  30.7 kB |  6.5 kB |
| `Level2Date` + `Level2Duration` + their parsers                 |  35.8 kB |  7.3 kB |
| `Level2Date` from `@rr0/time/level2` + `@rr0/time/level2/defaults` |  39.2 kB |  8.1 kB |
| `Level2Date` from `@rr0/time`                                   |  44.7 kB |  9.2 kB |
| Everything from `@rr0/time`                                     |  45.6 kB |  9.5 kB |

Sizes are measured with esbuild (`--bundle --minify`) and gzip, importing the named classes only.

### Entry points

| Entry point                                   | Contents                                                               |
|-----------------------------------------------|------------------------------------------------------------------------|
| `@rr0/time`                                   | Everything, with default parsers installed: `fromString()` just works. |
| `@rr0/time/core`                              | All levels' data classes, without any parser.                          |
| `@rr0/time/level0`, `level1`, `level2`        | The data classes of one level (and the levels it extends).             |
| `@rr0/time/parsers`                           | All parser classes.                                                    |
| `@rr0/time/defaults`                          | Installs the default parser of every data class.                       |
| `@rr0/time/level0/defaults`, `level1/defaults`, `level2/defaults` | Installs the default parsers of one level.        |

### Parsing without the default parsers

`fromString()` uses the parser registered for its class. With `@rr0/time/core`, none is registered: pass the parser you need.

```js
import { Level2Date } from "@rr0/time/core"
import { Level2DateParser } from "@rr0/time/parsers"

Level2Date.fromString("2024-08-25~", new Level2DateParser())
```

Without a parser, `fromString()` throws an `EDTFError`. Default parsers can be installed with `import "@rr0/time/level2/defaults"`, or replaced with `DefaultParsers.register(Level2Date, () => new MyParser())`.

## Examples
The examples below apply for both JavaScript and TypeScript.

### Parsing

Dates, date components (year, month, etc.), intervals or durations can be instantiated `fromString`.

### Programmatic API

Dates, date components (year, month, etc.), intervals or durations can be instantiated through their own constructors.

See details in [the Wiki](https://github.com/RR0/time/wiki).
