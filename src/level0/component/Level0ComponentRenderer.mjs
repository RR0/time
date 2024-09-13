export class Level0ComponentRenderer {
  /**
   * @readonly
   * @type {Level0ComponentRenderer}
   */
  static instance = new Level0ComponentRenderer()

  /**
   * @template T extends Level0Component
   * @param {T} comp
   * @return {string}
   */
  render(comp) {
    return comp.value.toString()
  }
}
