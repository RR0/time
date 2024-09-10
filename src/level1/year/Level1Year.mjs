import Level1YearParser from "./Level1YearParser.mjs"
import Level1Component from "../component/Level1Component.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"
import { CalendarUnit } from "../../calendar/Calendar.mjs"
import { Level1YearValidator } from "./Level1YearValidator.mjs"

const unit = new CalendarUnit(GregorianCalendar.year.name, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, GregorianCalendar.day, new Level1YearValidator())

export default class Level1Year extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec
   */
  constructor (spec) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @return {Level1Year | {start: Level1Year, end: Level1Year}}
   */
  static fromString (str) {
    const parser = new Level1YearParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const start = new Level1Year(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Year(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Year(parseResult)
    }
  }
}
