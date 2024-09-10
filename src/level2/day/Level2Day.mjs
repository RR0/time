import Level2Component from "../component/Level2Component.mjs"
import Level2DayParser from "./Level2DayParser.mjs"
import { DayValidator } from "../../level0/day/DayValidator.mjs"

const name = "day"

export default class Level2Day extends Level2Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} [validator]
   */
  constructor (value, uncertain, approximate, validator = new DayValidator()) {
    super(value, name, uncertain, approximate, validator)
  }

  /**
   * If some digits are unspecified, an inferred days interval will be returned.
   *
   * @param {string} str
   * @return {Level2Day | {start: Level2Day, end: Level2Day}}
   */
  static fromString (str) {
    const parser = new Level2DayParser()
    const { value, uncertain, approximate, uncertainComponent, approximateComponent } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level2Day(Math.max(startValue, 1), uncertain, approximate)
      const end = new Level2Day(Math.min(value.end, 31), uncertain, approximate)
      return { start, end }
    } else {
      const day = new Level2Day(value, uncertain, approximate)
      day.uncertainComponent = uncertainComponent || false
      day.approximateComponent = approximateComponent || false
      return day
    }
  }
}
