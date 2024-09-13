import { Level0ComponentRenderer } from "./component/Level0ComponentRenderer.mjs"
import { Level0Component } from "./component/index.mjs"

export class PaddedComponentRenderer extends Level0ComponentRenderer {
  /**
   * @readonly
   * @type {PaddedComponentRenderer}
   */
  static default = new PaddedComponentRenderer("0", 2)

  /**
   *
   * @param {number} size
   * @param {string} char
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
