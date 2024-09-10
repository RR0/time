import Level1Component from "../component/Level1Component.mjs"
import Level1HourParser from "./Level1HourParser.mjs"

import { HourValidator } from "../../level0/hour/HourValidator.mjs"

const name = "hour"

export default class Level1Hour extends Level1Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} validator
   */
  constructor (value, uncertain, approximate, validator = new HourValidator()) {
    super(value, name, uncertain, approximate, validator)
  }

  /**
   * If some digits are unspecified, an inferred hour interval will be returned.
   *
   * @param {string} str
   * @return {Level1Hour | {start: Level1Hour, end: Level1Hour}}
   */
  static fromString (str) {
    const parser = new Level1HourParser()
    const { value, uncertain, approximate } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level1Hour(Math.max(startValue, 1), uncertain, approximate)
      const end = new Level1Hour(Math.min(value.end, 23), uncertain, approximate)
      return { start, end }
    } else {
      return new Level1Hour(value, uncertain, approximate)
    }
  }
}
