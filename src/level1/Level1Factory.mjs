import { LevelFactory } from "../LevelFactory.mjs"
import { Level1Year } from "./year/index.mjs"
import { Level1Month } from "./month/index.mjs"
import { Level1Day } from "./day/index.mjs"
import { Level1Minute } from "./minute/index.mjs"
import { Level1Second } from "./second/index.mjs"
import { Level1Hour } from "./hour/index.mjs"

/**
 * @template Y extends Level1Component = Level1Year
 * @template MM extends Level1Component = Level1Month
 * @template D extends Level1Component = Level1Day
 * @template H extends Level1Component = Level1Hour
 * @template M extends Level1Component = Level1Minute
 * @template S extends Level1Component = Level1Second
 * @template Z extends Level1Component = Level1Timeshift
 */
export class Level1Factory extends LevelFactory {
  /**
   * @readonly
   * @type {Level1Factory}
   */
  static instance = new Level1Factory()

  /**
   * @param {number} value
   * @return Y
   */
  newYear (value) {
    return new Level1Year(value)
  }

  /**
   * @param {number} value
   * @return MM
   */
  newMonth (value) {
    return new Level1Month(value)
  }

  /**
   * @param {number} value
   * @return D
   */
  newDay (value) {
    return new Level1Day(value)
  }

  /**
   * @param {number} value
   * @return H
   */
  newHour (value) {
    return new Level1Hour(value)
  }

  /**
   * @param {number} value
   * @return M
   */
  newMinute (value) {
    return new Level1Minute(value)
  }

  /**
   * @param {number} value
   * @return S
   */
  newSecond (value) {
    return new Level1Second(value)
  }
}
