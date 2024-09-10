import Level1Component from "../component/Level1Component.mjs"
import Level1MinuteParser from "./Level1MinuteParser.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"

export default class Level1Minute extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.minute)
  }

  /**
   * If some digits are unspecified, an inferred minutes interval will be returned.
   *
   * @param {string} str
   * @return {Level1Minute | {start: Level1Minute, end: Level1Minute}}
   */
  static fromString (str) {
    const parser = new Level1MinuteParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      let unit = GregorianCalendar.minute
      const start = new Level1Minute(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Minute(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Minute(parseResult)
    }
  }
}
