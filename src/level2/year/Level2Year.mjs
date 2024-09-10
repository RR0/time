import MinMaxValidator from "../../validator/MinMaxValidator.mjs"
import Level2YearParser from "./Level2YearParser.mjs"
import Level2Component from "../component/Level2Component.mjs"

const name = "year"

export default class Level2Year extends Level2Component {
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
   * @return {Level2Year | {start: Level2Year, end: Level2Year}}
   */
  static fromString (str) {
    const parser = new Level2YearParser()
    const { value, uncertain, approximate, uncertainComponent, approximateComponent } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level2Year(startValue, uncertain, approximate)
      const end = new Level2Year(value.end, uncertain, approximate)
      const interval = { start, end }
      if (value.estimate) {
        interval.estimate = value.estimate
      }
      return interval
    } else {
      const year = new Level2Year(value, uncertain, approximate)
      year.uncertainComponent = uncertainComponent || false
      year.approximateComponent = approximateComponent || false
      return year
    }
  }
}
