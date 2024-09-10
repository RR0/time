import Level2Component from "../component/Level2Component.mjs"
import Level2HourParser from "./Level2HourParser.mjs"

import { HourValidator } from "../../level0/hour/HourValidator.mjs"

const name = "hour"

export default class Level2Hour extends Level2Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} [validator]
   */
  constructor (value, uncertain, approximate, validator = new HourValidator()) {
    super(value, name, uncertain, approximate, validator)
  }

  /**
   * If some digits are unspecified, an inferred hours interval will be returned.
   *
   * @param {string} str
   * @return {Level2Hour | {start: Level2Hour, end: Level2Hour}}
   */
  static fromString (str) {
    const parser = new Level2HourParser()
    const { value, uncertain, approximate, uncertainComponent, approximateComponent } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level2Hour(Math.max(startValue, 1), uncertain, approximate)
      const end = new Level2Hour(Math.min(value.end, 23), uncertain, approximate)
      return { start, end }
    } else {
      const day = new Level2Hour(value, uncertain, approximate)
      day.uncertainComponent = uncertainComponent || false
      day.approximateComponent = approximateComponent || false
      return day
    }
  }
}
