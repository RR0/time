import { Level0Component } from "../component/index.mjs"
import { Level0DayParser } from "./Level0DayParser.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"

export class Level0Day extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec = new Date().getDate()) {
    super(spec, GregorianCalendar.day)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level0Day}
   */
  static fromString (str) {
    const parser = new Level0DayParser()
    return new Level0Day(parser.parse(str))
  }
}
