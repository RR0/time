import { TimeUnit } from "./TimeUnit.mjs"

/**
 * @abstract
 */
export class MinuteUnit extends TimeUnit {
  /**
   * @param {SecondUnit} secondUnit
   */
  constructor (secondUnit) {
    super("minute", 0, 59, secondUnit)
  }

  get duration () {
    const subUnit = this.subUnit
    return (subUnit.max - subUnit.min + 1) * subUnit.duration  // Shortcut to avoid iteration
  }
}
