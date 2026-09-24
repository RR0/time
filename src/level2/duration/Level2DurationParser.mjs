import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level2ComponentParser } from "../component/Level2ComponentParser.mjs"
import { Level2DurationComponentParser } from "./Level2DurationComponentParser.mjs"
import { Level2Second } from "../second/index.mjs"
import { Level2Minute } from "../minute/index.mjs"
import { Level2Hour } from "../hour/index.mjs"
import { Level2Day } from "../day/index.mjs"
import { Level2Month } from "../month/index.mjs"
import { Level2Year } from "../year/index.mjs"
import { Level2DateParser } from "../date/Level2DateParser.mjs"
import { level0DurationUnits } from "../../level0/Level0Duration.mjs"
/** @import { Level2Component, Level2ComponentSpec } from "../component/Level2Component.mjs" */
/** @import { CalendarUnit } from "../../calendar/unit/CalendarUnit.mjs" */

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
 * with support for component-level fuzziness ("P~150S") and whole-duration fuzziness ("~P150S").
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

  /**
   * @readonly
   * @type {string}
   */
  static durationGroup = "duration"

  /**
   * Parses the quantity of each unit, which can have more digits than a date component ("P150S", "P26300H").
   *
   * @readonly
   * @type {Level2DurationComponentParser}
   */
  static componentParser = new Level2DurationComponentParser()

  constructor() {
    super("duration", Level2DurationParser.format())
  }

  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    const durationGroup = RegExpFormat.groupName(prefix, Level2DurationParser.durationGroup)
    return this.qualifierFormat(RegExpFormat.groupName(Level2ComponentParser.uncertainGroup, durationGroup), "?")
      + this.qualifierFormat(RegExpFormat.groupName(Level2ComponentParser.approximateGroup, durationGroup), "~")
      + this.qualifierFormat(RegExpFormat.groupName(Level2ComponentParser.uncertainAndApproximateGroup, durationGroup), "%")
      + "P"
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.yearsGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.yearGroup), "+", undefined, "\\d"), "Y")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.monthsGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.monthGroup), "+", undefined, "\\d"), "MM")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.daysGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.dayGroup), "+", undefined, "\\d"), "D")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.hoursGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.hourGroup), "+", undefined, "\\d"), "H")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.minutesGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.minuteGroup), "+", undefined, "\\d"), "M")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, Level2DurationParser.secondsGroup), Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, Level2DateParser.secondGroup), "+", undefined, "\\d"), "S")
  }

  /**
   * @template {Level2Component} C
   * @param {string} str The quantity of a duration unit, possibly qualified ("150", "~150").
   * @param {new (spec: Level2ComponentSpec, unit: CalendarUnit) => C} Component The component class to create.
   * @param {CalendarUnit} unit The duration unit.
   * @return {C}
   */
  static parseComponent(str, Component, unit) {
    const parseResult = Level2DurationParser.componentParser.parse(str)
    return new Component(parseResult, unit)
  }

  /**
   * @param {{ [p: string]: string }} groups
   * @return { years, months, days, hours, minutes, seconds, uncertain, approximate }
   */
  parseGroups(groups) {
    const secondStr = groups[Level2DurationParser.secondsGroup]
    let seconds
    if (secondStr) {
      seconds = Level2DurationParser.parseComponent(secondStr, Level2Second, level0DurationUnits.second)
      seconds.uncertain = Boolean(groups[RegExpFormat.groupName(Level2ComponentParser.uncertainGroup, Level2DurationParser.secondsGroup)]) || false
      seconds.approximate = Boolean(groups[RegExpFormat.groupName(Level2ComponentParser.approximateGroup, Level2DurationParser.secondsGroup)]) || false
    }
    const minuteStr = groups[Level2DurationParser.minutesGroup]
    let minutes
    if (minuteStr) {
      minutes = Level2DurationParser.parseComponent(minuteStr, Level2Minute, level0DurationUnits.minute)
      minutes.uncertain = minutes.uncertain || seconds?.uncertain || false
      minutes.approximate = minutes.approximate || seconds?.approximate || false
    }
    const hourStr = groups[Level2DurationParser.hoursGroup]
    let hours
    if (hourStr) {
      hours = Level2DurationParser.parseComponent(hourStr, Level2Hour, level0DurationUnits.hour)
      hours.uncertain = hours.uncertain || minutes?.uncertain || false
      hours.approximate = hours.approximate || minutes?.approximate || false
    }
    const dayStr = groups[Level2DurationParser.daysGroup]
    let days
    if (dayStr) {
      days = Level2DurationParser.parseComponent(dayStr, Level2Day, level0DurationUnits.day)
      days.uncertain = days.uncertain || hours?.uncertain || false
      days.approximate = days.approximate || hours?.approximate || false
    }
    const monthStr = groups[Level2DurationParser.monthsGroup]
    let months
    if (monthStr) {
      months = Level2DurationParser.parseComponent(monthStr, Level2Month, level0DurationUnits.month)
      months.uncertain = months.uncertain || days?.uncertain || false
      months.approximate = months.approximate || days?.approximate || false
    }
    const yearStr = groups[Level2DurationParser.yearsGroup]
    let years
    if (yearStr) {
      years = Level2DurationParser.parseComponent(yearStr, Level2Year, level0DurationUnits.year)
      years.uncertain = years.uncertain || months?.uncertain || false
      years.approximate = years.approximate || months?.approximate || false
    }
    const uncertainAndApproximate = Boolean(groups[RegExpFormat.groupName(Level2ComponentParser.uncertainAndApproximateGroup, Level2DurationParser.durationGroup)])
    const uncertain = uncertainAndApproximate || Boolean(groups[RegExpFormat.groupName(Level2ComponentParser.uncertainGroup, Level2DurationParser.durationGroup)])
    const approximate = uncertainAndApproximate || Boolean(groups[RegExpFormat.groupName(Level2ComponentParser.approximateGroup, Level2DurationParser.durationGroup)])
    return { years, months, days, hours, minutes, seconds, uncertain, approximate }
  }
}
