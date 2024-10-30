import { Level0YearParser } from "./Level0YearParser.mjs"
import { Level0Component } from "../component/index.mjs"
import { calendarUnits } from "../../calendar/GregorianCalendar.mjs"

export class Level0Year extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The year value spec (current year by default).
   * @param {CalendarUnit} [unit] The year unit (GregorianCalendar.year by default).
   */
  constructor (spec = new Date().getFullYear(), unit = calendarUnits.year) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @return {Level0Year}
   */
  static fromString (str) {
    const parser = new Level0YearParser()
    return new Level0Year(parser.parse(str))
  }
}
