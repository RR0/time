import Level0Component from "../component/Level0Component.mjs"
import Level0SecondParser from "./Level0SecondParser.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"

export class Level0Second extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.second)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level0Second}
   */
  static fromString (str) {
    const parser = new Level0SecondParser()
    return new Level0Second(parser.parse(str))
  }
}
