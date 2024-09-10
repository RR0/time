# EDTF level 1 datetime components

## Data type

Any level 1 date/time components (year, month, day, hour, minute, second) share the same properties, 
some of which being from its [level 0 date component](../../level0/component/README.md) part:

```mermaid
classDiagram
    class Level0Component {
        name: string
        value: number
    }
    class Level1Component {
        uncertain: boolean
        approximate: boolean
    }
    Level0Component <|-- Level1Component
```

## Parsing

```mermaid
classDiagram
    class Level1Component {
        fromString(str, size, name) Level1Date$
    }
    class Level1ComponentParser {
        parse(str)
    }
    Level1Component ..> Level1ComponentParser: uses
```
