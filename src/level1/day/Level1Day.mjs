import Level1DayParser from "./Level1DayParser.mjs"
import Level1Component from "../component/Level1Component.mjs"
import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

const name = "day"

export default class Level1Day extends Level1Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} validator
   */
  constructor (value, uncertain, approximate, validator = new MinMaxValidator(name, 1, 31)) {
    super(value, name, uncertain, approximate, validator)
  }

  toString () {
    return super.toString().padStart(2, "0");
  }

  /**
   * @param {string} str
   * @return {Level1Day | {start: Level1Day, end: Level1Day}}
   */
  static fromString (str) {
    const parser = new Level1DayParser()
    const { value, uncertain, approximate } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level1Day(Math.max(startValue, 1), uncertain, approximate)
      const end = new Level1Day(Math.min(value.end, 31), uncertain, approximate)
      return { start, end }
    } else {
      return new Level1Day(value, uncertain, approximate)
    }
  }
}
