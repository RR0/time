import Level1Component from "../component/Level1Component.mjs"
import Level1SecondParser from "./Level1SecondParser.mjs"
import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

const name = "second"

export default class Level1Second extends Level1Component {
  /**
   * @param {number} value
   * @param {boolean} uncertain
   * @param {boolean} approximate
   */
  constructor (value, uncertain, approximate) {
    super(value, name, uncertain, approximate, new MinMaxValidator(name, 0, 59))
  }

  /**
   * @param {string} str
   * @return {Level1Second | {start: Level1Second, end: Level1Second}}
   */
  static fromString (str) {
    const parser = new Level1SecondParser()
    const { value, uncertain, approximate } = parser.parse(str)
    const startValue = value.start
    if (startValue !== undefined) {
      const start = new Level1Second(Math.max(startValue, 0), uncertain, approximate)
      const end = new Level1Second(Math.min(value.end, 59), uncertain, approximate)
      return { start, end }
    } else {
      return new Level1Second(value, uncertain, approximate)
    }
  }
}
