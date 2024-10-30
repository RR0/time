import { Level1YearParser } from "./Level1YearParser.mjs"
import { Level1Component } from "../component/index.mjs"
import { CalendarUnit, calendarUnits, GregorianCalendar } from "../../calendar/index.mjs"
import { Level1YearValidator } from "./Level1YearValidator.mjs"

const level1YearUnit = new CalendarUnit(calendarUnits.year.name, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, GregorianCalendar.month, new Level1YearValidator())

export class Level1Year extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec The year spec value.
   * @param [unit] The year unit.
   */
  constructor (spec, unit = level1YearUnit) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @param [unit]
   * @return {Level1Year | {start: Level1Year, end: Level1Year}}
   */
  static fromString (str, unit = level1YearUnit) {
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
