import Level0Component from "../../level0/component/Level0Component.mjs"

/**
 * @abstract
 */
export default class Level1Component extends Level0Component {
  #uncertain
  #approximate

  /**
   * @readonly
   * @type boolean
   */
  get uncertain() {
    return this.#uncertain
  }

  /**
   * @param {boolean} val
   */
  set uncertain(val) {
    return this.#uncertain = val
  }

  /**
   * @param {boolean} val
   */
  set approximate(val) {
    return this.#approximate = val
  }

  /**
   * @readonly
   * @type boolean
   */
  get approximate() {
    return this.#approximate
  }

  /**
   * @param {number} value
   * @param {string} [name]
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} validator
   */
  constructor (value, name, uncertain, approximate, validator) {
    super(value, name, validator)
    this.#uncertain = uncertain
    this.#approximate = approximate
  }

  /**
   * @protected
   * @return {boolean}
   */
  isCertainAndPrecise () {
    return !this.approximate && !this.uncertain
  }

  /**
   * @param {Level1Component} other
   * @return {boolean}
   */
  isEqual (other) {
    return this.isCertainAndPrecise() && super.isEqual(other)
  }

  isBefore (other) {
    return this.isCertainAndPrecise() && super.isBefore(other)
  }

  isAfter (other) {
    return this.isCertainAndPrecise() && super.isAfter(other)
  }

  toString () {
    return super.toString() + (this.uncertain ? this.approximate ? "%" : "?" : this.approximate ? "~" : "")
  }
}
