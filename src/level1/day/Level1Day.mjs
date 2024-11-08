import { Level1DayParser } from "./Level1DayParser.mjs"
import { Level1Component } from "../component/index.mjs"
/** @import { Level1ComponentSpec } from "../component/index.mjs" */
import { level031DayUnit } from "../../level0/index.mjs"
import { PaddedComponentRenderer } from "../../level0/PaddedComponentRenderer.mjs"

export const level1DayUnit = level031DayUnit

export class Level1Day extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec The day spec value.
   * @param [unit] The day unit.
   */
  constructor (spec, unit = level1DayUnit) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str
   * @return {Level1Day | {start: Level1Day, end: Level1Day}}
   */
  static fromString (str) {
    const parser = new Level1DayParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      let unit = level1DayUnit
      const start = new Level1Day(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Day(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Day(parseResult)
    }
  }
}
