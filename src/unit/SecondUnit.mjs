import { TimeUnit } from "./TimeUnit.mjs"

/**
 * @abstract
 */
export class SecondUnit extends TimeUnit {
  /**
   * @param {TimeUnit} millisecondUnit
   */
  constructor (millisecondUnit) {
    super("second", 0, 59, millisecondUnit)
  }

  get duration () {
    const subUnit = this.subUnit
    return (subUnit.max - subUnit.min + 1) * subUnit.duration
  }
}
