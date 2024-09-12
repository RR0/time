import { Level1MonthParser } from "./Level1MonthParser.mjs"
import { Level1Component } from "../component/index.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"
import { Level1MonthValidator } from "./Level1MonthValidator.mjs"
import { CalendarUnit } from "../../calendar/index.mjs"

const unit = new CalendarUnit(GregorianCalendar.month.name, 1, 24, GregorianCalendar.day, new Level1MonthValidator())

export class Level1Month extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec
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
   * @param {string} str A month EDTF string.
   * @return {Level1Month | {start: Level1Month, end: Level1Month}}
   */
  static fromString (str) {
    const parser = new Level1MonthParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      let unit = GregorianCalendar.month
      const start = new Level1Month(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Month(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Month(parseResult)
    }
  }
}
