import { MinMaxValidator } from "../../unit/validator/MinMaxValidator.mjs"

export class SecondValidator extends MinMaxValidator {
  /**
   * @readonly
   * @type {number}
   */
  static MIN = 0

  /**
   * @readonly
   * @type {number}
   */
  static MAX = 59

  constructor () {
    super("second", SecondValidator.MIN, SecondValidator.MAX)
  }
}
