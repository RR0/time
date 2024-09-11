import Level2MonthParser from "./Level2MonthParser.mjs"
import Level2Component from "../component/Level2Component.mjs"
import { Level2MonthValidator } from "./Level2MonthValidator.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"

import { CalendarUnit } from "../../calendar/unit/CalendarUnit.mjs"

const unit = new CalendarUnit(GregorianCalendar.month.name, 1, 41, GregorianCalendar.day, new Level2MonthValidator())

export default class Level2Month extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec
   */
  constructor (spec) {
    super(spec, unit)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * If some digits are unspecified, an inferred months interval will be returned.
   *
   * @param {string} str
   * @return {Level2Month | {start: Level2Month, end: Level2Month}}
   */
  static fromString (str) {
    const parser = new Level2MonthParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = GregorianCalendar.month
      const start = new Level2Month(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Month(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Month(parseResult)
    }
  }
}
