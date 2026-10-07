import { Level1DurationRenderer } from "../../level1/duration/Level1DurationRenderer.mjs"

/**
 * Renders a level 2 duration, with its qualification:
 * - the whole duration is qualified before the "P" ("~P1Y2M"),
 * - a component is qualified before its quantity ("P1Y~2M"),
 * - what is qualified at the group level is deduced from these when parsing, so it is not rendered.
 */
export class Level2DurationRenderer extends Level1DurationRenderer {
  /**
   * @readonly
   * @type Level2DurationRenderer
   */
  static instance = new Level2DurationRenderer()

  /**
   * @readonly
   * @type {Array<[string, string]>} The designator of each component.
   */
  static designators = [["years", "Y"], ["months", "MM"], ["days", "D"], ["hours", "H"], ["minutes", "M"], ["seconds", "S"]]

  /**
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @return {string}
   */
  static qualifier(uncertain, approximate) {
    return uncertain ? approximate ? "%" : "?" : approximate ? "~" : ""
  }

  render (comp) {
    const whole = Level2DurationRenderer.qualifier(comp.uncertainDuration, comp.approximateDuration)
    if (!comp.hasQualifiedComponent) {
      return whole + super.render(comp)
    }
    // Components cannot be normalized (150S into 2M30S) without losing which one each qualification applies to
    let str = whole + "P"
    for (const [name, designator] of Level2DurationRenderer.designators) {
      const component = comp.components[name]
      if (component) {
        str += Level2DurationRenderer.qualifier(component.uncertainComponent, component.approximateComponent) + component.value + designator
      }
    }
    return str
  }
}
