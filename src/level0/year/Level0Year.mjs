import Level0YearParser from "./Level0YearParser.mjs"
import Level0Component from "../component/Level0Component.mjs"
import MinMaxValidator from "../../validator/MinMaxValidator.mjs"
import Level0Day from "../day/Level0Day.mjs"

const name = "year"

export default class Level0Year extends Level0Component {
  /**
   * @readonly
   */
  static DURATION = 365 * Level0Day.DURATION

  /**
   * @param {number} value
   * @param {EDTFValidator} validator
   */
  constructor (value = new Date().getFullYear(), validator = new MinMaxValidator(name, 0, 9999)) {
    super(value, name, validator, Level0Year.DURATION)
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
