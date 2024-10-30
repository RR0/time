import { Level0Component } from "../component/index.mjs"
import { Level0SecondParser } from "./Level0SecondParser.mjs"
import { CalendarUnit, calendarUnits }  from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Second extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The second value spec (or current second by default)
   * @param {CalendarUnit} [unit] The seconds unit (GregorianCalendar.second by default).
   */
  constructor (spec= new Date().getSeconds(), unit = calendarUnits.second) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str
   * @return {Level0Second}
   */
  static fromString (str) {
    const parser = new Level0SecondParser()
    return new Level0Second(parser.parse(str), calendarUnits.second)
  }
}
