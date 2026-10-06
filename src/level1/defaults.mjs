import { DefaultParsers } from "../DefaultParsers.mjs"
import { Level1Date } from "./date/Level1Date.mjs"
import { Level1DateParser } from "./date/Level1DateParser.mjs"
import { Level1Day } from "./day/Level1Day.mjs"
import { Level1DayParser } from "./day/Level1DayParser.mjs"
import { Level1Duration } from "./duration/Level1Duration.mjs"
import { Level1DurationParser } from "./duration/Level1DurationParser.mjs"
import { Level1Hour } from "./hour/Level1Hour.mjs"
import { Level1HourParser } from "./hour/Level1HourParser.mjs"
import { Level1Interval } from "./interval/Level1Interval.mjs"
import Level1IntervalParser from "./interval/Level1IntervalParser.mjs"
import { Level1Minute } from "./minute/Level1Minute.mjs"
import { Level1MinuteParser } from "./minute/Level1MinuteParser.mjs"
import { Level1Month } from "./month/Level1Month.mjs"
import { Level1MonthParser } from "./month/Level1MonthParser.mjs"
import { Level1Second } from "./second/Level1Second.mjs"
import { Level1SecondParser } from "./second/Level1SecondParser.mjs"
import { Level1Timeshift } from "./timeshift/Level1Timeshift.mjs"
import { Level1TimeshiftParser } from "./timeshift/Level1TimeshiftParser.mjs"
import { Level1Year } from "./year/Level1Year.mjs"
import { Level1YearParser } from "./year/Level1YearParser.mjs"

/**
 * Installs the default parsers of the Level 1 data classes, for their `fromString()`.
 */
DefaultParsers.register(Level1Date, () => new Level1DateParser())
DefaultParsers.register(Level1Day, () => new Level1DayParser())
DefaultParsers.register(Level1Duration, () => new Level1DurationParser())
DefaultParsers.register(Level1Hour, () => new Level1HourParser())
DefaultParsers.register(Level1Interval, () => new Level1IntervalParser())
DefaultParsers.register(Level1Minute, () => new Level1MinuteParser())
DefaultParsers.register(Level1Month, () => new Level1MonthParser())
DefaultParsers.register(Level1Second, () => new Level1SecondParser())
DefaultParsers.register(Level1Timeshift, () => new Level1TimeshiftParser())
DefaultParsers.register(Level1Year, () => new Level1YearParser())
