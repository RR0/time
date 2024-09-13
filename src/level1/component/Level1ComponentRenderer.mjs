import { Level0ComponentRenderer } from "../../level0/component/Level0ComponentRenderer.mjs"
import { PaddedComponentRenderer } from "../../level0/PaddedComponentRenderer.mjs"

export class Level1ComponentRenderer extends Level0ComponentRenderer {
  /**
   * @readonly
   * @type {Level0ComponentRenderer}
   */
  static instance = new Level1ComponentRenderer(PaddedComponentRenderer.default)

  /**
   *
   * @param {Level0ComponentRenderer|undefined} [valueRenderer]
   */
  constructor (valueRenderer) {
    super()
    this.valueRenderer = valueRenderer
  }

  /**
   * @template T extends Level1Component
   * @param {T} comp
   * @return {string}
   */
  render (comp) {
    const valueStr = this.valueRenderer ? this.valueRenderer.render(comp) : super.render(comp)
    return valueStr + (comp.uncertain ? comp.approximate ? "%" : "?" : comp.approximate ? "~" : "")
  }
}
