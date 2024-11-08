import { Level2Component } from "../component/Level2Component.mjs"
/** @import { Level2ComponentSpec } from "../component/Level2Component.mjs" */
import { Level2HourParser } from "./Level2HourParser.mjs"
import { level2HourUnit } from "./Level2HourUnit.mjs"

export class Level2Hour extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec The hour spec value.
   * @param [unit] The hour unit (level0TimeUnits.hour by default)
   */
  constructor (spec, unit = level2HourUnit) {
    super(spec, unit)
  }

  /**
   * If some digits are unspecified, an inferred hours interval will be returned.
   *
   * @param {string} str
   * @return {Level2Hour | {start: Level2Hour, end: Level2Hour}}
   */
  static fromString (str) {
    const parser = new Level2HourParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = level2HourUnit
      const start = new Level2Hour(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Hour(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Hour(parseResult)
    }
  }
}
