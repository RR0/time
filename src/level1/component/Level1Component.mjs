import Level0Component from "../../level0/component/Level0Component.mjs"

/**
 * @typedef {Level0ComponentSpec} Level1ComponentSpec
 * @property {boolean} [uncertain]
 * @property {boolean} [approximate]
 */

/**
 * @abstract
 */
export default class Level1Component extends Level0Component {

  #uncertain
  #approximate

  /**
   * @param {Level1ComponentSpec|number} spec
   * @param {CalendarUnit} unit
   */
  constructor (spec, unit) {
    super(spec, unit)
    this.#uncertain = spec.uncertain
    this.#approximate = spec.approximate
  }

  /**
   * @readonly
   * @type boolean
   */
  get uncertain () {
    return this.#uncertain
  }

  /**
   * @param {boolean} val
   */
  set uncertain (val) {
    return this.#uncertain = val
  }

  /**
   * @param {boolean} val
   */
  set approximate (val) {
    return this.#approximate = val
  }

  /**
   * @readonly
   * @type boolean
   */
  get approximate () {
    return this.#approximate
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
