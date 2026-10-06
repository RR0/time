import { Level0Component } from "../component/index.mjs"
import { DefaultParsers } from "../../DefaultParsers.mjs"
import { CalendarUnit, level0Calendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Second extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The second value spec (or current second by default)
   * @param {CalendarUnit} [unit] The seconds unit (GregorianCalendar.second by default).
   */
  constructor(spec = new Date().getSeconds(), unit = level0Calendar.second) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @return {Level0Second}
   */
  static fromString(str, parser = DefaultParsers.get(Level0Second)) {
    return new Level0Second(parser.parse(str), level0Calendar.second)
  }

  toString(renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }
}
