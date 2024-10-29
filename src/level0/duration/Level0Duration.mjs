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
import { Level0Factory } from "../Level0Factory.mjs"
/** @import { Level0Date } from "../date/Level0Date.mjs" */
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { LevelFactory } from "../../LevelFactory.mjs" */

/**
 * @typedef {Object} Level0DurationInSpec
 * @property {Level0Year|number} years
 * @property {Level0Month|number} months
 * @property {Level0Day|number} days
 * @property {Level0Hour|number} hours
 * @property {Level0Minute|number} minutes
 * @property {Level0Second|number} seconds
 * @property {Level0Millisecond|number} [milliseconds]
 */
/**
 * @typedef {Object} Level0DurationOutSpec
 * @property {Level0Year} years
 * @property {Level0Month} months
 * @property {Level0Day} days
 * @property {Level0Hour} hours
 * @property {Level0Minute} minutes
 * @property {Level0Second} seconds
 * @property {Level0Millisecond} [milliseconds]
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
   * @param {Level0DurationInSpec|number} spec
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

  /**
   * @return {Level0DurationOutSpec}
   */
  toSpec () {
    return Level0Duration.toSpec(this)
  }

  /**
   * @template F=Level0Factory
   * @param {Level0Duration | number} value Duration or milliseconds
   * @param {F} [factory] The factory to create duration components (year, month, etc.)
   * @return {Level0DurationOutSpec}
   */
  static toSpec (value, factory = Level0Factory.instance) {
    let millis = typeof value === "number" ? value : value.value
    const spec = /** @type Level0DurationOutSpec */ {}
    const yearDuration = millis / GregorianCalendar.year.duration
    const years = Math.floor(yearDuration)
    if (years > 0) {
      spec.years = factory.newYear(years)
      millis -= years * GregorianCalendar.year.duration
    }
    const monthDuration = millis / GregorianCalendar.month.duration
    const months = Math.floor(monthDuration)
    if (months > 0) {
      spec.months = factory.newMonth(months)
      millis -= months * GregorianCalendar.month.duration
    }
    const dayDuration = millis / GregorianCalendar.day.duration
    const days = Math.floor(dayDuration)
    if (days > 0) {
      spec.days = factory.newDay(days)
      millis -= days * GregorianCalendar.day.duration
    }
    const hourDuration = millis / GregorianCalendar.hour.duration
    const hours = Math.floor(hourDuration)
    if (hours > 0) {
      spec.hours = factory.newHour(hours)
      millis -= hours * GregorianCalendar.hour.duration
    }
    const minuteDuration = millis / GregorianCalendar.minute.duration
    const minutes = Math.floor(minuteDuration)
    if (minutes > 0) {
      spec.minutes = factory.newMinute(minutes)
      millis -= minutes * GregorianCalendar.minute.duration
    }
    const secondDuration = millis / GregorianCalendar.second.duration
    const seconds = Math.floor(secondDuration)
    if (seconds > 0) {
      spec.seconds = factory.newSecond(seconds)
    }
    return spec
  }

  toString (renderer = Level0DurationRenderer.instance) {
    return renderer.render(this)
  }

  /**
   * @param {string} str
   * @param {EDTFParser} [parser]
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
