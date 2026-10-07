import { Level1Component } from "../../level1/component/Level1Component.mjs"
/** @import { Level1ComponentSpec } from "../../level1/component/Level1Component.mjs" */

/** @import { CalendarUnit } from "../../calendar/unit/CalendarUnit.mjs" */

/**
 * @typedef {Level1ComponentSpec} Level2ComponentSpec
 * @property {boolean} [uncertainComponent]
 * @property {boolean} [approximateComponent]
 */

export class Level2Component extends Level1Component {
  /**
   * @readonly
   * @type boolean
   */
  uncertainComponent

  /**
   * @readonly
   * @type boolean
   */
  approximateComponent

  /**
   * @param {Level2ComponentSpec|number} spec
   * @param {CalendarUnit} unit
   */
  constructor(spec, unit) {
    super(spec, unit)
    this.uncertainComponent = spec.uncertainComponent || false
    this.approximateComponent = spec.approximateComponent || false
  }

  /**
   * @return {boolean}
   */
  get uncertain() {
    return super.uncertain || this.uncertainComponent
  }

  /**
   * @param {boolean} val
   */
  set uncertain(val) {
    return super.uncertain = val
  }

  /**
   * @return {boolean}
   */
  get approximate() {
    return super.approximate || this.approximateComponent
  }

  /**
   * @param {boolean} val
   */
  set approximate(val) {
    return super.approximate = val
  }

  /**
   * @return {boolean} Whether the component is uncertain at the group level only (the qualification follows it, or a component after it is qualified).
   */
  get uncertainGroup() {
    return super.uncertain
  }

  /**
   * @return {boolean} Whether the component is approximate at the group level only (the qualification follows it, or a component after it is qualified).
   */
  get approximateGroup() {
    return super.approximate
  }

  toSpec() {
    return {
      ...super.toSpec(),
      uncertain: this.uncertainGroup,
      approximate: this.approximateGroup,
      uncertainComponent: this.uncertainComponent,
      approximateComponent: this.approximateComponent
    }
  }

  toJSON() {
    return this.toSpec()
  }
}
