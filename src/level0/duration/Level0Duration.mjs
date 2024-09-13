import { CalendarUnit, GregorianCalendar } from "../../calendar/index.mjs"
import { Level0DurationParser } from "./Level0DurationParser.mjs"
import { Level0Year } from "../year/index.mjs"
import { Level0Month } from "../month/index.mjs"
import { Level0Day } from "../day/index.mjs"
import { Level0Hour } from "../hour/index.mjs"
import { Level0Minute } from "../minute/index.mjs"
import { Level0Second } from "../second/index.mjs"
import { Level0DurationRenderer } from "./Level0DurationRenderer.mjs"
import { Level0Component } from "../component/index.mjs"

/**
 * @typedef {Object} Level0DurationSpec
 * @property {Level0Year|number} years
 * @property {Level0Month|number} months
 * @property {Level0Day|number} days
 * @property {Level0Hour|number} hours
 * @property {Level0Minute|number} minutes
 * @property {Level0Second|number} seconds
 * @property {Level0Millisecond|number} [milliseconds]
 */

/**
 * @template Y extends Level0Component = Level0Year
 * @template M extends Level0Component = Level0Month
 * @template D extends Level0Component = Level0Day
 * @template H extends Level0Component = Level0Hour
 * @template M extends Level0Component = Level0Minute
 * @template S extends Level0Component = Level0Second
 * @template C extends Level0Component = Level0Millisecond
 */
export class Level0Duration extends Level0Component {
  /**
   * @param {Level0DurationSpec|number} spec
   */
  constructor (spec = {
    years: new Date().getFullYear(),
    months: new Date().getMonth(),
    days: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    milliseconds: new Date().getMilliseconds()
  }) {
    super({
      value: typeof spec === "number" ? spec :
        +(spec.years ? spec.years * GregorianCalendar.year.duration : 0)
        + (spec.months ? spec.months * GregorianCalendar.month.duration : 0)
        + (spec.days ? spec.days * GregorianCalendar.day.duration : 0)
        + (spec.hours ? spec.hours * GregorianCalendar.hour.duration : 0)
        + (spec.minutes ? spec.minutes * GregorianCalendar.minute.duration : 0)
        + (spec.seconds ? spec.seconds * GregorianCalendar.second.duration : 0)
    }, new CalendarUnit("millisecond", 0, Number.MAX_SAFE_INTEGER, undefined))
  }

  toString (renderer = Level0DurationRenderer.instance) {
    return renderer.render(this)
  }

  /**
   * @param {string} str
   * @param {Level0DurationParser} [parser]
   * @return {Level0Duration}
   */
  static fromString (str, parser = new Level0DurationParser()) {
    return new Level0Duration(parser.parse(str))
  }

  /**
   * @param {Level0Date} beforeDate
   * @param {Level0Date} afterDate
   * @return {Level0Duration}
   */
  static between (beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level0Duration(afterTime - beforeTime)
  }
}
