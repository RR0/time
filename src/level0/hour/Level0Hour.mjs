import Level0Component from "../component/Level0Component.mjs"
import Level0HourParser from "./Level0HourParser.mjs"
import Level0Minute from "../minute/Level0Minute.mjs"
import { HourValidator } from "./HourValidator.mjs"

const name = "hour"

export default class Level0Hour extends Level0Component {
  /**
   * @readonly
   */
  static DURATION = 60 * Level0Minute.DURATION

  /**
   * @param {number} value
   * @param {EDTFValidator} validator
   */
  constructor (value = new Date().getHours(), validator = new HourValidator()) {
    super(value, name, validator, Level0Hour.DURATION)
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
