import Level0MonthParser from "./Level0MonthParser.mjs"
import Level0Component from "../component/Level0Component.mjs"
import Level0Day from "../day/Level0Day.mjs"
import { MonthValidator } from "./MonthValidator.mjs"

const name = "month"

export default class Level0Month extends Level0Component {
  /**
   * The number of days in this month.
   *
   * @readonly
   * @type {number}
   */
  days

  /**
   * @param {number} value
   * @param {number} [days]
   * @param {EDTFValidator} validator
   */
  constructor (value = new Date().getMonth() + 1, days = 31, validator = new MonthValidator()) {
    super(value, name, validator, days * Level0Day.DURATION)
    this.days = days
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level0Month}
   */
  static fromString (str) {
    const parser = new Level0MonthParser()
    return new Level0Month(parser.parse(str))
  }
}
