import Level2YearParser from "./Level2YearParser.mjs"
import Level2Component from "../component/Level2Component.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"
import { CalendarUnit } from "../../calendar/Calendar.mjs"
import { Level1YearValidator } from "../../level1/year/Level1YearValidator.mjs"

const unit = new CalendarUnit(GregorianCalendar.year.name, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, GregorianCalendar.day, new Level1YearValidator())

export default class Level2Year extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec
   */
  constructor (spec) {
    super(spec, unit)
  }

  /**
   * @param {string} str The EDTF string.
   * @return {Level2Year | {start: Level2Year, end: Level2Year}}
   */
  static fromString (str) {
    const parser = new Level2YearParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const start = new Level2Year(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Year(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      const interval = { start, end }
      const estimate = parseResult.value.estimate
      if (estimate) {
        interval.estimate = estimate
      }
      return interval
    } else {
      return new Level2Year(parseResult)
    }
  }
}
