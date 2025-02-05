import { Level1Component } from "../component/index.mjs"
import { Level1SecondParser } from "./Level1SecondParser.mjs"
import { level0Calendar } from "../../calendar/index.mjs"

export class Level1Second extends Level1Component {
  /**
   * @param {Level1ComponentSpec} spec The second spec value.
   * @param [unit] The second unit.
   */
  constructor(spec, unit = level0Calendar.second) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @return {Level1Second | {start: Level1Second, end: Level1Second}}
   */
  static fromString(str) {
    const parser = new Level1SecondParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = level0Calendar.second
      const start = new Level1Second(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Second(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Second(parseResult)
    }
  }
}
