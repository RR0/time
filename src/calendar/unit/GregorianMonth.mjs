import { MonthValidator } from "../../level0/month/MonthValidator.mjs"
import GregorianCalendar from "../GregorianCalendar.mjs"
import { EDTFError } from "../../EDTFError.mjs"
import { CalendarUnit } from "./CalendarUnit.mjs"

export class GregorianMonth extends CalendarUnit {
  /**
   * @param {number} days
   * @param {EDTFValidator} validator
   */
  constructor (days, validator = new MonthValidator()) {
    super("month", 1, days, GregorianCalendar.day, validator)
  }

  /**
   *
   * @param {number} monthValue
   * @param {number|undefined} yearValue
   * @return {GregorianMonth}
   */
  static create (monthValue, yearValue) {
    switch (monthValue) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return this.ThirtyOneDays
      case 2:
        return yearValue % 4 === 0 ? this.Month29 : this.Month28
      case 4:
      case 6:
      case 9:
      case 11:
        return this.ThirtyDays
      default:
        throw new EDTFError("Unsupported month", monthValue, yearValue)
    }
  }

  static Month28 = new GregorianMonth(28)
  static Month29 = new GregorianMonth(29)
  static ThirtyDays = new GregorianMonth(30)
  static ThirtyOneDays = new GregorianMonth(31)
}
