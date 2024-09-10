import Level0Component from "../component/Level0Component.mjs"
import Level0DayParser from "./Level0DayParser.mjs"
import Level0Hour from "../hour/Level0Hour.mjs"
import { DayValidator } from "./DayValidator.mjs"

const name = "day"

export default class Level0Day extends Level0Component {
  /**
   * @readonly
   */
  static DURATION = 24 * Level0Hour.DURATION

  /**
   * @param {number} value
   * @param {EDTFValidator} validator
   */
  constructor (value = new Date().getDate(), validator = new DayValidator()) {
    super(value, name, validator, Level0Day.DURATION)
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
