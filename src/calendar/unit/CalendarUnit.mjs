import { MinMaxValidator } from "./validator/MinMaxValidator.mjs"

/** @import { EDTFValidator } from "./validator/EDTFValidator.mjs" */

export class CalendarUnit {
  /**
   * @readonly
   * @type string
   */
  name

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
   * @readonly
   * @type number
   */
  duration

  /**
   * @readonly
   * @type CalendarUnit
   */
  subUnit

  /**
   * @readonly
   * @type EDTFValidator
   */
  validator

  /**
   * @param {string} name
   * @param {number} min
   * @param {number} max
   * @param {CalendarUnit | undefined} subUnit
   * @param {EDTFValidator} validator
   */
  constructor(name, min, max, subUnit, validator = new MinMaxValidator(name, min, max)) {
    this.name = name
    this.min = min
    this.max = max
    this.subUnit = subUnit
    this.duration = subUnit ? (subUnit.max - subUnit.min + 1) * subUnit.duration : 1
    this.validator = validator
  }

  validate(value) {
    return this.validator.validate(value)
  }

  [Symbol.iterator]() {
    let value = this.min
    return {
      next: () => {
        const result = {
          done: value > this.max,
          value
        }
        value++
        return result
      }
    }
  }
}
