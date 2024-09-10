import Level1Component from "../component/Level1Component.mjs"
import Level1SecondParser from "./Level1SecondParser.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"

export default class Level1Second extends Level1Component {
  /**
   * @param {Level1ComponentSpec} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.second)
  }

  /**
   * @param {string} str
   * @return {Level1Second | {start: Level1Second, end: Level1Second}}
   */
  static fromString (str) {
    const parser = new Level1SecondParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = GregorianCalendar.second
      const start = new Level1Second(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Second(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Second(parseResult)
    }
  }
}
