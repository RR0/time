import { Level0Component } from "../component/index.mjs"
import { Level0DayParser } from "./Level0DayParser.mjs"
import { calendarUnits } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Day extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The day of month value spec (or current day of month by default).
   * @param {CalendarUnit} [unit] The day of month unit (GregorianCalendar.day by default)
   */
  constructor (spec = new Date().getDate(), unit = calendarUnits.day) {
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
