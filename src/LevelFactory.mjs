import { AbstractMethodError } from "./AbstractMethodError.mjs"

/**
 * @abstract
 * @template Y extends Level0Component = Level0Year
 * @template MM extends Level0Component = Level0Month
 * @template D extends Level0Component = Level0Day
 * @template H extends Level0Component = Level0Hour
 * @template M extends Level0Component = Level0Minute
 * @template S extends Level0Component = Level0Second
 * @template Z extends Level0Component = Level0Timeshift
 */
export class LevelFactory {
  /**
   * @protected
   * @param {number} value
   * @return {Y}
   */
  newYear (value) {
    throw new AbstractMethodError()
  }

  /**
   * @abstract
   * @param {number} value
   * @return MM
   */
  newMonth (value) {
    throw new AbstractMethodError()
  }

  /**
   * @abstract
   * @param {number} value
   * @return D
   */
  newDay (value) {
    throw new AbstractMethodError()
  }

  /**
   * @abstract
   * @param {number} value
   * @return H
   */
  newHour (value) {
    throw new AbstractMethodError()
  }

  /**
   * @abstract
   * @param {number} value
   * @return M
   */
  newMinute (value) {
    throw new AbstractMethodError()
  }

  /**
   * @abstract
   * @param {number} value
   * @return S
   */
  newSecond (value) {
    throw new AbstractMethodError()
  }
}
