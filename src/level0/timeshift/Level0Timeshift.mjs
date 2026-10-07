import { DefaultParsers } from "../../DefaultParsers.mjs"
/** @import { TimeshiftAt } from "./UsDaylightSaving.mjs" */
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
  constructor(value = 0) {
    this.value = value
  }

  /**
   * @param {string} str
   * @param {EDTFParser} parser
   * @param {TimeshiftAt} [at] The time to read the time zone at, which "PT" (PST or PDT) needs.
   * @return {Level0Timeshift}
   */
  static fromString(str, parser = DefaultParsers.get(Level0Timeshift), at = undefined) {
    const groups = parser.parse(str, at)
    return new Level0Timeshift(groups)
  }

  /**
   * @param {TimeshiftRenderer} renderer
   * @return {string}
   */
  toString(renderer = new DefaultTimeshiftRenderer()) {
    return renderer.render(this)
  }

  toSpec() {
    return {
      value: this.value
    }
  }

  toJSON() {
    return this.toSpec()
  }
}
