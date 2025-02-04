import { Level0MonthUnit } from "../month/Level0MonthUnit.mjs"
import { Level0Year } from "./Level0Year.mjs"
import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { MonthUnit } from "../../unit/index.mjs"

/**
 * A year unit with leap years.
 */
export class Level0YearUnit extends TimeUnit {
  /**
   * @param {number} min
   * @param {number} max
   * @param {MonthUnit} monthUnit
   * @param {EDTFValidator} validator
   */
  constructor (min, max, monthUnit, validator) {
    super("year", min, max, monthUnit, validator)
  }

  /**
   * @param {number} value
   * @return {Level0Year}
   */
  create (value) {
    return new Level0Year(value, this)
  }
}

export const level0YearUnit = new Level0YearUnit(0, 9999, Level0MonthUnit.Month31)
