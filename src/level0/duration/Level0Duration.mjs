import { CalendarUnit, level0Calendar } from "../../calendar/index.mjs"
import { Level0DurationParser } from "./Level0DurationParser.mjs"
import { Level0Year } from "../year/index.mjs"
import { Level0Month } from "../month/index.mjs"
import { Level0Day } from "../day/index.mjs"
import { Level0Hour } from "../hour/index.mjs"
import { Level0Minute } from "../minute/index.mjs"
import { Level0Second } from "../second/index.mjs"
import { Level0DurationRenderer } from "./Level0DurationRenderer.mjs"
import { Level0Component } from "../component/index.mjs"
import { level0DurationFactory } from "../Level0Factory.mjs"
/** @import { Level0Date } from "../date/Level0Date.mjs" */
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { LevelFactory } from "../../LevelFactory.mjs" */

/**
 * @typedef {Object} Level0DurationInSpec
 * @property {Level0Year|number} [years]
 * @property {Level0Month|number} [months]
 * @property {Level0Day|number} [days]
 * @property {Level0Hour|number} [hours]
 * @property {Level0Minute|number} [minutes]
 * @property {Level0Second|number} [seconds]
 * @property {Level0Millisecond|number} [milliseconds]
 */

/**
 * @typedef {Object} Level0DurationOutSpec
 * @property {Level0Year} [years]
 * @property {Level0Month} [months]
 * @property {Level0Day} [days]
 * @property {Level0Hour} [hours]
 * @property {Level0Minute} [minutes]
 * @property {Level0Second} [seconds]
 * @property {Level0Millisecond} [milliseconds]
 */

/**
 * @template {Level0Year} Y = [Level0Year]
 * @template {Level0Month} M = [Level0Month]
 * @template {Level0Day} D = [Level0Day]
 * @template {Level0Hour} H = [Level0Hour]
 * @template {Level0Minute} M = [Level0Minute]
 * @template {Level0Second} S = [Level0Second]
 * @template {Level0Millisecond} C = [Level0Millisecond]
 */
export class Level0Duration extends Level0Component {
  /**
   * @param {Level0DurationInSpec|number} spec
   */
  constructor(spec = {
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
        +(spec.years ? spec.years * level0Calendar.year.duration : 0)
        + (spec.months ? spec.months * level0Calendar.month.duration : 0)
        + (spec.days ? spec.days * level0Calendar.day.duration : 0)
        + (spec.hours ? spec.hours * level0Calendar.hour.duration : 0)
        + (spec.minutes ? spec.minutes * level0Calendar.minute.duration : 0)
        + (spec.seconds ? spec.seconds * level0Calendar.second.duration : 0)
    }, new CalendarUnit("millisecond", 0, Number.MAX_SAFE_INTEGER, undefined))
  }

  /**
   * @template F=Level0Factory
   * @param {Level0Duration | number} value Duration or milliseconds
   * @param {F} [factory] The factory to create duration components (year, month, etc.)
   * @return {Level0DurationOutSpec}
   */
  static toSpec(value, factory = level0DurationFactory) {
    let millis = typeof value === "number" ? value : value.value
    const sign = millis > 0 ? 1 : -1
    millis = Math.abs(millis)
    const spec = /** @type Level0DurationOutSpec */ {}
    const yearDuration = millis / level0Calendar.year.duration
    const years = Math.floor(yearDuration)
    if (years > 0) {
      spec.years = factory.newYear(sign * years)
      millis -= years * level0Calendar.year.duration
    }
    const monthDuration = millis / level0Calendar.month.duration
    const months = Math.floor(monthDuration)
    if (months > 0) {
      spec.months = factory.newMonth(sign * months)
      millis -= months * level0Calendar.month.duration
    }
    const dayDuration = millis / level0Calendar.day.duration
    const days = Math.floor(dayDuration)
    if (days > 0) {
      spec.days = factory.newDay(sign * days)
      millis -= days * level0Calendar.day.duration
    }
    const hourDuration = millis / level0Calendar.hour.duration
    const hours = Math.floor(hourDuration)
    if (hours > 0) {
      spec.hours = factory.newHour(sign * hours)
      millis -= hours * level0Calendar.hour.duration
    }
    const minuteDuration = millis / level0Calendar.minute.duration
    const minutes = Math.floor(minuteDuration)
    if (minutes > 0) {
      spec.minutes = factory.newMinute(sign * minutes)
      millis -= minutes * level0Calendar.minute.duration
    }
    const secondDuration = millis / level0Calendar.second.duration
    const seconds = Math.floor(sign * secondDuration)
    if (seconds > 0) {
      spec.seconds = factory.newSecond(seconds)
    }
    return spec
  }

  /**
   * @param {string} str
   * @param {EDTFParser} [parser]
   * @return {Level0Duration}
   */
  static fromString(str, parser = new Level0DurationParser()) {
    return new Level0Duration(parser.parse(str))
  }

  /**
   * @param {Level0Date} beforeDate
   * @param {Level0Date} afterDate
   * @return {Level0Duration}
   */
  static between(beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level0Duration(afterTime - beforeTime)
  }

  /**
   * @return {Level0DurationOutSpec}
   */
  toSpec() {
    return Level0Duration.toSpec(this)
  }

  toString(renderer = Level0DurationRenderer.instance) {
    return renderer.render(this)
  }
}
