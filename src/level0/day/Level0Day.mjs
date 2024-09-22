import { Level0Component } from "../component/index.mjs"
import { Level0DayParser } from "./Level0DayParser.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Day extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec = new Date().getDate()) {
    super(spec, GregorianCalendar.day)
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
