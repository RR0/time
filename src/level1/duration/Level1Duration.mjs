import { Level1DurationParser } from "./Level1DurationParser.mjs"
import { Level1Year } from "../year/index.mjs"
import { Level1Component } from "../component/index.mjs"
import { CalendarUnit, GregorianCalendar } from "../../calendar/index.mjs"
import { Level1DurationRenderer } from "./Level1DurationRenderer.mjs"

/**
 * @typedef {Object} Level1DurationSpec
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
 * @template Y extends Level1Component = Level1Year
 * @template M extends Level1Component = Level1Month
 * @template D extends Level1Component = Level1Day
 * @template H extends Level1Component = Level1Hour
 * @template M extends Level1Component = Level1Minute
 * @template S extends Level1Component = Level1Second
 * @template C extends Level1Component = Level1Millisecond
 */
export class Level1Duration extends Level1Component {
  /**
   * @param {Level1DurationSpec|number} spec
   */
  constructor (spec = {
    value: {
      years: new Date().getFullYear(),
      months: new Date().getMonth(),
      days: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
      milliseconds: new Date().getMilliseconds()
    }
  }) {
    super(
      typeof spec === "number" ? spec :
        {
          value: (spec.years ? spec.years * GregorianCalendar.year.duration : 0)
            + (spec.months ? spec.months * GregorianCalendar.month.duration : 0)
            + (spec.days ? spec.days * GregorianCalendar.day.duration : 0)
            + (spec.hours ? spec.hours * GregorianCalendar.hour.duration : 0)
            + (spec.minutes ? spec.minutes * GregorianCalendar.minute.duration : 0)
            + (spec.seconds ? spec.seconds * GregorianCalendar.second.duration : 0),
          uncertain: spec.uncertain || false,
          approximate: spec.approximate || false
        },
      new CalendarUnit("millisecond", 0, Number.MAX_SAFE_INTEGER, undefined)
    )
  }

  toString (renderer = Level1DurationRenderer.instance) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str The duration string to parse.
   * @param {Level1DurationParser} [parser]
   * @return {Level1Duration}
   */
  static fromString (str, parser = new Level1DurationParser()) {
    return new Level1Duration(parser.parse(str))
  }

  /**
   * @param {Level1Date} beforeDate
   * @param {Level1Date} afterDate
   * @return {Level1Duration}
   */
  static between (beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level1Duration(afterTime - beforeTime)
  }
}
