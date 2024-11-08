import { Level0Component } from "../component/index.mjs"
import { Level0HourParser } from "./Level0HourParser.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"
import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { level0HourUnit } from "./Level0HourUnit.mjs"

export class Level0Hour extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The hour value spec (or current hour by default).
   * @param {TimeUnit} [unit] The hour unit (Level0TimeUnits.hour by default).
   */
  constructor (spec = new Date().getHours(), unit = level0HourUnit) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str
   * @param {Level0HourParser} parser
   * @return {Level0Hour}
   */
  static fromString (str, parser = new Level0HourParser()) {
    return new Level0Hour(parser.parse(str))
  }
}
