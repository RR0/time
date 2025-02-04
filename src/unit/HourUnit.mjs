import { TimeUnit } from "./TimeUnit.mjs"

/**
 * @abstract
 */
export class HourUnit extends TimeUnit {
  /**
   * @param {MinuteUnit} minuteUnit
   */
  constructor (minuteUnit) {
    super("hour", 0, 23, minuteUnit)
  }

  get duration () {
    const subUnit = this.subUnit
    return (subUnit.max - subUnit.min + 1) * subUnit.duration  // Shortcut to avoid iteration
  }
}
