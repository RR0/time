import { Level2Date } from "../date/index.mjs"
import { Level2Interval } from "../interval/index.mjs"

export default class Level2SetParser {
  /**
   * @param {string} str
   * @return {{exclusive: boolean, values: (Level2Date|Level2Interval)[]}}
   */
  parse (str) {
    str = str.trim()
    const exclusive = str.startsWith("[")
    const contents = str.substring(1, str.length - 1)
    const valuesStr = contents.split(",")
    const values = []
    for (const valueStr of valuesStr) {
      let value
      if (valueStr.includes("..")) {
        value = Level2Interval.fromString(valueStr.replace("..", "/"))
      } else {
        value = Level2Date.fromString(valueStr)
      }
      values.push(value)
    }
    return { values, exclusive }
  }
}
