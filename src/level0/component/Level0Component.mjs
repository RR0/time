import { EDTFValidator } from "../../calendar/index.mjs"
import { Level0ComponentRenderer } from "./Level0ComponentRenderer.mjs"
import { CalendarUnit } from "../../calendar/unit/CalendarUnit.mjs"

/**
 * @typedef {Object} Level0ComponentSpec
 * @property {number} value
 */

/**
 * A Date component as specified by EDTF level 0.
 *
 * @abstract
 */
export class Level0Component {
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
  constructor(spec, unit) {
    this.value = typeof spec === "number" ? spec : spec.value
    unit.validate(this.value)
    this.unit = unit
  }

  /**
   * @return {number}
   */
  get duration() {
    return this.value * this.unit.duration
  }

  /**
   * @protected
   * @param {Level0Component} other
   */
  #checkOtherType(other) {
    if (this.constructor.name !== other.constructor.name) {
      throw new EDTFValidator(`${this.unit.name} "${this.toString()}" cannot be compared with ${other.unit?.name} "${other.toString()}"`)
    }
  }

  /**
   * @param {Level0Component} other
   * @return {number}
   */
  compare(other) {
    this.#checkOtherType(other)
    return this.value - other.value
  }

  /**
   * @param {this} other
   * @return {boolean}
   */
  isEqual(other) {
    return this.compare(other) === 0
  }

  /**
   * @param {this} other
   * @return {boolean}
   */
  isBefore(other) {
    return this.compare(other) < 0
  }

  /**
   * @param {this} other
   * @return {boolean}
   */
  isAfter(other) {
    return this.compare(other) > 0
  }

  /**
   * @param {Level0ComponentRenderer} [renderer]
   * @return {string}
   */
  toString(renderer = Level0ComponentRenderer.instance) {
    return renderer.render(this)
  }

  /**
   * @return {Level0Component}
   */
  toSpec() {
    return { value: this.value }
  }

  toJSON() {
    return this.toSpec()
  }
}
