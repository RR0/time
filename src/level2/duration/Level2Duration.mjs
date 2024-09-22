import { Level2DurationParser } from "./Level2DurationParser.mjs"
import { Level2Year } from "../year/index.mjs"
import { Level1Duration } from "../../level1/index.mjs"

/**
 * @typedef {Object} Level2DurationSpec
 * @property {Level2Year|number} years
 * @property {Level2Month|number} months
 * @property {Level2Day|number} days
 * @property {Level2Hour|number} hours
 * @property {Level2Minute|number} minutes
 * @property {Level2Second|number} seconds
 * @property {Level2Millisecond|number} [milliseconds]
 */

/**
 * @template Y extends Level2Component = Level2Year
 * @template M extends Level2Component = Level2Month
 * @template D extends Level2Component = Level2Day
 * @template H extends Level2Component = Level2Hour
 * @template M extends Level2Component = Level2Minute
 * @template S extends Level2Component = Level2Second
 * @template C extends Level2Component = Level2Millisecond
 */
export class Level2Duration extends Level1Duration {
  /**
   * @param {Level2DurationSpec|number} spec
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
    super(spec)
  }

  /**
   * @param {string} str The duration string to parse.
   * @param {Level2DurationParser} [parser] The parser to use.
   * @return {Level2Duration}
   */
  static fromString (str, parser = new Level2DurationParser()) {
    const parsed = parser.parse(str)
    return new Level2Duration(parsed)
  }

  /**
   * @param {Level2Date} beforeDate
   * @param {Level2Date} afterDate
   * @return {Level2Duration}
   */
  static between (beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level2Duration(afterTime - beforeTime)
  }
}
