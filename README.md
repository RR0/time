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
| Level 0 (2012) | ISO-8601-1 (Basic rules) | Exact 0-9999 Dates, intervals                                                                                 |
| Level 1 (2016) | ISO-8601-2 (Extensions)  | Allows date partial fuzziness, open intervals, seasons, big and/or negative years                             |
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
- **[Set](https://github.com/RR0/time/wiki/Set)** of dates

## Features
Each data type can be:
- **instantiated** programmatically (like `new EdtfDate({year: 2024, month: 8, day: 25, uncertain: true})`);
- **parsed** from EDTF strings by default (like `EdtfDate.fromString("2024-08-25~")`), but you can use your own parser;
- **rendered** in EDTF format by default (like `edtfDate.toString()`), but you can use your own renderer, to render in some language words for instance.

## Examples
The examples below apply for both JavaScript and TypeScript.

### Parsing

Dates, date components (year, month, etc.), intervals or durations can be instantiated `fromString`.

### Programmatic API

Dates, date components (year, month, etc.), intervals or durations can be instantiated through their own constructors.

See details in [the Wiki](https://github.com/RR0/time/wiki).
