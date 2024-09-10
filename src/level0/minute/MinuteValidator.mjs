import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

export class MinuteValidator extends MinMaxValidator {
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
    super("minute", MinuteValidator.MIN, MinuteValidator.MAX)
  }
}
