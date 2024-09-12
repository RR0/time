import { Level0Component } from "../component/index.mjs"
import { Level0HourParser } from "./Level0HourParser.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"

export class Level0Hour extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec = new Date().getHours()) {
    super(spec, GregorianCalendar.hour)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level0Hour}
   */
  static fromString (str) {
    const parser = new Level0HourParser()
    return new Level0Hour(parser.parse(str))
  }
}
