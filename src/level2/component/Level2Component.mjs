import { Level1Component } from "../../level1/component/Level1Component.mjs"
/** @import { Level1ComponentSpec } from "../../level1/component/Level1Component.mjs" */
/** @import { TimeUnit } from "../../calendar/unit/TimeUnit.mjs" */

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
   * @param {TimeUnit} unit
   */
  constructor (spec, unit) {
    super(spec, unit)
    this.uncertainComponent = spec.uncertainComponent || false
    this.approximateComponent = spec.approximateComponent || false
  }

  /**
   * @return {boolean}
   */
  get uncertain () {
    return super.uncertain || this.uncertainComponent
  }

  /**
   * @param {boolean} val
   */
  set uncertain (val) {
    return super.uncertain = val
  }

  /**
   * @param {boolean} val
   */
  set approximate (val) {
    return super.approximate = val
  }

  /**
   * @return {boolean}
   */
  get approximate () {
    return super.approximate || this.approximateComponent
  }
}
