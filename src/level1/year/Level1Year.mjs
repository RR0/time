import Level1YearParser from "./Level1YearParser.mjs"
import Level1Component from "../component/Level1Component.mjs"
import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

const name = "year"

export default class Level1Year extends Level1Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator }validator
   */
  constructor (value, uncertain, approximate, validator = new MinMaxValidator(name, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)) {
    super(value, name, uncertain, approximate, validator)
  }

  /**
   * @param {string} str
   * @return {Level1Year | {start: Level1Year, end: Level1Year}}
   */
  static fromString (str) {
    const parser = new Level1YearParser()
    const { value, uncertain, approximate } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level1Year(startValue, uncertain, approximate)
      const end = new Level1Year(value.end, uncertain, approximate)
      return { start, end }
    } else {
      return new Level1Year(value, uncertain, approximate)
    }
  }
}
