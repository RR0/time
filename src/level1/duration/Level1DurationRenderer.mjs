import { Level0DurationRenderer } from "../../level0/duration/Level0DurationRenderer.mjs"

export class Level1DurationRenderer extends Level0DurationRenderer {
  /**
   * @readonly
   * @type Level1DurationRenderer
   */
  static instance = new Level1DurationRenderer()

  render (comp) {
    return super.render(comp)
  }
}
