import { TimeUnit } from "./TimeUnit.mjs"

/**
 * @abstract
 */
export class DayUnit extends TimeUnit {
  /**
   * @param {number} max
   * @param {HourUnit} hourUnit
   */
  constructor (max, hourUnit) {
    super("day", 1, max, hourUnit)
  }
}
