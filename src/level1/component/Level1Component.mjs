import { Level0Component } from "../../level0/component/Level0Component.mjs"
/** @import { Level0ComponentSpec } from "../../level0/component/Level0Component.mjs" */
import { Level1ComponentRenderer } from "./Level1ComponentRenderer.mjs"
/** @import { CalendarUnit } from "../../calendar/unit/CalendarUnit.mjs" */

/**
 * @typedef {Level0ComponentSpec} Level1ComponentSpec
 * @property {boolean} [uncertain]
 * @property {boolean} [approximate]
 */

/**
 * @abstract
 */
export class Level1Component extends Level0Component {

  #uncertain

  #approximate

  /**
   * @param {Level1ComponentSpec|number} spec
   * @param {CalendarUnit} unit
   */
  constructor (spec, unit) {
    super(spec, unit)
    this.#uncertain = spec.uncertain || false
    this.#approximate = spec.approximate || false
  }

  /**
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
   * @param {this} other
   * @return {boolean}
   */
  isEqual (other) {
    return this.isCertainAndPrecise() && super.isEqual(other)
  }

  /**
   * @param {this} other
   * @return {boolean}
   */
  isBefore (other) {
    return this.isCertainAndPrecise() && super.isBefore(other)
  }

  /**
   * @param {this} other
   * @return {boolean}
   */
  isAfter (other) {
    return this.isCertainAndPrecise() && super.isAfter(other)
  }

  toString (renderer = Level1ComponentRenderer.instance) {
    return super.toString(renderer)
  }
}
