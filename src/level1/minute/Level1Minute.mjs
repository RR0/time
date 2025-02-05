import { Level1Component } from "../component/index.mjs"
import { Level1MinuteParser } from "./Level1MinuteParser.mjs"
import { level0Calendar } from "../../calendar/index.mjs"
import { Level1ComponentRenderer } from "../component/Level1ComponentRenderer.mjs"

export class Level1Minute extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec The minute spec value.
   * @param [unit] The minute unit.
   */
  constructor(spec, unit = level0Calendar.minute) {
    super(spec, unit)
  }

  /**
   * If some digits are unspecified, an inferred minutes interval will be returned.
   *
   * @param {string} str The string representation of a minute.
   * @param {Level1MinuteParser} [parser]
   * @return {Level1Minute | {start: Level1Minute, end: Level1Minute}}
   */
  static fromString(str, parser = new Level1MinuteParser()) {
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      const unit = level0Calendar.minute
      const start = new Level1Minute(Object.assign({ ...parseResult }, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Minute(Object.assign({ ...parseResult }, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Minute(parseResult)
    }
  }

  toString(renderer = Level1ComponentRenderer.instance) {
    return super.toString(renderer)
  }
}
