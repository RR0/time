import { Level0DateRenderer } from "../../level0/date/Level0DateRenderer.mjs"
import { Level1ComponentRenderer } from "../../level1/component/Level1ComponentRenderer.mjs"
import { PaddedComponentRenderer } from "../../level0/PaddedComponentRenderer.mjs"

/**
 * Renders the value of a component, without any qualification.
 */
class ValueRenderer extends Level1ComponentRenderer {
  qualifier() {
    return ""
  }
}

/**
 * Renders a level 2 date, with each qualification where it applies:
 * - a component that is qualified itself has the qualification before it ("2004-~06"),
 * - a qualification that applies to a group of components follows the last of them ("2004-06~"),
 *   and is not written for components before another qualified one, as it is deduced from it ("2004-~06" is also approximate at the year level),
 *   nor for a component that is qualified itself, which the qualification already tells.
 */
export class Level2DateRenderer extends Level0DateRenderer {
  /**
   * @readonly
   * @type {Level2DateRenderer}
   */
  static instance = new Level2DateRenderer()

  /**
   * @readonly
   * @type {ValueRenderer}
   */
  static valueRenderer = new ValueRenderer(PaddedComponentRenderer.default)

  /**
   * @readonly
   * @type {string[]}
   */
  static names = ["year", "month", "day", "hour", "minute", "second"]

  /**
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @return {string}
   */
  static qualifier(uncertain, approximate) {
    return uncertain ? approximate ? "%" : "?" : approximate ? "~" : ""
  }

  renderComponent(date, name) {
    const comp = date[name]
    const after = Level2DateRenderer.names.slice(Level2DateRenderer.names.indexOf(name) + 1).map(next => date[next]).filter(Boolean)
    const prefix = Level2DateRenderer.qualifier(comp.uncertainComponent, comp.approximateComponent)
    const suffix = Level2DateRenderer.qualifier(
      comp.uncertainGroup && !comp.uncertainComponent && !after.some(next => next.uncertain),
      comp.approximateGroup && !comp.approximateComponent && !after.some(next => next.approximate)
    )
    return prefix + comp.toString(Level2DateRenderer.valueRenderer) + suffix
  }
}
