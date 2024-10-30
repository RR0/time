import { Level2DurationParser } from "./Level2DurationParser.mjs"
import { Level2Year } from "../year/index.mjs"
import { Level2Month } from "../month/index.mjs"
import { Level2Day } from "../day/index.mjs"
import { Level2Hour } from "../hour/index.mjs"
import { Level2Minute } from "../minute/index.mjs"
import { Level2Second } from "../second/index.mjs"
import { Level1Duration } from "../../level1/index.mjs"
import { EDTFParser } from "../../EDTFParser.mjs"
import { level2DurationFactory } from "../Level2Factory.mjs"
import { Level2DurationRenderer } from "./Level2DurationRenderer.mjs"
import { durationUnits } from "../../level0/duration/DurationUnits.mjs"
import { Level2ComponentParser } from "../component/Level2ComponentParser.mjs"
import { Level2DateParser } from "../date/Level2DateParser.mjs"

/**
 * @typedef {Object} Level2DurationInSpec
 * @property {Level2Year|number} years
 * @property {Level2Month|number} months
 * @property {Level2Day|number} days
 * @property {Level2Hour|number} hours
 * @property {Level2Minute|number} minutes
 * @property {Level2Second|number} seconds
 * @property {Level2Millisecond|number} [milliseconds]
 */

/**
 * @typedef {Object} Level2DurationOutSpec
 * @property {Level2Year} years
 * @property {Level2Month} months
 * @property {Level2Day} days
 * @property {Level2Hour} hours
 * @property {Level2Minute} minutes
 * @property {Level2Second} seconds
 * @property {Level2Millisecond} [milliseconds]
 */

/**
 * @template Y=Level2Year
 * @template M=Level2Month
 * @template D=Level2Day
 * @template H=Level2Hour
 * @template M=Level2Minute
 * @template S=Level2Second
 * @template C=Level2Millisecond
 * @template DD=Level2Date
 */
export class Level2Duration extends Level1Duration {
  /**
   * @param {Level2DurationInSpec|number} spec The duration spec in years, months, etc., or value in milliseconds.
   */
  constructor (spec) {
    super(
      typeof spec === "number" ? spec :
        {
          value: Level2Duration.valueFromSpec(spec),
          uncertain: Level2Duration.getBoolean(spec, Level2ComponentParser.uncertainGroup),
          approximate: Level2Duration.getBoolean(spec, "approximate")
        },
      durationUnits.millisecond
    )
  }

  /**
   * @param spec
   * @return {number}
   */
  static valueFromSpec (spec) {
    return Level2Duration.getValue(spec, Level2DateParser.yearGroup)
      + Level2Duration.getValue(spec, Level2DateParser.monthGroup)
      + Level2Duration.getValue(spec, Level2DateParser.dayGroup)
      + Level2Duration.getValue(spec, Level2DateParser.hourGroup)
      + Level2Duration.getValue(spec, Level2DateParser.minuteGroup)
      + Level2Duration.getValue(spec, Level2DateParser.secondGroup)
  }

  /**
   * @template S=Level2DurationOutSpec
   * @return {S}
   */
  toSpec () {
    return Level2Duration.toSpec(this)
  }

  /**
   * @template D=Level2Duration
   * @template O=Level2DurationOutSpec
   * @param {D} comp
   * @param {LevelFactory} [factory]
   * @return {O}
   */
  static toSpec (comp, factory = level2DurationFactory) {
    return Level1Duration.toSpec(comp, factory)
  }

  /**
   * @param {Level2DurationRenderer} renderer
   * @return {string}
   */
  toString (renderer = Level2DurationRenderer.instance) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str The duration string to parse.
   * @param {EDTFParser} [parser] The parser to use.
   * @return {Level2Duration}
   */
  static fromString (str, parser = new Level2DurationParser()) {
    const parsed = parser.parse(str)
    return new Level2Duration(parsed)
  }

  /**
   * @param {DD} beforeDate
   * @param {DD} afterDate
   * @return {Level2Duration}
   */
  static between (beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level2Duration(afterTime - beforeTime)
  }
}
