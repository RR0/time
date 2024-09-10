import { EDTFError } from "../EDTFError.mjs"
import { EDTFValidator } from "./EDTFValidator.mjs"

export default class MinMaxValidator extends EDTFValidator {
  /**
   * @readonly
   * @type number
   */
  min

  /**
   * @readonly
   * @type number
   */
  max

  /**
   * @param {string} name
   * @param {number} min
   * @param {number} max
   */
  constructor (name, min, max) {
    super(name)
    this.min = min
    this.max = max
  }

  /**
   * @param {number} value
   * @return {boolean}
   */
  validate (value) {
    if (value < this.min || value > this.max) {
      throw new EDTFError(`${this.name} value must be >= ${this.min} and <= ${this.max}`)
    }
    return super.validate(value)
  }
}
