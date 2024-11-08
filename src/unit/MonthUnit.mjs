import { MonthValidator } from "../level0/month/MonthValidator.mjs"
import { EDTFError } from "../EDTFError.mjs"
import { TimeUnit } from "./TimeUnit.mjs"
import {
  level030DayUnit,
  level031DayUnit,
  level028DayUnit,
  level029DayUnit
} from "../level0/day/Level031DayUnit.mjs"

/** @import { EDTFValidator } from "./validator/EDTFValidator.mjs" */

export class MonthUnit extends TimeUnit {
  /**
   * @param {number} days
   * @param {TimeUnit} dayUnit
   * @param {EDTFValidator} [validator]
   */
  constructor (days, dayUnit, validator = new MonthValidator()) {
    super("month", 1, 12, dayUnit, validator)
  }

  static Month28 = new MonthUnit(28, level028DayUnit)
  static Month29 = new MonthUnit(29, level029DayUnit)
  static Month30 = new MonthUnit(30, level030DayUnit)
  static Month31 = new MonthUnit(31, level031DayUnit)

  /**
   *
   * @param {number} monthValue
   * @param {number|undefined} yearValue
   * @param {EDTFValidator} [validator]
   * @return {MonthUnit}
   */
  static create (monthValue, yearValue, validator) {
    switch (monthValue) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return this.Month31
      case 2:
        const leapYear = yearValue % 4 === 0
        return leapYear ? this.Month29 : this.Month28
      case 4:
      case 6:
      case 9:
      case 11:
        return this.Month30
      default:
        throw new EDTFError("Unsupported month", monthValue, yearValue)
    }
  }
}
