import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

export class DayValidator extends MinMaxValidator {
  /**
   * @param {number} max
   */
  constructor (max = 31) {
    super("day", 1, max)
  }
}
