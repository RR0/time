import { EDTFError } from "../../EDTFError.mjs"
import { MonthUnit } from "../../unit/MonthUnit.mjs"
import { level028DayUnit, level029DayUnit, level030DayUnit, level031DayUnit } from "../day/Level0DayUnit.mjs"
import { GregorianCalendar } from "../year/GregorianCalendar.mjs"

export class Level0MonthUnit extends MonthUnit {

  static Month28 = new Level0MonthUnit(level028DayUnit)
  static Month29 = new Level0MonthUnit(level029DayUnit)
  static Month30 = new Level0MonthUnit(level030DayUnit)
  static Month31 = new Level0MonthUnit(level031DayUnit)

  constructor (year = 1970) {
    super()
    this.year = year
  }

  /**
   *
   * @param {number} value
   * @return {MonthUnit}
   */
  create (value) {
    switch (value) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return Level0MonthUnit.Month31
      case 2:
        const leapYear = GregorianCalendar.isLeap(this.year)
        return leapYear ? Level0MonthUnit.Month29 : Level0MonthUnit.Month28
      case 4:
      case 6:
      case 9:
      case 11:
        return Level0MonthUnit.Month30
      default:
        throw new EDTFError("Unsupported month", value, yearValue)
    }
  }
}

/**
 * @interface
 * @typedef ILevel0Month
 */

/* export class Level0MonthUnit extends MonthUnit {

  create (value) {
    return new Level0Month(value)
  }
}*/

export const level0MonthUnit = level031DayUnit
