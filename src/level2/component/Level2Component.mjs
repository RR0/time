import Level1Component from "../../level1/component/Level1Component.mjs"

export default class Level2Component extends Level1Component {
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
   * @param {boolean} val
   */
  set approximate(val) {
    return super.approximate = val
  }

  /**
   * @return {boolean}
   */
  get approximate() {
    return super.approximate || this.approximateComponent
  }
}
