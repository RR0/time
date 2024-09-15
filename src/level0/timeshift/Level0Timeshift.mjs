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
   */
  constructor (value = 0) {
    this.value = value
  }

  /**
   * @param {TimeshiftRenderer} renderer
   * @return {string}
   */
  toString (renderer = new DefaultTimeshiftRenderer()) {
    return renderer.render(this)
  }

  /**
   * @param {string} str
   * @param {Level0TimeshiftParser} parser
   * @return {Level0Timeshift}
   */
  static fromString (str, parser = new Level0TimeshiftParser()) {
    const groups = parser.parse(str)
    return new Level0Timeshift(groups)
  }
}
