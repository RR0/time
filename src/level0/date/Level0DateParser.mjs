import { Level0YearParser } from "../year/Level0YearParser.mjs"
import { Level0MonthParser } from "../month/Level0MonthParser.mjs"
import { Level0DayParser } from "../day/Level0DayParser.mjs"
import { EDTFParser } from "../../EDTFParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level0HourParser } from "../hour/Level0HourParser.mjs"
import { Level0MinuteParser } from "../minute/Level0MinuteParser.mjs"
import { Level0SecondParser } from "../second/Level0SecondParser.mjs"
import { Level0TimeshiftParser } from "../timeshift/Level0TimeshiftParser.mjs"
import { Level0Timeshift } from "../timeshift/index.mjs"
import { Level0Year } from "../year/index.mjs"
import { Level0Day } from "../day/Level0Day.mjs"
import { Level0Hour } from "../hour/index.mjs"
import { Level0Minute } from "../minute/index.mjs"
import { Level0Second } from "../second/index.mjs"
import { Level0Month } from "../month/index.mjs"
import { Level0MonthUnit } from "../../unit/index.mjs"

const yearGroup = `year`
const monthGroup = `month`
const dayGroup = `day`
const hourGroup = `hour`
const minuteGroup = `minute`
const secondGroup = `second`
const timeshiftGroup = `timeshift`

export class Level0DateParser extends EDTFParser {
  /**
   * &param {string} prefix to distinguish dates fields in intervals, typically.
   * @return string The RegExp pattern.
   */
  static format (prefix = "") {
    return RegExpFormat.group(RegExpFormat.groupName(prefix, yearGroup), Level0YearParser.format(prefix))
      + RegExpFormat.optionalNonCapturingGroup("-",
        RegExpFormat.group(RegExpFormat.groupName(prefix, monthGroup), Level0MonthParser.format(prefix)),
        RegExpFormat.optionalNonCapturingGroup("-",
          RegExpFormat.group(RegExpFormat.groupName(prefix, dayGroup), Level0DayParser.format(prefix)),
          RegExpFormat.optionalNonCapturingGroup("[T ]",
            RegExpFormat.group(RegExpFormat.groupName(prefix, hourGroup), Level0HourParser.format(prefix)), ":?", RegExpFormat.group(RegExpFormat.groupName(prefix, minuteGroup), Level0MinuteParser.format(prefix)),
            RegExpFormat.optionalNonCapturingGroup(":", RegExpFormat.group(RegExpFormat.groupName(prefix, secondGroup), Level0SecondParser.format(prefix))),
            "\\s*",
            RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, timeshiftGroup), Level0TimeshiftParser.format(prefix))
          )
        )
      )
  }

  constructor () {
    super("date", Level0DateParser.format())
  }

  /**
   * @protected
   * @param {string} str An EDTF level 0 string.
   * @return {{year: Y, month: M, day: D, hour: H, minute: M, timeshift: Z}}
   */
  parse (str) {
    const groups = this.regexGroups(str)
    const yearStr = groups[yearGroup]
    const monthStr = groups[monthGroup]
    const dayStr = groups[dayGroup]
    const hourStr = groups[hourGroup]
    const minuteStr = groups[minuteGroup]
    const secondStr = groups[secondGroup]
    const timeshiftStr = groups[timeshiftGroup]
    const year = yearStr ? Level0Year.fromValue(Level0YearParser.read(yearStr)) : undefined
    const monthParseResult = monthStr ? Level0MonthParser.read(monthStr) : undefined
    return {
      year,
      month: monthParseResult ? Level0Month.fromValue(monthParseResult, Level0MonthUnit.create(monthParseResult.value, year?.value)) : undefined,
      day: dayStr ? Level0Day.fromValue(Level0DayParser.read(dayStr)) : undefined,
      hour: hourStr ? Level0Hour.fromValue(Level0HourParser.read(hourStr)) : undefined,
      minute: minuteStr ? Level0Minute.fromValue(Level0MinuteParser.read(minuteStr)) : undefined,
      second: secondStr ? Level0Second.fromValue(Level0SecondParser.read(secondStr)) : undefined,
      timeshift: timeshiftStr ? Level0Timeshift.fromString(timeshiftStr) : undefined
    }
  }
}
