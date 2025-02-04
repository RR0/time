import { MonthValidator } from "../level0/month/MonthValidator.mjs"
import { TimeUnit } from "./TimeUnit.mjs"
import { AbstractMethodError } from "../AbstractMethodError.mjs"
import { EDTFValidator } from "./validator/index.mjs"

/** @import { EDTFValidator } from "./validator/EDTFValidator.mjs" */
/** @import { Level0Year } from "../level0/year/Level0Year.mjs" */

export class MonthUnit extends TimeUnit {
  /**
   * @param {TimeUnit} dayUnit
   * @param {EDTFValidator} [validator]
   */
  constructor (dayUnit, validator = new MonthValidator()) {
    super("month", 1, 12, dayUnit, validator)
  }

  /**
   * @abstract
   * @param {number} value
   * @return {Level0Year}
   */
  create (value) {
    return new AbstractMethodError()
  }
}
