import { DefaultParsers } from "../DefaultParsers.mjs"
import { Level2Date } from "./date/Level2Date.mjs"
import { Level2DateParser } from "./date/Level2DateParser.mjs"
import { Level2Day } from "./day/Level2Day.mjs"
import { Level2DayParser } from "./day/Level2DayParser.mjs"
import { Level2Duration } from "./duration/Level2Duration.mjs"
import { Level2DurationParser } from "./duration/Level2DurationParser.mjs"
import { Level2Hour } from "./hour/Level2Hour.mjs"
import { Level2HourParser } from "./hour/Level2HourParser.mjs"
import { Level2Interval } from "./interval/Level2Interval.mjs"
import { Level2IntervalParser } from "./interval/Level2IntervalParser.mjs"
import { Level2Minute } from "./minute/Level2Minute.mjs"
import { Level2MinuteParser } from "./minute/Level2MinuteParser.mjs"
import { Level2Month } from "./month/Level2Month.mjs"
import { Level2MonthParser } from "./month/Level2MonthParser.mjs"
import { Level2Second } from "./second/Level2Second.mjs"
import { Level2SecondParser } from "./second/Level2SecondParser.mjs"
import { Level2Set } from "./set/Level2Set.mjs"
import { Level2SetParser } from "./set/Level2SetParser.mjs"
import { Level2Year } from "./year/Level2Year.mjs"
import { Level2YearParser } from "./year/Level2YearParser.mjs"

/**
 * Installs the default parsers of the Level 2 data classes, for their `fromString()`.
 */
DefaultParsers.register(Level2Date, () => new Level2DateParser())
DefaultParsers.register(Level2Day, () => new Level2DayParser())
DefaultParsers.register(Level2Duration, () => new Level2DurationParser())
DefaultParsers.register(Level2Hour, () => new Level2HourParser())
DefaultParsers.register(Level2Interval, () => new Level2IntervalParser())
DefaultParsers.register(Level2Minute, () => new Level2MinuteParser())
DefaultParsers.register(Level2Month, () => new Level2MonthParser())
DefaultParsers.register(Level2Second, () => new Level2SecondParser())
DefaultParsers.register(Level2Set, () => new Level2SetParser())
DefaultParsers.register(Level2Year, () => new Level2YearParser())
