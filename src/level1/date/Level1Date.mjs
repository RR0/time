import { Level0Date } from "../../level0/index.mjs"
import { Level1DateParser } from "./Level1DateParser.mjs"
import { Level1Year } from "../year/index.mjs"
import { Level1Second } from "../second/index.mjs"
import { Level1Minute } from "../minute/index.mjs"
import { Level1Hour } from "../hour/index.mjs"
import { Level1Day } from "../day/index.mjs"
import { Level1Month } from "../month/index.mjs"
import { level1Factory, Level1Factory } from "../Level1Factory.mjs"
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { Level0DateSpec } from "../../level0/date/Level0Date.mjs" */
/** @import { Level1Component } from "../component/index.mjs" */
/** @import { Level1Timeshift } from "../timeshift/index.mjs" */

/**
 * @typedef {Level0DateSpec} Level1DateSpec
 */

/**
 * @template {Level1Year} [Y = Level1Year]
 * @template {Level1Month} [MM = Level1Month]
 * @template {Level1Day} [D = Level1Day]
 * @template {Level1Hour} [H = Level1Hour]
 * @template {Level1Minute} [M = Level1Minute]
 * @template {Level1Second} [S = Level1Second]
 * @template {Level1Timeshift} [Z = Level1Timeshift]
 * @extends {Level0Date<Level1Year, Level1Month, Level1Day, Level1Hour, Level1Minute, Level1Second, Level1Timeshift>}
 */
export class Level1Date extends Level0Date {
  /**
   * @param {Level1DateSpec} [spec]
   */
  constructor(spec) {
    super(spec)
  }

  /**
   * @type {Level1Factory}
   */
  get factory() {
    return level1Factory
  }

  /**
   * @return boolean
   */
  get uncertain() {
    return this.year?.uncertain === true || this.month?.uncertain === true || this.day?.uncertain === true || this.hour?.uncertain === true || this.minute?.uncertain === true || this.second?.uncertain === true
  }

  /**
   * @return boolean
   */
  get approximate() {
    return this.year?.approximate === true || this.month?.approximate === true || this.day?.approximate === true || this.hour?.approximate === true || this.minute?.approximate === true || this.second?.approximate === true
  }

  /**
   * @param {Date} date
   * @return {Level1Date}
   */
  static fromDate(date) {
    return new Level1Date({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getSeconds(),
      second: date.getSeconds(),
      timeshift: date.getTimezoneOffset()
    })
  }

  /**
   * @param {string} str An EDTF level 0-1 string
   * @param {EDTFParser} parser
   * @return {Level1Date}
   */
  static fromString(str, parser = new Level1DateParser()) {
    const spec = parser.parse(str)
    return new Level1Date(spec)
  }

  static newInstance() {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level1Date.fromString(edtfNow)
  }
}
