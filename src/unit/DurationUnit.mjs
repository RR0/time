import { MinMaxValidator } from "./validator/MinMaxValidator.mjs"
import { TimeUnit } from "./TimeUnit.mjs"

/** @import { EDTFValidator } from "./validator/EDTFValidator.mjs" */

export class DurationUnit extends TimeUnit {
  /**
   * @param {string} name
   * @param {number} duration
   * @param {TimeUnit | undefined} subUnit
   * @param {EDTFValidator} validator
   */
  constructor (name, duration, subUnit, validator = new MinMaxValidator(name, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)) {
    super(name, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, subUnit, validator)
    this._duration = duration && subUnit ? duration * subUnit.duration : 1
  }

  /**
   * @readonly
   * @type {number}
   * @protected
   */
  _duration

  get duration () {
    return this._duration
  }
}
