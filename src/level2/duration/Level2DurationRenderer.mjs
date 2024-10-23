import { Level1DurationRenderer } from "../../level1/duration/Level1DurationRenderer.mjs"

export class Level2DurationRenderer extends Level1DurationRenderer {
  /**
   * @readonly
   * @type Level2DurationRenderer
   */
  static instance = new Level2DurationRenderer()

  render (comp) {
    return super.render(comp)
  }
}
