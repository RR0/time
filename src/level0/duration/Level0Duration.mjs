import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"
import Level0DurationParser from "./Level0DurationParser.mjs"

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
export default class Level0Duration {
  /**
   * @readonly
   * @type number
   */
  millis

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
    const years = spec.years
    const months = spec.months
    const days = spec.days
    const hours = spec.hours
    const minutes = spec.minutes
    const seconds = spec.seconds
    this.millis = typeof spec === "number" ? spec :
      +(years ? years * GregorianCalendar.year.duration : 0)
      + (months ? months * GregorianCalendar.month.duration : 0)
      + (days ? days * GregorianCalendar.day.duration : 0)
      + (hours ? hours * GregorianCalendar.hour.duration : 0)
      + (minutes ? minutes * GregorianCalendar.minute.duration : 0)
      + (seconds ? seconds * GregorianCalendar.second.duration : 0)
  }

  toString () {
    let string = "P"
    let millis = this.millis
    const yearDuration = millis / GregorianCalendar.year.duration
    const years = Math.floor(yearDuration)
    if (years > 0) {
      string += years + "Y"
      millis -= GregorianCalendar.year.duration
    }
    const monthDuration = millis / GregorianCalendar.month.duration
    const months = Math.floor(monthDuration)
    if (months > 0) {
      string += months + "MM"
      millis -= GregorianCalendar.month.duration
    }
    const dayDuration = millis / GregorianCalendar.day.duration
    const days = Math.floor(dayDuration)
    if (days > 0) {
      string += days + "D"
      millis -= GregorianCalendar.day.duration
    }
    const hourDuration = millis / GregorianCalendar.hour.duration
    const hours = Math.floor(hourDuration)
    if (hours > 0) {
      string += hours + "H"
      millis -= GregorianCalendar.hour.duration
    }
    const minuteDuration = millis / GregorianCalendar.minute.duration
    const minutes = Math.floor(minuteDuration)
    if (minutes > 0) {
      string += minutes + "M"
      millis -= GregorianCalendar.minute.duration
    }
    const secondDuration = millis / GregorianCalendar.second.duration
    const seconds = Math.floor(secondDuration)
    if (seconds > 0) {
      string += seconds + "S"
      // millis -= GregorianCalendar.second.duration
    }
    return string
  }

  /**
   * @param {string} str
   * @return {Level0Duration}
   */
  static fromString (str) {
    const parser = new Level0DurationParser()
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
