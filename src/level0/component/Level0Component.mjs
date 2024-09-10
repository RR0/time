import { EDTFValidator } from "../../validator/EDTFValidator.mjs"

/**
 * @abstract
 */
export default class Level0Component {
  /**
   * @readonly
   * @type EDTFValidator
   */
  validator

  /**
   * @readonly
   * @type number
   */
  value

  /**
   * @readonly
   * @type string
   */
  name

  /**
   * @readonly
   * @type number
   */
  unitDuration

  /**
   * @param {number} value
   * @param {string} name
   * @param {EDTFValidator} validator
   * @param {number} unitDuration Duration in ms
   */
  constructor (value, name, validator, unitDuration) {
    validator.validate(value)
    this.value = value
    this.name = name
    this.validator = validator
    this.unitDuration = unitDuration
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
    return this.value * this.unitDuration
  }

  toString () {
    return this.value.toString()
  }
}
