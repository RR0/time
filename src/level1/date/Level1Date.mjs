import { Level0Date } from "../../level0/index.mjs"
import { Level1DateParser } from "./Level1DateParser.mjs"
import { Level1Year } from "../year/index.mjs"
import { Level1Second } from "../second/index.mjs"
import { Level1Minute } from "../minute/index.mjs"
import { Level1Hour } from "../hour/index.mjs"
import { Level1Day } from "../day/index.mjs"
import { Level1Month } from "../month/index.mjs"
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { Level0DateSpec } from "../../level0/date/Level0Date.mjs" */

/**
 * @typedef {Level0DateSpec} Level1DateSpec
 */

export class Level1Date extends /** @type {Level0Date<Level1Year, Level1Month, Level1Day, Level1Hour, Level1Minute, Level1Second, Level1Timeshift>} */ Level0Date {
  /**
   * @param {Level1DateSpec} spec
   */
  constructor (spec) {
    super(spec)
  }

  /**
   * @param {number} value
   * @return {Level1Year}
   */
  newYear (value) {
    return new Level1Year(value)
  }

  /**
   * @param {number} value
   * @return {Level1Month}
   */
  newMonth (value) {
    return new Level1Month(value)
  }

  /**
   * @param {number} value
   * @return {Level1Day}
   */
  newDay (value) {
    return new Level1Day(value)
  }

  /**
   * @param {number} value
   * @return {Level1Hour}
   */
  newHour (value) {
    return new Level1Hour(value)
  }

  /**
   * @param {number} value
   * @return {Level1Minute}
   */
  newMinute (value) {
    return new Level1Minute(value)
  }

  /**
   * @param {number} value
   * @return {Level1Second}
   */
  newSecond (value) {
    return new Level1Second(value)
  }

  /**
   * @param {string} str An EDTF level 0-1 string
   * @param {EDTFParser} parser
   * @return {Level1Date}
   */
  static fromString (str, parser = new Level1DateParser()) {
    const spec = parser.parse(str)
    return new Level1Date(spec)
  }

  static newInstance () {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level1Date.fromString(edtfNow)
  }

  /**
   * @return boolean
   */
  get uncertain () {
    return this.year?.uncertain === true || this.month?.uncertain === true || this.day?.uncertain === true || this.hour?.uncertain === true || this.minute?.uncertain === true || this.second?.uncertain === true
  }

  /**
   * @return boolean
   */
  get approximate () {
    return this.year?.approximate === true || this.month?.approximate === true || this.day?.approximate === true || this.hour?.approximate === true || this.minute?.approximate === true || this.second?.approximate === true
  }
}
