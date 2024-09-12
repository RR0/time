import { Level2Component } from "../component/index.mjs"
import { Level2SecondParser } from "./Level2SecondParser.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"

export class Level2Second extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.second)
  }

  /**
   * If some digits are unspecified, an inferred seconds interval will be returned.
   *
   * @param {string} str
   * @return {Level2Second | {start: Level2Second, end: Level2Second}}
   */
  static fromString (str) {
    const parser = new Level2SecondParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = GregorianCalendar.second
      const start = new Level2Second(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Second(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Second(parseResult)
    }
  }
}
