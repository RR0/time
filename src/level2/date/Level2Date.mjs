import { Level2DateParser } from "./Level2DateParser.mjs"
import { Level1Date } from "../../level1/date/Level1Date.mjs"
import { level2Factory } from "../Level2Factory.mjs"
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { Level2Day } from "../day/index.mjs" */

/**
 * @typedef {Object} Level2DateSpec
 * @property {Level2Year|number} year
 * @property {Level2Month|number} [month]
 * @property {Level2Day|number} [day]
 * @property {Level2Hour|number} [hour]
 * @property {Level2Minute|number} [minute]
 * @property {Level2Second|number} [second]
 * @property {Level2Timeshift|number} [timeshift]
 */

/**
 * A level 2 EDTF Date.
 *
 * @template {Level2Year} Y = Level2Year
 * @template {Level2Month} MM = Level2Month
 * @template {Level2Day} D = Level2Day
 * @template {Level2Hour} H = Level2Hour
 * @template {Level2Minute} M = Level2Minute
 * @template {Level2Second} S = Level2Second
 * @template {Level2Timeshift} Z = Level2Timeshift
 */
export class Level2Date extends /** @type {Level1Date<Level2Year, Level2Month, Level2Day, Level2Hour, Level2Minute, Level2Second, Level2Timeshift>}*/ Level1Date {
  /**
   * @param {Level2DateSpec} spec
   */
  constructor(spec) {
    super(spec)
  }

  /**
   * @readonly
   * @type {Level2Factory}
   */
  get factory() {
    return level2Factory
  }

  /**
   * @param {string} str An EDTF level 0-2 string
   * @param {EDTFParser} parser
   * @return {Level2Date}
   */
  static fromString(str, parser = new Level2DateParser()) {
    const spec = parser.parse(str)
    return new Level2Date(spec)
  }

  static newInstance() {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level2Date.fromString(edtfNow)
  }
}
