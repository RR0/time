import { Level1YearParser } from "./Level1YearParser.mjs"
import { Level1Component } from "../component/index.mjs"
import { level1Calendar } from "../Level1Calendar.mjs"

export class Level1Year extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec The year spec value.
   * @param [unit] The year unit.
   */
  constructor(spec, unit = level1Calendar.year) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @param [unit]
   * @return {Level1Year | {start: Level1Year, end: Level1Year}}
   */
  static fromString(str, unit = level1Calendar.year) {
    const parser = new Level1YearParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (str.startsWith("Y")) {
      unit = level1Calendar.yearExtended
    }
    if (startValue !== undefined) {
      const start = new Level1Year(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Year(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Year(parseResult, unit)
    }
  }
}
