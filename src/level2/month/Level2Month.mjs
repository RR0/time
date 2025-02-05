import { Level2MonthParser } from "./Level2MonthParser.mjs"
import { Level2Component } from "../component/Level2Component.mjs"
/** @import { Level2ComponentSpec } from "../component/Level2Component.mjs" */
import { Level2MonthValidator } from "./Level2MonthValidator.mjs"
import { level0Calendar } from "../../level0/Level0Calendar.mjs"
import { CalendarUnit } from "../../calendar/unit/CalendarUnit.mjs"

export class Level2Month extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec The month value spec.
   * @param [unit] The month unit
   */
  constructor(spec, unit = new CalendarUnit(level0Calendar.month.name, 1, 41, level0Calendar.day, new Level2MonthValidator())) {
    super(spec, unit)
  }

  /**
   * If some digits are unspecified, an inferred months interval will be returned.
   *
   * @param {string} str
   * @return {Level2Month | {start: Level2Month, end: Level2Month}}
   */
  static fromString(str) {
    const parser = new Level2MonthParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = level0Calendar.month
      const start = new Level2Month(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Month(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Month(parseResult)
    }
  }

  toString() {
    return super.toString().padStart(2, "0")
  }
}
