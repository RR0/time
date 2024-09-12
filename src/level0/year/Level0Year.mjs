import { Level0YearParser } from "./Level0YearParser.mjs"
import { Level0Component } from "../component/index.mjs"
import { GregorianCalendar } from "../../calendar/GregorianCalendar.mjs"

export class Level0Year extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec = new Date().getFullYear()) {
    super(spec, GregorianCalendar.year)
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
