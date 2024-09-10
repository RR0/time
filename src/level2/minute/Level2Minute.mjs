import Level2Component from "../component/Level2Component.mjs"
import Level2MinuteParser from "../minute/Level2MinuteParser.mjs"
import { MinuteValidator } from "../../level0/minute/MinuteValidator.mjs"

const name = "minute"

export default class Level2Minute extends Level2Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} [validator]
   */
  constructor (value, uncertain, approximate, validator = new MinuteValidator()) {
    super(value, name, uncertain, approximate, validator)
  }

  /**
   * If some digits are unspecified, an inferred minutes interval will be returned.
   *
   * @param {string} str
   * @return {Level2Minute | {start: Level2Minute, end: Level2Minute}}
   */
  static fromString (str) {
    const parser = new Level2MinuteParser()
    const { value, uncertain, approximate, uncertainComponent, approximateComponent } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level2Minute(Math.max(startValue, MinuteValidator.MIN), uncertain, approximate)
      const end = new Level2Minute(Math.min(value.end, MinuteValidator.MAX), uncertain, approximate)
      return { start, end }
    } else {
      const minute = new Level2Minute(value, uncertain, approximate)
      minute.uncertainComponent = uncertainComponent || false
      minute.approximateComponent = approximateComponent || false
      return minute
    }
  }
}
