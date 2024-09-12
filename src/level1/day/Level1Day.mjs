import { Level1DayParser } from "./Level1DayParser.mjs"
import { Level1Component } from "../component/index.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"

export class Level1Day extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.day)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level1Day | {start: Level1Day, end: Level1Day}}
   */
  static fromString (str) {
    const parser = new Level1DayParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      let unit = GregorianCalendar.day
      const start = new Level1Day(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Day(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Day(parseResult)
    }
  }
}
