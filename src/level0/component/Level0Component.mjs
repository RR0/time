import { EDTFValidator } from "../../validator/EDTFValidator.mjs"

/**
 * @typedef {Object} Level0ComponentSpec
 * @property {number} value
 */

/**
 * A Date component as specified by EDTF level 0.
 *
 * @abstract
 */
export default class Level0Component {
  /**
   * @readonly
   * @type CalendarUnit
   */
  unit

  /**
   * @readonly
   * @type number
   */
  value

  /**
   * @param {Level0ComponentSpec|number} spec
   * @param {CalendarUnit} unit
   */
  constructor (spec, unit) {
    this.value = typeof spec === "number" ? spec : spec.value
    unit.validator.validate(this.value)
    this.unit = unit
  }

  /**
   * @protected
   * @param other
   */
  checkOtherType (other) {
    if (this.constructor.name !== other.constructor.name) {
      throw new EDTFValidator(`${this.name} "${this.toString()}" cannot be compared with ${other.name} "${other.toString()}"`)
    }
  }

  /**
   * @param {Level0Component} other
   * @return {number}
   */
  compare (other) {
    this.checkOtherType(other)
    return this.value - other.value
  }

  /**
   * @param {Level0Component} other
   * @return {boolean}
   */
  isEqual (other) {
    return this.compare(other) === 0
  }

  /**
   * @param other {Level0Component}
   * @return {boolean}
   */
  isBefore (other) {
    return this.compare(other) < 0
  }

  /**
   * @param other {Level0Component}
   * @return {boolean}
   */
  isAfter (other) {
    return this.compare(other) > 0
  }

  /**
   * @return {number}
   */
  get duration () {
    return this.value * this.unit.duration
  }

  toString () {
    return this.value.toString()
  }
}
