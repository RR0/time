import { Level0DateParser } from "./Level0DateParser.mjs"
import { EDTFValidator } from "../../calendar/index.mjs"
import { Level0Year } from "../year/index.mjs"
import { Level0Month } from "../month/index.mjs"
import { Level0Day } from "../day/Level0Day.mjs"
import { Level0Hour } from "../hour/index.mjs"
import { Level0Minute } from "../minute/index.mjs"
import { Level0Second } from "../second/index.mjs"
import { Level0Timeshift } from "../timeshift/index.mjs"
import { Level0DateRenderer } from "./Level0DateRenderer.mjs"

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
 * @template MM extends Level0Component = Level0Month
 * @template D extends Level0Component = Level0Day
 * @template H extends Level0Component = Level0Hour
 * @template M extends Level0Component = Level0Minute
 * @template S extends Level0Component = Level0Second
 * @template Z extends Level0Component = Level0Timeshift
 */
export class Level0Date {
  /**
   * @type {Level0Year|undefined}
   */
  #year

  /**
   * @return {Level0Year|undefined}
   */
  get year () {
    return this.#year
  }

  /**
   * @param {Level0Year|number|undefined} value
   */
  set year (value) {
    if (this.#year && value) {
      this.#year.value = value
    } else {
      this.#year = typeof value === "number" ? this.newYear(value) : value
    }
  }

  /**
   * @protected
   * @param {number} value
   * @return {Y}
   */
  newYear (value) {
    return new Level0Year(value)
  }

  /**
   * @type {Level0Month|undefined}
   */
  #month

  /**
   * @return {Level0Month|undefined}
   */
  get month () {
    return this.#month
  }

  /**
   * @param {Level0Month|number|undefined} value
   */
  set month (value) {
    if (this.#month && value) {
      this.#month.value = value
    } else {
      this.#month = typeof value === "number" ? this.newMonth(value) : value
    }
  }

  /**
   * @protected
   * @param {number} value
   * @return {Level0Month}
   */
  newMonth (value) {
    return new Level0Month(value)
  }

  /**
   * @type {Level0Day|undefined}
   */
  #day

  /**
   * @return {Level0Day|undefined}
   */
  get day () {
    return this.#day
  }

  /**
   * @param {Level0Day|number|undefined} value
   */
  set day (value) {
    if (this.#day && value) {
      this.#day.value = value
    } else {
      this.#day = typeof value === "number" ? this.newDay(value) : value
    }
  }

  /**
   * @protected
   * @param {number} value
   * @return {Level0Day}
   */
  newDay (value) {
    return new Level0Day(value)
  }

  /**
   * @type {Level0Hour|undefined}
   */
  #hour

  /**
   * @return {Level0Hour|undefined}
   */
  get hour () {
    return this.#hour
  }

  /**
   * @param {Level0Hour|number|undefined} value
   */
  set hour (value) {
    if (this.#hour && value) {
      this.#hour.value = value
    } else {
      this.#hour = typeof value === "number" ? this.newHour(value) : value
    }
  }

  /**
   * @protected
   * @param {number} value
   * @return {Level0Hour}
   */
  newHour (value) {
    return new Level0Hour(value)
  }

  /**
   * @type {Level0Minute|undefined}
   */
  #minute

  /**
   * @return {Level0Minute||undefined}
   */
  get minute () {
    return this.#minute
  }

  /**
   * @param {Level0Minute|number|undefined} value
   */
  set minute (value) {
    if (this.#minute && value) {
      this.#minute.value = value
    } else {
      this.#minute = typeof value === "number" ? this.newMinute(value) : value
    }
  }

  /**
   * @protected
   * @param {number} value
   * @return {Level0Minute}
   */
  newMinute (value) {
    return new Level0Minute(value)
  }

  /**
   * @type {Level0Second|undefined}
   */
  #second

  /**
   * @return {Level0Second|undefined}
   */
  get second () {
    return this.#second
  }

  /**
   * @param {Level0Second|number|undefined} value
   */
  set second (value) {
    if (this.#second && value) {
      this.#second.value = value
    } else {
      this.#second = typeof value === "number" ? this.newSecond(value) : value
    }
  }

  /**
   * @protected
   * @param {number} value
   * @return {Level0Second}
   */
  newSecond (value) {
    return new Level0Second(value)
  }

  /**
   * @readonly
   * @type {Level0Timeshift}
   */
  #timeshift

  /**
   * @return {Level0Timeshift|undefined}
   */
  get timeshift () {
    return this.#timeshift
  }

  /**
   * @param {Level0Timeshift|number|undefined} value
   */
  set timeshift (value) {
    if (this.#timeshift && value) {
      this.#timeshift.value = value
    } else {
      this.#timeshift = typeof value === "number" ? new Level0Timeshift(value) : value
    }
  }

  /**
   * @param {Level0DateSpec} spec
   */
  constructor (spec = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
    timeshift: new Date().getTimezoneOffset()
  }) {
    this.year = spec.year
    this.month = spec.month
    this.day = spec.day
    this.hour = spec.hour
    this.minute = spec.minute
    this.second = spec.second
    this.timeshift = spec.timeshift
  }

  /**
   * @protected
   * @param other
   */
  #checkOtherType (other) {
    if (this.constructor.name !== other.constructor.name) {
      throw new EDTFValidator(`Date "${this.toString()}" cannot be compared with "${other.toString()}"`)
    }
  }

  /**
   * @param {Level0Date} other
   * @return {number}
   */
  compare (other) {
    this.#checkOtherType(other)
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

  toString (renderer = Level0DateRenderer.instance) {
    return renderer.render(this)
  }

  /**
   * @param {string} spec
   * @param {Level0DateParser} parser
   * @return {Level0Date}
   */
  static fromString (spec, parser = new Level0DateParser()) {
    const { year, month, day, hour, minute, second, timeshift } = parser.parse(spec)
    return new Level0Date({ year, month, day, hour, minute, second, timeshift })
  }

  /**
   * Creates a level 0 current date.
   *
   * @return {Level0Date}
   */
  static newInstance () {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level0Date.fromString(edtfNow)
  }
}
