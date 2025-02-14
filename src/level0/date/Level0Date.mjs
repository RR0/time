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
import { level0Factory, Level0Factory } from "../Level0Factory.mjs"
import { Level0Duration } from "../duration/index.mjs"
/** @import { Level0Component } from "../component/index.mjs" */
/** @import { EDTFParser } from "../../EDTFParser.mjs" */

/**
 * @typedef {Object} Level0DateSpec
 * @property {Level0Year|number} [year]
 * @property {Level0Month|number} [month]
 * @property {Level0Day|number} [day]
 * @property {Level0Hour|number} [hour]
 * @property {Level0Minute|number} [minute]
 * @property {Level0Second|number} [second]
 * @property {Level0Timeshift|number} [timeshift]
 */

/**
 * @template {Level0Year} [Y = Level0Year]
 * @template {Level0Month} [MM = Level0Month]
 * @template {Level0Day} [D = Level0Day]
 * @template {Level0Hour} [H = Level0Hour]
 * @template {Level0Minute} [M = Level0Minute]
 * @template {Level0Second} [S = Level0Second]
 * @template {Level0Timeshift} [Z = Level0Timeshift]
 */
export class Level0Date {
  /**
   * @type {Level0Year|undefined}
   */
  #year

  /**
   * @template {Level0Month} MM=Level0Month
   * @type {MM|undefined}
   */
  #month

  /**
   * @template D=Level0Day
   * @type D
   */
  #day
  /**
   * @type {H|undefined}
   */
  #hour
  /**
   * @type {M|undefined}
   */
  #minute
  /**
   * @type {S|undefined}
   */
  #second
  /**
   * @readonly
   * @type {Level0Timeshift}
   */
  #timeshift

  /**
   * @param {Level0DateSpec} [spec]
   */
  constructor(spec = {
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
   * @return {Y|undefined}
   */
  get year() {
    return this.#year
  }

  /**
   * @param {Y|number|undefined} value
   */
  set year(value) {
    if (this.#year && value) {
      this.#year.value = value
    } else {
      this.#year = typeof value === "number" ? this.factory.newYear(value) : value
    }
  }

  /**
   * @return {MM|undefined}
   */
  get month() {
    return this.#month
  }

  /**
   * @param {MM|number|undefined} value
   */
  set month(value) {
    if (this.#month && value) {
      this.#month.value = value
    } else {
      this.#month = typeof value === "number" ? this.factory.newMonth(value) : value
    }
  }

  /**
   * @return {D|undefined}
   */
  get day() {
    return this.#day
  }

  /**
   * @param {D|number|undefined} value
   */
  set day(value) {
    if (this.#day && value) {
      this.#day.value = value
    } else {
      this.#day = typeof value === "number" ? this.factory.newDay(value) : value
    }
  }

  /**
   * @return {H|undefined}
   */
  get hour() {
    return this.#hour
  }

  /**
   * @param {H|number|undefined} value
   */
  set hour(value) {
    if (this.#hour && value) {
      this.#hour.value = value
    } else {
      this.#hour = typeof value === "number" ? this.factory.newHour(value) : value
    }
  }

  /**
   * @return {M||undefined}
   */
  get minute() {
    return this.#minute
  }

  /**
   * @param {M|number|undefined} value
   */
  set minute(value) {
    if (this.#minute && value) {
      this.#minute.value = value
    } else {
      this.#minute = typeof value === "number" ? this.factory.newMinute(value) : value
    }
  }

  /**
   * @return {S|undefined}
   */
  get second() {
    return this.#second
  }

  /**
   * @param {S|number|undefined} value
   */
  set second(value) {
    if (this.#second && value) {
      this.#second.value = value
    } else {
      this.#second = typeof value === "number" ? this.factory.newSecond(value) : value
    }
  }

  /**
   * @return {Level0Timeshift|undefined}
   */
  get timeshift() {
    return this.#timeshift
  }

  /**
   * @param {Level0Timeshift|number|undefined} value
   */
  set timeshift(value) {
    if (this.#timeshift && value) {
      this.#timeshift.value = value
    } else {
      this.#timeshift = typeof value === "number" ? new Level0Timeshift(value) : value
    }
  }

  /**
   * @type {Level0Factory}
   */
  get factory() {
    return level0Factory
  }

  /**
   * @param {string} spec
   * @param {EDTFParser} parser
   * @return {Level0Date}
   */
  static fromString(spec, parser = new Level0DateParser()) {
    const { year, month, day, hour, minute, second, timeshift } = parser.parse(spec)
    return new Level0Date({ year, month, day, hour, minute, second, timeshift })
  }

  /**
   * Creates a level 0 current date.
   *
   * @return {Level0Date}
   */
  static newInstance() {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level0Date.fromString(edtfNow)
  }

  /**
   * @protected
   * @param other
   */
  #checkOtherType(other) {
    if (this.constructor.name !== other.constructor.name) {
      throw new EDTFValidator(`Date "${this.toString()}" cannot be compared with "${other.toString()}"`)
    }
  }

  /**
   * Return the difference between this date and a previous one.
   *
   * @param {Level0Date} other A date before.
   * @return {number} The difference, in milliseconds.
   */
  compare(other) {
    this.#checkOtherType(other)
    return this.getTime() - other.getTime()
  }

  /**
   * Returns the duration between this date and a previous one.
   * Basically, it is a Duration built from #compare()
   *
   * @param {typeof this} other A date before.
   * @return {Level0Duration}
   */
  delta(other) {
    const delta = this.compare(other)
    return new Level0Duration(delta)
  }

  /**
   * How many milliseconds since 0000-00-00T00:00:00.
   *
   * @return {number}
   */
  getTime() {
    return (this.year?.duration || 0)
      + (this.month?.duration || 0)
      + (this.day?.duration || 0)
      + (this.hour?.duration || 0)
      + (this.minute?.duration || 0)
      + (this.second?.duration || 0)
  }

  /**
   * @param {typeof this} other
   * @return {boolean}
   */
  isEqual(other) {
    return this.compare(other) === 0
  }

  /**
   * @param {typeof this} other
   * @return {boolean}
   */
  isBefore(other) {
    return this.compare(other) < 0
  }

  /**
   * @param {typeof this} other
   * @return {boolean}
   */
  isAfter(other) {
    return this.compare(other) > 0
  }

  toString(renderer = Level0DateRenderer.instance) {
    return renderer.render(this)
  }
}
