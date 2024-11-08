import { Level0ComponentRenderer } from "./component/Level0ComponentRenderer.mjs"
import { Level0Component } from "./component/index.mjs"

/**
 * Renders a component with padding at start.
 */
export class PaddedComponentRenderer extends Level0ComponentRenderer {
  /**
   * @readonly
   * @type {PaddedComponentRenderer}
   */
  static default = new PaddedComponentRenderer("0", 2)

  /**
   * @param {number} size The full max width.
   * @param {string} char The padding character.
   */
  constructor (char, size) {
    super()
    this.char = char
    this.size = size
  }

  /**
   * @param {Level0Component} comp
   * @return {string}
   */
  render (comp) {
    return super.render(comp).padStart(this.size, this.char)
  }
}
