import { Level1Component } from "../component/index.mjs"
import { Level1HourParser } from "./Level1HourParser.mjs"
import { level0Calendar } from "../../calendar/index.mjs"

export class Level1Hour extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec The hour spec value.
   * @param [unit] The hour unit.
   */
  constructor(spec, unit = level0Calendar.hour) {
    super(spec, unit)
  }

  /**
   * If some digits are unspecified, an inferred hour interval will be returned.
   *
   * @param {string} str
   * @return {Level1Hour | {start: Level1Hour, end: Level1Hour}}
   */
  static fromString(str) {
    const parser = new Level1HourParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      let unit = level0Calendar.hour
      const start = new Level1Hour(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Hour(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Hour(parseResult)
    }
  }
}
