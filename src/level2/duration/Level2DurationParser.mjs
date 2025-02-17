import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level2ComponentParser } from "../component/Level2ComponentParser.mjs"
import { Level2Second } from "../second/index.mjs"
import { Level2Minute } from "../minute/index.mjs"
import { Level2Hour } from "../hour/index.mjs"
import { Level2Day } from "../day/index.mjs"
import { Level2Month } from "../month/index.mjs"
import { Level2Year } from "../year/index.mjs"
import { Level2DateParser } from "../date/Level2DateParser.mjs"
import { level0DurationUnits } from "../../level0/Level0Duration.mjs"

/**
 * @typedef {Object} Level0DurationParseResult
 * @property {number} [seconds]
 * @property {number} [minutes]
 * @property {number} [hours]
 * @property {number} [days]
 * @property {number} [months]
 * @property {number} [years]
 */

/**
 * Parses duration strings in the ISO-8601/EDTF "PxxHyyMzzS" format,
 * with support for component-level fuzziness.
 */
export class Level2DurationParser extends Level2ComponentParser {
  /**
   * @readonly
   * @type {string}
   */
  static yearsGroup = "years"

  /**
   * @readonly
   * @type {string}
   */
  static monthsGroup = "months"

  /**
   * @readonly
   * @type {string}
   */
  static daysGroup = "days"

  /**
   * @readonly
   * @type {string}
   */
  static hoursGroup = "hours"

  /**
   * @readonly
   * @type {string}
   */
  static minutesGroup = "minutes"

  /**
   * @readonly
   * @type {string}
   */
  static secondsGroup = "seconds"

  constructor() {
    super("duration", Level2DurationParser.format())
  }

  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    return "P"
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.yearsGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.yearGroup), "+", undefined, "\\d"), "Y")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.monthsGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.monthGroup), "+", undefined, "\\d"), "MM")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.daysGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.dayGroup), "+", undefined, "\\d"), "D")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.hoursGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.hourGroup), "+", undefined, "\\d"), "H")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.minutesGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.minuteGroup), "+", undefined, "\\d"), "M")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.secondsGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.secondGroup), "+", undefined, "\\d"), "S")
  }

  /**
   * @param {{ [p: string]: string }} groups
   * @return { years, months, days, hours, minutes, seconds }
   */
  parseGroups(groups) {
    const secondStr = groups[Level2DurationParser.secondsGroup]
    let seconds
    if (secondStr) {
      seconds = Level2Second.fromString(secondStr, level0DurationUnits.second)
      seconds.uncertain = Boolean(groups[RegExpFormat.groupName(Level2ComponentParser.uncertainGroup, Level2DurationParser.secondsGroup)]) || false
      seconds.approximate = Boolean(groups[RegExpFormat.groupName(Level2ComponentParser.approximateGroup, Level2DurationParser.secondsGroup)]) || false
    }
    const minuteStr = groups[Level2DurationParser.minutesGroup]
    let minutes
    if (minuteStr) {
      minutes = Level2Minute.fromString(minuteStr, level0DurationUnits.minute)
      minutes.uncertain = minutes.uncertain || seconds?.uncertain || false
      minutes.approximate = minutes.approximate || seconds?.approximate || false
    }
    const hourStr = groups[Level2DurationParser.hoursGroup]
    let hours
    if (hourStr) {
      hours = Level2Hour.fromString(hourStr, level0DurationUnits.hour)
      hours.uncertain = hours.uncertain || minutes?.uncertain || false
      hours.approximate = hours.approximate || minutes?.approximate || false
    }
    const dayStr = groups[Level2DurationParser.daysGroup]
    let days
    if (dayStr) {
      days = Level2Day.fromString(dayStr, level0DurationUnits.day)
      days.uncertain = days.uncertain || hours?.uncertain || false
      days.approximate = days.approximate || hours?.approximate || false
    }
    const monthStr = groups[Level2DurationParser.monthsGroup]
    let months
    if (monthStr) {
      months = Level2Month.fromString(monthStr, level0DurationUnits.month)
      months.uncertain = months.uncertain || days?.uncertain || false
      months.approximate = months.approximate || days?.approximate || false
    }
    const yearStr = groups[Level2DurationParser.yearsGroup]
    let years
    if (yearStr) {
      years = Level2Year.fromString(yearStr, level0DurationUnits.year)
      years.uncertain = years.uncertain || months?.uncertain || false
      years.approximate = years.approximate || months?.approximate || false
    }
    return { years, months, days, hours, minutes, seconds }
  }
}
