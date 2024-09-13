# Calendar units

Units are referenced by calendar values.

```mermaid
classDiagram
    CalendarUnit
    class Calendar {
    }
    Calendar <|-- GregorianCalendar
    GregorianCalendar --> CalendarUnit: millisecond
    GregorianCalendar --> CalendarUnit: second
    GregorianCalendar --> CalendarUnit: minute
    GregorianCalendar --> CalendarUnit: hour
    GregorianCalendar --> CalendarUnit: day
    GregorianCalendar --> CalendarUnit: month
    GregorianCalendar --> CalendarUnit: year
```
