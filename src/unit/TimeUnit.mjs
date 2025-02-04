import { MinMaxValidator } from "./validator/MinMaxValidator.mjs"
import { AbstractMethodError } from "../AbstractMethodError.mjs"

/** @import { EDTFValidator } from "./validator/EDTFValidator.mjs" */

/**
 * @abstract
 * @template T=Level0Component
 */
export class TimeUnit {
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
   * @type TimeUnit
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
   * @param {TimeUnit | undefined} subUnit
   * @param {EDTFValidator} validator
   */
  constructor (name, min, max, subUnit, validator = new MinMaxValidator(name, min, max)) {
    this.name = name
    this.min = min
    this.max = max
    this.subUnit = subUnit
    this.validator = validator
  }

  validate (value) {
    return this.validator.validate(value)
  }

  /**
   * @return {number} The duration is milliseconds.
   */
  get duration () {
    let dur
    if (this.subUnit) {
      dur = 0
      for (let subUnitVal of this.subUnit) {
        dur += subUnitVal.duration
      }
    } else {
      dur = 1
    }
    return dur
  }

  /**
   * @abstract
   * @param {number} value
   * @return {T}
   */
  create (value) {
    throw new AbstractMethodError(this, "create")
  }

  /**
   * @return {IteratorResult<Level0Component, Level0Component>}
   */
  [Symbol.iterator] () {
    let value = this.min
    return /** @type IteratorResult */ {
      next: () => {
        const done = value > this.max
        let result
        if (done) {
          result = { done }
        } else {
          result = { value: this.create(value), done }
        }
        if (!done) {
          value++
        }
        return result
      }
    }
  }
}
