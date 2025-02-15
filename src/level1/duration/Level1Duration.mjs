import { Level1DurationParser } from "./Level1DurationParser.mjs"
import { Level1Component } from "../component/Level1Component.mjs"
import { level0Calendar } from "../../calendar/index.mjs"
import { Level1DateParser } from "../date/Level1DateParser.mjs"
import { Level1ComponentParser } from "../component/Level1ComponentParser.mjs"
import { durationUnits, Level0Duration } from "../../level0/index.mjs"
import { level1DurationFactory } from "../Level1Factory.mjs"
import { Level1DurationRenderer } from "./Level1DurationRenderer.mjs"
/** @import { Level0Date } from "../date/Level0Date.mjs" */
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { LevelFactory } from "../../LevelFactory.mjs" */
/** @import { Level1Date } from "../date/Level1Date.mjs" */
/** @import { Level1Year } from "../year/Level1Year.mjs" */
/** @import { Level1Month } from "../month/Level1Month.mjs" */
/** @import { Level1Day } from "../day/Level1Day.mjs" */
/** @import { Level1Hour } from "../hour/Level1Hour.mjs" */
/** @import { Level1Minute } from "../minute/Level1Minute.mjs" */
/** @import { Level1Second } from "../second/Level1Second.mjs" */

/**
 * @typedef {Object} Level1DurationInSpec
 * @property {Level1Year|number} [years]
 * @property {Level1Month|number} [months]
 * @property {Level1Day|number} [days]
 * @property {Level1Hour|number} [hours]
 * @property {Level1Minute|number} [minutes]
 * @property {Level1Second|number} [seconds]
 * @property {Level1Millisecond|number} [milliseconds]
 * @property {boolean} [uncertain]
 * @property {boolean} [approximate]
 */

/**
 * @typedef {Object} Level1DurationOutSpec
 * @property {Level1Year} [years]
 * @property {Level1Month} [months]
 * @property {Level1Day} [days]
 * @property {Level1Hour} [hours]
 * @property {Level1Minute} [minutes]
 * @property {Level1Second} [seconds]
 * @property {Level1Millisecond} [milliseconds]
 * @property {boolean} [uncertain]
 * @property {boolean} [approximate]
 */

/**
 * @template {Level1Year} [Y = Level1Year]
 * @template {Level1Month} [M = Level1Month]
 * @template {Level1Day} [D = Level1Day]
 * @template {Level1Hour} [H = Level1Hour]
 * @template {Level1Minute} [M = Level1Minute]
 * @template {Level1Second} [S = Level1Second]
 * @template {Level1Millisecond} [C = Level1Millisecond]
 */
export class Level1Duration extends Level1Component {
  /**
   * @param {Level1DurationInSpec|number} spec
   */
  constructor(spec) {
    super(
      typeof spec === "number" || spec.hasOwnProperty("value") ? spec :
        {
          value: Level1Duration.getValue(spec, Level1DateParser.yearGroup)
            + Level1Duration.getValue(spec, Level1DateParser.monthGroup)
            + Level1Duration.getValue(spec, Level1DateParser.dayGroup)
            + Level1Duration.getValue(spec, Level1DateParser.hourGroup)
            + Level1Duration.getValue(spec, Level1DateParser.minuteGroup)
            + Level1Duration.getValue(spec, Level1DateParser.secondGroup),
          uncertain: Level1Duration.getBoolean(spec, Level1ComponentParser.uncertainGroup),
          approximate: Level1Duration.getBoolean(spec, "approximate")
        },
      durationUnits.millisecond
    )
  }

  /**
   * @protected
   * @param spec
   * @param {string} durCompName
   * @return {boolean}
   */
  static getBoolean(spec, durCompName) {
    return spec[durCompName]
      || (spec[Level1DateParser.yearGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.monthGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.dayGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.hourGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.minuteGroup + "s"])?.[durCompName]
      || (spec[Level1DateParser.secondGroup + "s"])?.[durCompName]
      || false
  }

  /**
   * @protected
   * @param spec The object containing group values.
   * @param {string} durCompGroupName The regex duration component group name (for year, month, etc.) as singular.
   * @return {number}
   */
  static getValue(spec, durCompGroupName) {
    let time = 0
    let durationValue = spec[durCompGroupName + "s"]  // Duration components names are suffixed with plural.
    if (durationValue instanceof Level1Component) {
      durationValue = durationValue.value
    } else if (typeof spec === "number") {
      durationValue = spec
    }
    if (durationValue) {
      const unit = /** @type CalendarUnit */ level0Calendar[durCompGroupName]
      time = durationValue * unit.duration
    }
    return time
  }

  /**
   * @param {Level1Duration} comp
   * @param {LevelFactory} [factory]
   * @return {Level1DurationOutSpec}
   */
  static toSpec(comp, factory = level1DurationFactory) {
    const level0Spec = Level0Duration.toSpec(comp, factory)
    return {
      ...level0Spec,
      uncertain: comp.uncertain || false,
      approximate: comp.approximate || false
    }
  }

  /**
   * @param {string} str The duration string to parse.
   * @param {EDTFParser} [parser]
   * @return {Level1Duration}
   */
  static fromString(str, parser = new Level1DurationParser()) {
    const parsed = parser.parse(str)
    return new Level1Duration(parsed)
  }

  /**
   * @param {Level1Date} beforeDate
   * @param {Level1Date} afterDate
   * @return {Level1Duration}
   */
  static between(beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level1Duration(afterTime - beforeTime)
  }

  toString(renderer = Level1DurationRenderer.instance) {
    return super.toString(renderer)
  }

  /**
   * @return {Level1DurationOutSpec}
   */
  toSpec() {
    return Level1Duration.toSpec(this)
  }
}
