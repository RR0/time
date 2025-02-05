import { Level0Component } from "../component/index.mjs"
import { Level0HourParser } from "./Level0HourParser.mjs"
import { level0Calendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Hour extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The hour value spec (or current hour by default).
   * @param {CalendarUnit} [unit] The hour unit (GregorianCalendar.hour by default).
   */
  constructor(spec = new Date().getHours(), unit = level0Calendar.hour) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @param {Level0HourParser} parser
   * @return {Level0Hour}
   */
  static fromString(str, parser = new Level0HourParser()) {
    return new Level0Hour(parser.parse(str))
  }

  toString(renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }
}
