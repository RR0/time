import { DefaultParsers } from "../DefaultParsers.mjs"
import { Level0Date } from "./date/Level0Date.mjs"
import { Level0DateParser } from "./date/Level0DateParser.mjs"
import { Level0Day } from "./day/Level0Day.mjs"
import { Level0DayParser } from "./day/Level0DayParser.mjs"
import { Level0Duration } from "./duration/Level0Duration.mjs"
import { Level0DurationParser } from "./duration/Level0DurationParser.mjs"
import { Level0Hour } from "./hour/Level0Hour.mjs"
import { Level0HourParser } from "./hour/Level0HourParser.mjs"
import { Level0Interval } from "./interval/Level0Interval.mjs"
import { Level0IntervalParser } from "./interval/Level0IntervalParser.mjs"
import { Level0Minute } from "./minute/Level0Minute.mjs"
import { Level0MinuteParser } from "./minute/Level0MinuteParser.mjs"
import { Level0Month } from "./month/Level0Month.mjs"
import { Level0MonthParser } from "./month/Level0MonthParser.mjs"
import { Level0Second } from "./second/Level0Second.mjs"
import { Level0SecondParser } from "./second/Level0SecondParser.mjs"
import { Level0Timeshift } from "./timeshift/Level0Timeshift.mjs"
import { Level0TimeshiftParser } from "./timeshift/Level0TimeshiftParser.mjs"
import { Level0Year } from "./year/Level0Year.mjs"
import { Level0YearParser } from "./year/Level0YearParser.mjs"

/**
 * Installs the default parsers of the Level 0 data classes, for their `fromString()`.
 */
DefaultParsers.register(Level0Date, () => new Level0DateParser())
DefaultParsers.register(Level0Day, () => new Level0DayParser())
DefaultParsers.register(Level0Duration, () => new Level0DurationParser())
DefaultParsers.register(Level0Hour, () => new Level0HourParser())
DefaultParsers.register(Level0Interval, () => new Level0IntervalParser())
DefaultParsers.register(Level0Minute, () => new Level0MinuteParser())
DefaultParsers.register(Level0Month, () => new Level0MonthParser())
DefaultParsers.register(Level0Second, () => new Level0SecondParser())
DefaultParsers.register(Level0Timeshift, () => new Level0TimeshiftParser())
DefaultParsers.register(Level0Year, () => new Level0YearParser())
