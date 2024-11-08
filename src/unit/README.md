# Calendar units

Units are referenced by calendar values.

```mermaid
classDiagram
    class TimeUnit {
        name: string
        min: number
        max: number
        duration: number
        validate(value)
    }
    class MonthUnit {
        create(monthValue, yearValue): MonthUnit$
    }
    TimeUnit <|-- MonthUnit

    class TimeUnits {
    }
    TimeUnit --> TimeUnit: subUnit
    TimeUnits --> TimeUnit: millisecond
    TimeUnits --> TimeUnit: second
    TimeUnits --> TimeUnit: minute
    TimeUnits --> TimeUnit: hour
    TimeUnits --> TimeUnit: day
    TimeUnits --> TimeUnit: month
    TimeUnits --> TimeUnit: year
```
