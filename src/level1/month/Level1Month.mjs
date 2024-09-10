import Level1MonthParser from "./Level1MonthParser.mjs"
import Level1Component from "../component/Level1Component.mjs"
import { EDTFValidator } from "../../validator/EDTFValidator.mjs"
import { Level1MonthValidator } from "./Level1MonthValidator.mjs"

const name = "month"

export default class Level1Month extends Level1Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} [validator]
   */
  constructor (value, uncertain, approximate, validator = new Level1MonthValidator(name)) {
    super(value, name, uncertain, approximate, validator)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * If some digits are unspecified, an inferred months interval will be returned.
   *
   * @param {string} spec
   * @return {Level1Month | {start: Level1Month, end: Level1Month}}
   */
  static fromString (spec) {
    const parser = new Level1MonthParser()
    const { value, uncertain, approximate } = parser.parse(spec)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level1Month(Math.max(startValue, 1), uncertain, approximate)
      const end = new Level1Month(Math.min(value.end, 12), uncertain, approximate)
      return { start, end }
    } else {
      return new Level1Month(value, uncertain, approximate)
    }
  }
}
