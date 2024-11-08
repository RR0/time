import { Level0Component } from "../component/index.mjs"
import { Level0DayParser } from "./Level0DayParser.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"
import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { level031DayUnit } from "./Level031DayUnit.mjs"

export class Level0Day extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The day of month value spec (or current day of month by default).
   * @param {TimeUnit} [unit] The day of month unit (Level0TimeUnits.day by default)
   */
  constructor (spec = new Date().getDate(), unit = level031DayUnit) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str
   * @param {Level0DayParser} parser
   * @return {Level0Day}
   */
  static fromString (str, parser = new Level0DayParser()) {
    const parsed = parser.parse(str)
    return new Level0Day(parsed)
  }
}
