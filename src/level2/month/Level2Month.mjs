import { Level2MonthParser } from "./Level2MonthParser.mjs"
import { Level2Component } from "../component/Level2Component.mjs"
/** @import { Level2ComponentSpec } from "../component/Level2Component.mjs" */
import { level2MonthUnit } from "./Level2MonthUnit.mjs"

/**
 * @implements ILevel2Month
 */
export class Level2Month extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec The month value spec.
   * @param [unit] The month unit
   */
  constructor (spec, unit = level2MonthUnit) {
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
      const unit = level2MonthUnit
      const start = new Level2Month(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Month(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Month(parseResult)
    }
  }
}
