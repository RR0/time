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

#### Milliseconds

The decimal fraction of seconds is read as a `millisecond` (`2023-03-14T09:12:33.123Z`, with `.` or `,`): `date.millisecond.value === 123`.
Fractions are right-padded or truncated to 3 digits (`.5` is 500 ms, `.123999` is 123 ms), and milliseconds are rendered as 3 digits by `toString()`.
They are not an EDTF component of their own, so they carry no uncertainty/approximation flags.

#### Uncertainty and approximation of dates

In level 2 dates, the scope of a qualification (`?` uncertain, `~` approximate, `%` both) depends on where it is written:

| Written    | Applies to                                  | Read from                                                         |
|------------|---------------------------------------------|-------------------------------------------------------------------|
| `~2004-06` | the year only                               | `date.year.approximateComponent`                                  |
| `2004-~06` | the month, and the year at the group level  | `date.month.approximateComponent`, `date.year.approximateGroup`   |
| `2004-06~` | the whole date, at the group level          | `date.month.approximateGroup`, `date.year.approximateGroup`       |

`approximate` and `uncertain` are true for both levels. `toString()` writes each qualification where it applies, and reading the result gives the same scopes
(`2004-~06` is not rendered `2004~-06~`), except that a qualification deduced from another one is not written (`2004~-06~` is rendered `2004-06~`).

#### Strict parsing

By default, parsers only require the beginning of the string to match, so `1948abc` is parsed as `1948` and the trailing garbage is silently dropped.
Set `strict` on a parser to make it reject any string that is not matched entirely (an `EDTFError` is thrown):

```javascript
const parser = new Level2DateParser()
parser.strict = true
Level2Date.fromString("1948abc", parser) // throws EDTFError
```

Strictness applies to the parser it is set on, not to the component parsers it uses internally, so it works for dates, intervals, timeshifts and durations alike.
#### Durations

In level 2 durations, `M` is minutes (`P2M30S`, `P225H15M3S`, `PT30M`), and `MM` is months (`P2MM`).
For ISO 8601 compatibility, a `M` that comes before the `T` that introduces the time part is months (`P1Y2MT30M`, `P1Y2M3DT4H`), as is a `M` followed by days (`P1Y2M3D`), since minutes cannot precede days.
Hence, `P1Y2M` is 1 year and 2 minutes, and 1 year and 2 months is `P1Y2MM`.

Durations are rendered with `MM` for months and a bare `M` for minutes, so what is rendered can be parsed back.

##### Uncertainty and approximation

As in dates, a qualification (`?` uncertain, `~` approximate, `%` both) has a scope that depends on where it is written:

| Written        | Applies to                          | Read from                               |
|----------------|-------------------------------------|-----------------------------------------|
| `~P1Y2MM`      | the whole duration                  | `duration.approximateDuration`          |
| `P1Y2MM~`      | the whole duration (same as above)  | `duration.approximateDuration`          |
| `P~1Y2MM`      | the year only                       | `duration.components.years.approximateComponent` |
| `P1Y~2MM`      | the months, and the year at the group level | `components.months.approximateComponent`, `components.years.approximate` |

`duration.approximate` (and `uncertain`) is true as soon as the duration or any of its components is qualified.
A duration parsed from a string keeps its `components` as they were written, and `toSpec()` returns them, without normalizing the units (`P~150S` stays 150 seconds, instead of 2 minutes and 30 seconds) as this would lose which component is qualified.
Durations without any qualified component are still normalized (`P150S` is rendered `P2M30S`).
Rendering writes the qualification back where it applies, except that a suffix is rendered as a prefix (`P10M~` is rendered `~P10M`).

Decimal fractions (`P1.5Y`) and weeks (`P2W`) are not supported yet. Levels 0 and 1 only know the former notation (`MM` for months, bare `M` for minutes, no `T`).

### Programmatic API

Dates, date components (year, month, etc.), intervals or durations can be instantiated through their own constructors.

See details in [the Wiki](https://github.com/RR0/time/wiki).
