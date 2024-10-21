import { Level0Date } from "../../level0/index.mjs"
import { Level1DateParser } from "./Level1DateParser.mjs"
import { Level1Year } from "../year/index.mjs"
import { Level1Second } from "../second/index.mjs"
import { Level1Minute } from "../minute/index.mjs"
import { Level1Hour } from "../hour/index.mjs"
import { Level1Day } from "../day/index.mjs"
import { Level1Month } from "../month/index.mjs"
import { Level1Factory } from "../Level1Factory.mjs"
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { Level0DateSpec } from "../../level0/date/Level0Date.mjs" */

/**
 * @typedef {Level0DateSpec} Level1DateSpec
 */

/**
 * @template Y extends Level1Component = Level1Year
 * @template MM extends Level1Component = Level1Month
 * @template D extends Level1Component = Level1Day
 * @template H extends Level1Component = Level1Hour
 * @template M extends Level1Component = Level1Minute
 * @template S extends Level1Component = Level1Second
 * @template Z extends Level1Component = Level1Timeshift
 */
export class Level1Date extends /** @type {Level0Date<Level1Year, Level1Month, Level1Day, Level1Hour, Level1Minute, Level1Second, Level1Timeshift>} */ Level0Date {
  /**
   * @readonly
   * @type {Level1Factory}
   */
  factory = new Level1Factory()

  /**
   * @param {Level1DateSpec} spec
   */
  constructor (spec) {
    super(spec)
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
