import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

export class MonthValidator extends MinMaxValidator {
  /**
   * @param {number} min
   * @param {number} max
   */
  constructor (min = 1, max = 12) {
    super("month", min, max)
  }
}
