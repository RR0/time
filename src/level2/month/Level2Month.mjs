import Level2MonthParser from "./Level2MonthParser.mjs"
import Level2Component from "../component/Level2Component.mjs"
import { Level2MonthValidator } from "./Level2MonthValidator.mjs"

const name = "month"

export default class Level2Month extends Level2Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} [validator]
   */
  constructor (value, uncertain, approximate, validator = new Level2MonthValidator(name)) {
    super(value, name, uncertain, approximate, validator)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * If some digits are unspecified, an inferred months interval will be returned.
   *
   * @param {string} str
   * @return {Level2Month | {start: Level2Month, end: Level2Month}}
   */
  static fromString (str) {
    const parser = new Level2MonthParser()
    const { value, uncertain, approximate, uncertainComponent, approximateComponent } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level2Month(Math.max(startValue, 1), uncertain, approximate)
      const end = new Level2Month(Math.min(value.end, 12), uncertain, approximate)
      return { start, end }
    } else {
      const month = new Level2Month(value, uncertain, approximate)
      month.uncertainComponent = uncertainComponent || false
      month.approximateComponent = approximateComponent || false
      return month
    }
  }
}
