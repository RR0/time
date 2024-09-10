import Level2Component from "../component/Level2Component.mjs"
import Level2SecondParser from "./Level2SecondParser.mjs"
import { SecondValidator } from "../../level0/second/SecondValidator.mjs"

const name = "second"

export default class Level2Second extends Level2Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   * @param {EDTFValidator} [validator]
   */
  constructor (value, uncertain, approximate, validator = new SecondValidator()) {
    super(value, name, uncertain, approximate, validator)
  }

  /**
   * If some digits are unspecified, an inferred seconds interval will be returned.
   *
   * @param {string} str
   * @return {Level2Second | {start: Level2Second, end: Level2Second}}
   */
  static fromString (str) {
    const parser = new Level2SecondParser()
    const { value, uncertain, approximate, uncertainComponent, approximateComponent } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level2Second(Math.max(startValue, SecondValidator.MIN), uncertain, approximate)
      const end = new Level2Second(Math.min(value.end, SecondValidator.MAX), uncertain, approximate)
      return { start, end }
    } else {
      const day = new Level2Second(value, uncertain, approximate)
      day.uncertainComponent = uncertainComponent || false
      day.approximateComponent = approximateComponent || false
      return day
    }
  }
}
