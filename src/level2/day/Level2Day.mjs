import { Level2Component } from "../component/Level2Component.mjs"
import { Level2DayParser } from "./Level2DayParser.mjs"
import { GregorianCalendar } from "../../calendar/GregorianCalendar.mjs"

export class Level2Day extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.day)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * If some digits are unspecified, an inferred days interval will be returned.
   *
   * @param {string} str
   * @return {Level2Day | {start: Level2Day, end: Level2Day}}
   */
  static fromString (str) {
    const parser = new Level2DayParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = GregorianCalendar.day
      const start = new Level2Day(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Day(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Day(parseResult)
    }
  }
}
