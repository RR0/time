import { DefaultParsers } from "../../DefaultParsers.mjs"
import { Level1Duration } from "../../level1/duration/Level1Duration.mjs"
import { EDTFParser } from "../../EDTFParser.mjs"
import { level2DurationFactory } from "../Level2Factory.mjs"
import { Level2DurationRenderer } from "./Level2DurationRenderer.mjs"
import { durationUnits } from "../../level0/duration/DurationUnits.mjs"
import { componentGroups } from "../../ComponentGroups.mjs"
import { Level1Component } from "../../level1/component/Level1Component.mjs"
/** @import { EDTFParser } from "../../EDTFParser.mjs" */
/** @import { LevelFactory } from "../../LevelFactory.mjs" */
/** @import { Level2Date } from "../date/Level2Date.mjs" */
/** @import { Level2Year } from "../year/Level2Year.mjs" */
/** @import { Level2Month } from "../month/Level2Month.mjs" */
/** @import { Level2Day } from "../day/Level2Day.mjs" */
/** @import { Level2Hour } from "../hour/Level2Hour.mjs" */
/** @import { Level2Minute } from "../minute/Level2Minute.mjs" */
/** @import { Level2Second } from "../second/Level2Second.mjs" */
/**
 * @typedef {Object} Level2DurationInSpec
 * @property {Level2Year|number} [years]
 * @property {Level2Month|number} [months]
 * @property {Level2Day|number} [days]
 * @property {Level2Hour|number} [hours]
 * @property {Level2Minute|number} [minutes]
 * @property {Level2Second|number} [seconds]
 * @property {Level2Millisecond|number} [milliseconds]
 */

/**
 * @typedef {Object} Level2DurationOutSpec
 * @property {Level2Year} [years]
 * @property {Level2Month} [months]
 * @property {Level2Day} [days]
 * @property {Level2Hour} [hours]
 * @property {Level2Minute} [minutes]
 * @property {Level2Second} [seconds]
 * @property {Level2Millisecond} [milliseconds]
 */

/**
 * @template {Level2Year} [Y=Level2Year]
 * @template {Level2Month} [M=Level2Month]
 * @template {Level2Day} [D=Level2Day]
 * @template {Level2Hour} [H=Level2Hour]
 * @template {Level2Minute} [M=Level2Minute]
 * @template {Level2Second} [S=Level2Second]
 * @template {Level2Millisecond} [C=Level2Millisecond]
 * @extends Level1Duration
 */
export class Level2Duration extends Level1Duration {
  /**
   * The components this duration was specified with, each with its own qualification, if any.
   *
   * @type {Level2DurationOutSpec|undefined}
   */
  #components

  /**
   * @param {Level2DurationInSpec|number} spec The duration spec in years, months, etc., or value in milliseconds.
   */
  constructor(spec) {
    super(
      typeof spec === "number" ? spec :
        {
          value: Level2Duration.valueFromSpec(spec),
          uncertain: spec.uncertain === true,
          approximate: spec.approximate === true
        },
      durationUnits.millisecond
    )
    if (typeof spec !== "number") {
      const components = {}
      for (const name of Level2Duration.componentNames) {
        if (spec[name] instanceof Level1Component) {
          components[name] = spec[name]
        }
      }
      if (Object.keys(components).length > 0) {
        this.#components = components
      }
    }
  }

  /**
   * @readonly
   * @type {string[]}
   */
  static componentNames = ["years", "months", "days", "hours", "minutes", "seconds"]

  /**
   * The components that have been specified, with their qualification, as opposed to the ones deduced from the duration value.
   *
   * @return {Level2DurationOutSpec|undefined}
   */
  get components() {
    return this.#components
  }

  /**
   * @param {"uncertain"|"approximate"} flag
   * @return {boolean} Whether any specified component is qualified (at its component level, or at the group level).
   */
  #anyComponent(flag) {
    return this.#components ? Object.values(this.#components).some(component => component[flag]) : false
  }

  /**
   * @return {boolean} Whether the whole duration is uncertain ("?P1Y2M", "P1Y2M?").
   */
  get uncertainDuration() {
    return super.uncertain
  }

  /**
   * @return {boolean} Whether the whole duration is approximate ("~P1Y2M", "P1Y2M~").
   */
  get approximateDuration() {
    return super.approximate
  }

  /**
   * @return {boolean} Whether the duration, or any of its components, is uncertain.
   */
  get uncertain() {
    return super.uncertain || this.#anyComponent("uncertain")
  }

  /**
   * @param {boolean} val Whether the whole duration is uncertain.
   */
  set uncertain(val) {
    super.uncertain = val
  }

  /**
   * @return {boolean} Whether the duration, or any of its components, is approximate.
   */
  get approximate() {
    return super.approximate || this.#anyComponent("approximate")
  }

  /**
   * @param {boolean} val Whether the whole duration is approximate.
   */
  set approximate(val) {
    super.approximate = val
  }

  /**
   * @return {boolean} Whether some specified component has a qualification of its own ("P~1Y2M"), which has to be kept apart from the others.
   */
  get hasQualifiedComponent() {
    return this.#components ? Object.values(this.#components).some(component => component.uncertainComponent || component.approximateComponent) : false
  }

  /**
   * @param {Level2DurationInSpec} spec
   * @return {number}
   */
  static valueFromSpec(spec) {
    return Level2Duration.getValue(spec, componentGroups.year)
      + Level2Duration.getValue(spec, componentGroups.month)
      + Level2Duration.getValue(spec, componentGroups.day)
      + Level2Duration.getValue(spec, componentGroups.hour)
      + Level2Duration.getValue(spec, componentGroups.minute)
      + Level2Duration.getValue(spec, componentGroups.second)
  }

  /**
   * @template D=Level2Duration
   * @template O=Level2DurationOutSpec
   * @param {D} comp
   * @param {LevelFactory} [factory]
   * @return {O}
   */
  static toSpec(comp, factory = level2DurationFactory) {
    const spec = Level1Duration.toSpec(comp, factory)
    if (comp instanceof Level2Duration && comp.hasQualifiedComponent) {
      // Units cannot be normalized (150S into 2M30S) without losing which component each qualification applies to.
      for (const name of Level2Duration.componentNames) {
        delete spec[name]
        if (comp.components[name]) {
          spec[name] = comp.components[name]
        }
      }
    }
    return spec
  }

  /**
   * @param {string} str The duration string to parse.
   * @param {EDTFParser} [parser] The parser to use.
   * @return {Level2Duration}
   */
  static fromString(str, parser = DefaultParsers.get(Level2Duration)) {
    const parsed = parser.parse(str)
    return new Level2Duration(parsed)
  }

  /**
   * @param {Level2Date} beforeDate
   * @param {Level2Date} afterDate
   * @return {Level2Duration}
   */
  static between(beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Level2Duration(afterTime - beforeTime)
  }

  /**
   * @return {Level2DurationOutSpec}
   */
  toSpec() {
    return Level2Duration.toSpec(this)
  }

  /**
   * @param {Level2DurationRenderer} renderer
   * @return {string}
   */
  toString(renderer = Level2DurationRenderer.instance) {
    return super.toString(renderer)
  }
}
