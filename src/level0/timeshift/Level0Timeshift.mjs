import { Level0TimeshiftParser } from "./Level0TimeshiftParser.mjs"
import { DefaultTimeshiftRenderer } from "./DefaultTimeshiftRenderer.mjs"

export class Level0Timeshift {
  /**
   * @readonly
   * @type number
   */
  value

  /**
   * @readonly
   * @type string
   */
  name = "timeshift"

  /**
   * @readonly
   * @type DefaultTimeshiftRenderer
   */
  renderer

  /**
   * @param {number} value
   * @param {TimeshiftRenderer} renderer
   */
  constructor (value = 0, renderer = new DefaultTimeshiftRenderer()) {
    this.value = value
    this.renderer = renderer
  }

  toString () {
    return this.renderer.render(this)
  }

  /**
   * @param {string} str
   * @return {Level0Timeshift}
   */
  static fromString (str) {
    const parser = new Level0TimeshiftParser()
    return new Level0Timeshift(parser.parse(str))
  }
}
