import Level1YearParser from "../year/Level1YearParser.mjs"
import Level1MonthParser from "../month/Level1MonthParser.mjs"
import Level1DayParser from "../day/Level1DayParser.mjs"
import EDTFParser from "../../EDTFParser.mjs"
import Level1Year from "../year/Level1Year.mjs"
import Level1Month from "../month/Level1Month.mjs"
import Level1Day from "../day/Level1Day.mjs"
import Level1Hour from "../hour/Level1Hour.mjs"
import Level1Minute from "../minute/Level1Minute.mjs"
import RegExpFormat from "../../RegExpFormat.mjs"
import Level1HourParser from "../hour/Level1HourParser.mjs"
import Level1MinuteParser from "../minute/Level1MinuteParser.mjs"
import Level1Second from "../second/Level1Second.mjs"
import Level1SecondParser from "../second/Level1SecondParser.mjs"
import Level1Timeshift from "../timeshift/Level1Timeshift.mjs"
import Level1TimeshiftParser from "../timeshift/Level1TimeshiftParser.mjs"

/**
 * @template Y extends Level1Year
 * @template M extends Level1Month
 * @template D extends Level1Day
 * @template H extends Level1Hour
 * @template M extends Level1Minute
 * @template S extends Level1Second
 * @template Z extends Level1Timeshift
 */
export default class Level1DateParser extends EDTFParser {
  /**
   * @readonly
   * @type {string}
   */
  static yearGroup = `year`

  /**
   * @readonly
   * @type {string}
   */
  static monthGroup = `month`

  /**
   * @readonly
   * @type {string}
   */
  static dayGroup = `day`

  /**
   * @readonly
   * @type {string}
   */
  static hourGroup = `hour`

  /**
   * @readonly
   * @type {string}
   */
  static minuteGroup = `minute`

  /**
   * @readonly
   * @type {string}
   */
  static secondGroup = `second`

  /**
   * @readonly
   * @type {string}
   */
  static timeshiftGroup = `timeshift`

  /**
   * &param {string} prefix
   * @return string
   */
  static format (prefix = "") {
    return RegExpFormat.group(RegExpFormat.groupName(prefix, Level1DateParser.yearGroup), Level1YearParser.format(prefix))
      + RegExpFormat.optionalNonCapturingGroup("-",
        RegExpFormat.group(RegExpFormat.groupName(prefix, Level1DateParser.monthGroup), Level1MonthParser.format(prefix)),
        RegExpFormat.optionalNonCapturingGroup("-",
          RegExpFormat.group(RegExpFormat.groupName(prefix, Level1DateParser.dayGroup), Level1DayParser.format(prefix)),
          RegExpFormat.optionalNonCapturingGroup("T",
            RegExpFormat.group(RegExpFormat.groupName(prefix, Level1DateParser.hourGroup), Level1HourParser.format(prefix)), ":", RegExpFormat.group(RegExpFormat.groupName(prefix, Level1DateParser.minuteGroup), Level1MinuteParser.format(prefix)),
            RegExpFormat.optionalNonCapturingGroup(":", RegExpFormat.group(RegExpFormat.groupName(prefix, Level1DateParser.secondGroup), Level1SecondParser.format(prefix))),
            RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level1DateParser.timeshiftGroup), Level1TimeshiftParser.format(prefix))
          )
        )
      )
  }

  constructor (format = Level1DateParser.format()) {
    super(format, "date")
  }

  /**
   * @protected
   * @param {string} str An EDTF level 1 string.
   * @return {{year: Y, month: M, day: D, hour: H, minute: M, timeshift: Z}}
   */
  parse (str) {
    const groups = this.regexGroups(str)
    const timeshiftStr = groups[Level1DateParser.timeshiftGroup]
    const timeshift = timeshiftStr ? Level1Timeshift.fromString(timeshiftStr) : undefined
    const secondStr = groups[Level1DateParser.secondGroup]
    const second = secondStr ? Level1Second.fromString(secondStr) : undefined
    const minuteStr = groups[Level1DateParser.minuteGroup]
    let minute
    if (minuteStr) {
      minute = Level1Minute.fromString(minuteStr)
      minute.uncertain = minute.uncertain || second?.uncertain || false
      minute.approximate = minute.approximate || second?.approximate || false
    }
    const hourStr = groups[Level1DateParser.hourGroup]
    let hour
    if (hourStr) {
      hour = Level1Hour.fromString(hourStr)
      hour.uncertain = hour.uncertain || minute?.uncertain || false
      hour.approximate = hour.approximate || minute?.approximate || false
    }
    const dayStr = groups[Level1DateParser.dayGroup]
    let day
    if (dayStr) {
      day = Level1Day.fromString(dayStr)
      day.uncertain = day.uncertain || hour?.uncertain || false
      day.approximate = day.approximate || hour?.approximate || false
    }
    const monthStr = groups[Level1DateParser.monthGroup]
    let month
    if (monthStr) {
      month = Level1Month.fromString(monthStr)
      month.uncertain = month.uncertain || day?.uncertain || false
      month.approximate = month.approximate || day?.approximate || false
    }
    const yearStr = groups[Level1DateParser.yearGroup]
    let year
    if (yearStr) {
      year = Level1Year.fromString(yearStr)
      year.uncertain = year.uncertain || month?.uncertain || false
      year.approximate = year.approximate || month?.approximate || false
    }
    return { year, month, day, hour, minute, second, timeshift }
  }
}
