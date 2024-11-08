import { EDTFValidator } from "../../unit/validator/EDTFValidator.mjs"
import { MonthValidator } from "../../level0/month/MonthValidator.mjs"

/**
 * Validates level-1 months values (1..12, 21..24)
 */
export class Level1MonthValidator extends EDTFValidator {
  /**
   * @readonly
   * @protected
   * @type {MonthValidator}
   */
  monthValidator = new MonthValidator()

  validate (value) {
    switch (value) {
      case 21:
      case 22:
      case 23:
      case 24:
        return true
      default:
        return this.monthValidator.validate(value)
    }
  }
}
