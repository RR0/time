import Level2Component from "../component/Level2Component.mjs"
import Level2MinuteParser from "../minute/Level2MinuteParser.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"

export default class Level2Minute extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.minute)
  }

  /**
   * If some digits are unspecified, an inferred minutes interval will be returned.
   *
   * @param {string} str
   * @return {Level2Minute | {start: Level2Minute, end: Level2Minute}}
   */
  static fromString (str) {
    const parser = new Level2MinuteParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = GregorianCalendar.minute
      const start = new Level2Minute(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Minute(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Minute(parseResult)
    }
  }
}
