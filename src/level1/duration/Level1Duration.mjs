import { Level1DurationParser } from "./Level1DurationParser.mjs"
import { Level1Year } from "../year/index.mjs"
import { Level1Component } from "../component/index.mjs"
import { CalendarUnit, GregorianCalendar } from "../../calendar/index.mjs"
import { Level1DateParser } from "../date/Level1DateParser.mjs"
import { Level1ComponentParser } from "../component/Level1ComponentParser.mjs"
import { Level0Duration } from "../../level0/index.mjs"
import { Level1Factory } from "../Level1Factory.mjs"
import { Level1DurationRenderer } from "./Level1DurationRenderer.mjs"

/**
 * @typedef {Object} Level1DurationInSpec
 * @property {Level1Year|number} years
 * @property {Level1Month|number} months
 * @property {Level1Day|number} days
 * @property {Level1Hour|number} hours
 * @property {Level1Minute|number} minutes
 * @property {Level1Second|number} seconds
 * @property {Level1Millisecond|number} [milliseconds]
 * @property {boolean} [uncertain]
 * @property {boolean} [approximate]
 */
/**
 * @typedef {Object} Level1DurationOutSpec
 * @property {Level1Year} years
 * @property {Level1Month} months
 * @property {Level1Day} days
 * @property {Level1Hour} hours
 * @property {Level1Minute} minutes
 * @property {Level1Second} seconds
 * @property {Level1Millisecond} [milliseconds]
 * @property {boolean} [uncertain]
 * @property {boolean} [approximate]
 */

/**
 * @template Y extends Level1Component = Level1Year
 * @template M extends Level1Component = Level1Month
 * @template D extends Level1Component = Level1Day
 * @template H extends Level1Component = Level1Hour
 * @template M extends Level1Component = Level1Minute
 * @template S extends Level1Component = Level1Second
 * @template C extends Level1Component = Level1Millisecond
 * @template DD extends Level1Date = Level1Date
 */
export class Level1Duration extends Level1Component {
  /**
   * @param {Level1DurationInSpec|number} spec
   */
  constructor (spec = {
    value: {
      milliseconds: new Date().getMilliseconds(),
      seconds: new Date().getSeconds(),
      minutes: new Date().getMinutes(),
      hours: new Date().getHours(),
      days: new Date().getDate(),
      months: new Date().getMonth(),
      years: new Date().getFullYear()
    }
  }) {
    super(
      typeof spec === "number" ? spec :
        {
          value: Level1Duration.getValue(spec, Level1DateParser.yearGroup)
            + Level1Duration.getValue(spec, Level1DateParser.monthGroup)
            + Level1Duration.getValue(spec, Level1DateParser.dayGroup)
            + Level1Duration.getValue(spec, Level1DateParser.hourGroup)
            + Level1Duration.getValue(spec, Level1DateParser.minuteGroup)
            + Level1Duration.getValue(spec, Level1DateParser.secondGroup),
          uncertain: Level1Duration.getBoolean(spec, Level1ComponentParser.uncertainGroup),
          approximate: Level1Duration.getBoolean(spec, "approximate")
        },
      new CalendarUnit("millisecond", 0, Number.MAX_SAFE_INTEGER, undefined)
    )
  }

  /**
   * @protected
   * @param spec
   * @param {string} durCompName
   * @return {boolean}
   */
  static getBoolean (spec, durCompName) {
    return spec[durCompName]
      || (spec[Level1DateParser.yearGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.monthGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.dayGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.hourGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.minuteGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.secondGroup + "s"])?.[durCompName]
      || false
  }

  /**
   * @protected
   * @param spec The object containing group values.
   * @param {string} durCompGroupName The regex duration component group name (for year, month, etc.) as singular.
   * @return {number}
   */
  static getValue (spec, durCompGroupName) {
    let time = 0
    let durationValue = spec[durCompGroupName + "s"]  // Duration components names are suffixed with plural.
    if (durationValue instanceof Level1Component) {
      durationValue = durationValue.value
    }
    if (durationValue) {
      const unit = /** @type CalendarUnit */ GregorianCalendar[durCompGroupName]
      time = durationValue * unit.duration
    }
    return time
  }

  toString (renderer = Level1DurationRenderer.instance) {
    return super.toString(renderer)
  }

  /**
   * @return {Level1DurationOutSpec}
   */
  toSpec () {
    return Level1Duration.toSpec(this)
  }

  /**
   * @param {Level1Duration} comp
   * @param {LevelFactory} [factory]
   * @return {Level1DurationOutSpec}
   */
  static toSpec (comp, factory = Level1Factory.instance) {
    const level0Spec = Level0Duration.toSpec(comp, factory)
    return {
      ...level0Spec,
      uncertain: comp.uncertain,
      approximate: comp.approximate
    }
  }

  /**
   * @param {string} str The duration string to parse.
   * @param {EDTFParser} [parser]
   * @return {Level1Duration}
   */
  static fromString (str, parser = new Level1DurationParser()) {
    const parsed = parser.parse(str)
    return new Level1Duration(parsed)
  }

  /**
   * @param {DD} beforeDate
   * @param {DD} afterDate
   * @return {Level1Duration}
   */
  static between (beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level1Duration(afterTime - beforeTime)
  }
}
