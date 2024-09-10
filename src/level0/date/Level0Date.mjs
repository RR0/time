import Level0DateParser from "./Level0DateParser.mjs"
import { EDTFValidator } from "../../validator/EDTFValidator.mjs"

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
   * @param {Y} year
   * @param {M} month
   * @param {D} day
   * @param {H} hour
   * @param {M} minute
   * @param {S} second
   * @param {Z} timeshift
   */
  constructor (year, month, day, hour, minute, second, timeshift) {
    this.year = year
    this.month = month
    this.day = day
    this.hour = hour
    this.minute = minute
    this.second = second
    this.timeshift = timeshift
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
    return new Level0Date(year, month, day, hour, minute, second, timeshift)
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
