import Level0DateParser from "./Level0DateParser.mjs"
import { EDTFValidator } from "../../calendar/unit/validator/EDTFValidator.mjs"
import Level0Year from "../year/Level0Year.mjs"
import Level0Month from "../month/Level0Month.mjs"
import Level0Day from "../day/Level0Day.mjs"
import Level0Hour from "../hour/Level0Hour.mjs"
import Level0Minute from "../minute/Level0Minute.mjs"
import Level0Second from "../second/Level0Second.mjs"
import Level0Timeshift from "../timeshift/Level0Timeshift.mjs"

/**
 * @typedef {Object} Level0DateSpec
 * @property {Level0Year|number} year
 * @property {Level0Month|number} month
 * @property {Level0Day|number} day
 * @property {Level0Hour|number} hour
 * @property {Level0Minute|number} minute
 * @property {Level0Second|number} second
 * @property {Level0Timeshift|number} timeshift
 */

/**
 * @template Y extends Level0Component = Level0Year
 * @template M extends Level0Component = Level0Month
 * @template D extends Level0Component = Level0Day
 * @template H extends Level0Component = Level0Hour
 * @template M extends Level0Component = Level0Minute
 * @template S extends Level0Component = Level0Second
 * @template Z extends Level0Component = Level0Timeshift
 */
export default class Level0Date {
  /**
   * @readonly
   * @type Y
   */
  year

  /**
   * @readonly
   * @type {M}
   */
  month

  /**
   * @readonly
   * @type {D}
   */
  day

  /**
   * @readonly
   * @type {H}
   */
  hour

  /**
   * @readonly
   * @type {M}
   */
  minute

  /**
   * @readonly
   * @type {S}
   */
  second

  /**
   * @readonly
   * @type {Z}
   */
  timeshift

  /**
   * @param {Level0DateSpec} spec
   */
  constructor (spec= {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate(), hour: new Date().getHours(), minute: new Date().getMinutes(), second: new Date().getSeconds(), timeshift: new Date().getTimezoneOffset()}) {
    const year = spec.year
    this.year = typeof year === "number" ? new Level0Year(year) : year
    const month = spec.month
    this.month = typeof month === "number" ? new Level0Month(month) : month
    const day = spec.day
    this.day = typeof day === "number" ? new Level0Day(day) : day
    const hour = spec.hour
    this.hour = typeof hour === "number" ? new Level0Hour(hour) : hour
    const minute = spec.minute
    this.minute = typeof minute === "number" ? new Level0Minute(minute) : minute
    const second = spec.second
    this.second = typeof second === "number" ? new Level0Second(second) : second
    const timeshift = spec.timeshift
    this.timeshift = typeof timeshift === "number" ? new Level0Timeshift(timeshift) : timeshift
  }

  /**
   * @protected
   * @param other
   */
  checkOtherType (other) {
    if (this.constructor.name !== other.constructor.name) {
      throw new EDTFValidator(`Date "${this.toString()}" cannot be compared with "${other.toString()}"`)
    }
  }

  /**
   * @param {Level0Date} other
   * @return {number}
   */
  compare (other) {
    this.checkOtherType(other)
    return this.getTime() - other.getTime()
  }

  /**
   * How many milliseconds since 0000-00-00T00:00:00.
   *
   * @return {number}
   */
  getTime () {
    return (this.year?.duration || 0)
      + (this.month?.duration || 0)
      + (this.day?.duration || 0)
      + (this.hour?.duration || 0)
      + (this.minute?.duration || 0)
      + (this.second?.duration || 0)
  }

  /**
   * @param {Level0Date} other
   * @return {boolean}
   */
  isEqual (other) {
    return this.compare(other) === 0
  }

  /**
   * @param {Level0Component} other
   * @return {boolean}
   */
  isBefore (other) {
    return this.compare(other) < 0
  }

  /**
   * @param {Level0Component} other
   * @return {boolean}
   */
  isAfter (other) {
    return this.compare(other) > 0
  }

  toString () {
    const dateCompStr = []
    if (this.year) {
      dateCompStr.push(this.year.toString())
    }
    if (this.month) {
      dateCompStr.push(this.month.toString())
    }
    if (this.day) {
      dateCompStr.push(this.day.toString())
    }
    const hourCompStr = []
    if (this.hour) {
      hourCompStr.push(this.hour.toString())
    }
    if (this.minute) {
      hourCompStr.push(this.minute.toString())
    }
    if (this.second) {
      hourCompStr.push(this.second.toString())
    }
    const dateStr = dateCompStr.join("-")
    const hourStr = hourCompStr.join(":") + (this.timeshift ? this.timeshift.toString() : "")
    return dateStr + (hourStr.length > 0 ? "T" + hourStr : "")
  }

  /**
   * @param {string} spec
   * @return {Level0Date}
   */
  static fromString (spec) {
    const parser = /** Level0DateParser<Level0Year, Level0Month, Level0Day> */ new Level0DateParser()
    const { year, month, day, hour, minute, second, timeshift } = parser.parse(spec)
    return new Level0Date({year, month, day, hour, minute, second, timeshift})
  }

  /**
   * @return {Level0Date}
   */
  static newInstance () {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level0Date.fromString(edtfNow)
  }
}
