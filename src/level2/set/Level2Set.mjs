import { Level2SetParser } from "./Level2SetParser.mjs"
/** @import { Level2Date } from "../date/Level2Date.mjs" */
/** @import { Level2Interval } from "../interval/Level2Interval.mjs" */

export class Level2Set extends /** @type Set<Level2Date> */ Set {
  /**
   *
   * @param {(Level2Date|Level2Interval)[]} values
   * @param {boolean} exclusive
   */
  constructor (values, exclusive) {
    super(values)
    this.exclusive = exclusive
  }

  /**
   *
   * @param {Level2Date | string} value
   */
  has(value) {
    const str = value.toString().replace("..", "/")
    for (const item of this) {
      if (item.toString() === str) {
        return true
      }
    }
    return false
  }

  static fromString (str) {
    const parser = new Level2SetParser()
    const {exclusive, values} = parser.parse(str)
    return new Level2Set(values, exclusive)
  }
}
