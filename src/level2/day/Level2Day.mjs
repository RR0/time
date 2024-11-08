import { Level2Component } from "../component/Level2Component.mjs"
/** @import { Level2ComponentSpec } from "../component/Level2Component.mjs" */
import { Level2DayParser } from "./Level2DayParser.mjs"
import { level2DayUnit } from "./Level2DayUnit.mjs"

export class Level2Day extends Level2Component {
  /**
   * @param {Level2ComponentSpec} spec
   * @param [unit] The day unit
   */
  constructor (spec, unit = level2DayUnit) {
    super(spec, unit)
  }

  /**
   * If some digits are unspecified, an inferred days interval will be returned.
   *
   * @param {string} str
   * @return {Level2Day | {start: Level2Day, end: Level2Day}}
   */
  static fromString (str) {
    const parser = new Level2DayParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = level2DayUnit
      const start = new Level2Day(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level2Day(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level2Day(parseResult)
    }
  }
}
