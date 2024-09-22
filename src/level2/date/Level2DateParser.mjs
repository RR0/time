import { Level2Timeshift } from "../../level2/timeshift/Level2Timeshift.mjs"
import { Level2Second } from "../../level2/second/Level2Second.mjs"
import { Level2Minute } from "../../level2/minute/Level2Minute.mjs"
import { Level2Hour } from "../../level2/hour/Level2Hour.mjs"
import { Level2Day } from "../../level2/day/Level2Day.mjs"
import { Level2Month } from "../../level2/month/Level2Month.mjs"
import { Level2Year } from "../year/index.mjs"
import { Level1DateParser } from "../../level1/date/Level1DateParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level2YearParser } from "../year/Level2YearParser.mjs"
import { Level2MonthParser } from "../month/Level2MonthParser.mjs"
import { Level2DayParser } from "../day/Level2DayParser.mjs"
import { Level2HourParser } from "../hour/Level2HourParser.mjs"
import { Level2SecondParser } from "../second/Level2SecondParser.mjs"
import { Level2MinuteParser } from "../minute/Level2MinuteParser.mjs"
import { Level2TimeshiftParser } from "../timeshift/Level2TimeshiftParser.mjs"

/**
 * Parses date strings in the EDTF/ISO-8601 level 2 format.
 *
 * @template Y extends Level1Year
 * @template M extends Level1Month
 * @template D extends Level1Day
 * @template H extends Level1Hour
 * @template M extends Level1Minute
 * @template S extends Level1Second
 * @template Z extends Level1Timeshift
 */
export default class Level2DateParser extends Level1DateParser {
  /**
   * &param {string} prefix
   * @return string
   */
  static format (prefix = "") {
    return RegExpFormat.group(RegExpFormat.groupName(prefix, Level2DateParser.yearGroup), Level2YearParser.format(prefix))
      + RegExpFormat.optionalNonCapturingGroup("-",
        RegExpFormat.group(RegExpFormat.groupName(prefix, Level2DateParser.monthGroup), Level2MonthParser.format(prefix)),
        RegExpFormat.optionalNonCapturingGroup("-",
          RegExpFormat.group(RegExpFormat.groupName(prefix, Level2DateParser.dayGroup), Level2DayParser.format(prefix)),
          RegExpFormat.optionalNonCapturingGroup("[T ]",
            RegExpFormat.group(RegExpFormat.groupName(prefix, Level2DateParser.hourGroup), Level2HourParser.format(prefix)), ":", RegExpFormat.group(RegExpFormat.groupName(prefix, Level2DateParser.minuteGroup), Level2MinuteParser.format(prefix)),
            RegExpFormat.optionalNonCapturingGroup(":", RegExpFormat.group(RegExpFormat.groupName(prefix, Level2DateParser.secondGroup), Level2SecondParser.format(prefix))),
            RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DateParser.timeshiftGroup), Level2TimeshiftParser.format(prefix))
          )
        )
      )
  }

  constructor () {
    super(Level2DateParser.format(), "date")
  }

  parseGroups (groups) {
    const timeshiftStr = groups[Level2DateParser.timeshiftGroup]
    const timeshift = timeshiftStr ? Level2Timeshift.fromString(timeshiftStr) : undefined
    const secondStr = groups[Level2DateParser.secondGroup]
    let second
    if (secondStr) {
      second = Level2Second.fromString(secondStr)
      second.uncertain = second?.uncertain || false
      second.approximate = second?.approximate || false
    }
    const minuteStr = groups[Level2DateParser.minuteGroup]
    let minute
    if (minuteStr) {
      minute = Level2Minute.fromString(minuteStr)
      minute.uncertain = minute.uncertain || second?.uncertain || false
      minute.approximate = minute.approximate || second?.approximate || false
    }
    const hourStr = groups[Level2DateParser.hourGroup]
    let hour
    if (hourStr) {
      hour = Level2Hour.fromString(hourStr)
      hour.uncertain = hour.uncertain || minute?.uncertain || false
      hour.approximate = hour.approximate || minute?.approximate || false
    }
    const dayStr = groups[Level2DateParser.dayGroup]
    let day
    if (dayStr) {
      day = Level2Day.fromString(dayStr)
      day.uncertain = day.uncertain || hour?.uncertain || false
      day.approximate = day.approximate || hour?.approximate || false
    }
    const monthStr = groups[Level2DateParser.monthGroup]
    let month
    if (monthStr) {
      month = Level2Month.fromString(monthStr)
      month.uncertain = month.uncertain || day?.uncertain || false
      month.approximate = month.approximate || day?.approximate || false
    }
    const yearStr = groups[Level2DateParser.yearGroup]
    let year
    if (yearStr) {
      year = Level2Year.fromString(yearStr)
      year.uncertain = year.uncertain || month?.uncertain || false
      year.approximate = year.approximate || month?.approximate || false
    }
    return { year, month, day, hour, minute, second, timeshift }
  }
}
