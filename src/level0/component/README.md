# EDTF level 0 date/time components

## Data type

Any level 0 date/time components (year, month, day, hour, minute, second) share the same properties:
- a **[unit](../../unit/README.md)**
- a **value** in this unit
- a **renderer** to format this value for display.

```mermaid
classDiagram
    class Level0Component {
        value: number
        toString(renderer?: Level0ComponentRenderer): string
    }
    class Level0ComponentRenderer {
        render(comp): string
    }
    class TimeUnit {
    }
    Level0Component --> TimeUnit: unit
    Level0Component ..> Level0ComponentRenderer: renderer
```

## Parsing

```mermaid
classDiagram
    class Level0Component {
        fromString(str, size, name) Level0Date$
    }
    class Level0ComponentParser {
        parse(str)
    }
    Level0Component ..> Level0ComponentParser: uses
```
