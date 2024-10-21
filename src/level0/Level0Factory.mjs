import { LevelFactory } from "../LevelFactory.mjs"
import { Level0Year } from "./year/index.mjs"
import { Level0Month } from "./month/index.mjs"
import { Level0Day } from "./day/index.mjs"
import { Level0Minute } from "./minute/index.mjs"
import { Level0Second } from "./second/index.mjs"
import { Level0Hour } from "./hour/index.mjs"

/**
 * @template Y extends Level1Component = Level1Year
 * @template MM extends Level1Component = Level1Month
 * @template D extends Level1Component = Level1Day
 * @template H extends Level1Component = Level1Hour
 * @template M extends Level1Component = Level1Minute
 * @template S extends Level1Component = Level1Second
 * @template Z extends Level1Component = Level1Timeshift
 */
export class Level0Factory extends LevelFactory {
  /**
   * @readonly
   * @type {Level0Factory}
   */
  static instance = new Level0Factory()

  /**
   * @param {number} value
   * @return Y
   */
  newYear (value) {
    return new Level0Year(value)
  }

  /**
   * @param {number} value
   * @return MM
   */
  newMonth (value) {
    return new Level0Month(value)
  }

  /**
   * @param {number} value
   * @return D
   */
  newDay (value) {
    return new Level0Day(value)
  }

  /**
   * @param {number} value
   * @return H
   */
  newHour (value) {
    return new Level0Hour(value)
  }

  /**
   * @param {number} value
   * @return M
   */
  newMinute (value) {
    return new Level0Minute(value)
  }

  /**
   * @param {number} value
   * @return S
   */
  newSecond (value) {
    return new Level0Second(value)
  }
}
