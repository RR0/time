import { Level1MonthParser } from "./Level1MonthParser.mjs"
import { Level1Component } from "../component/Level1Component.mjs"
import { PaddedComponentRenderer } from "../../level0/PaddedComponentRenderer.mjs"
import { level1MonthUnit } from "./Level1MonthUnit.mjs"

/**
 * @implements ILevel1Month
 */
export class Level1Month extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec
   * @param [unit] The month unit.
   */
  constructor (spec, unit = level1MonthUnit) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
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
      const unit = level1MonthUnit
      const start = new Level1Month(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Month(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Month(parseResult)
    }
  }
}
