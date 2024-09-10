import Level1Component from "../component/Level1Component.mjs"
import Level1MinuteParser from "./Level1MinuteParser.mjs"
import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

const name = "minute"

export default class Level1Minute extends Level1Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} validator
   */
  constructor (value, uncertain, approximate, validator = new MinMaxValidator(name, 0, 59)) {
    super(value, name, uncertain, approximate, validator)
  }

  /**
   * If some digits are unspecified, an inferred minutes interval will be returned.
   *
   * @param {string} str
   * @return {Level1Minute | {start: Level1Minute, end: Level1Minute}}
   */
  static fromString (str) {
    const parser = new Level1MinuteParser()
    const { value, uncertain, approximate } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level1Minute(Math.max(startValue, 0), uncertain, approximate)
      const end = new Level1Minute(Math.min(value.end, 59), uncertain, approximate)
      return { start, end }
    } else {
      return new Level1Minute(value, uncertain, approximate)
    }
  }
}
