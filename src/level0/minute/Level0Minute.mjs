import { Level0Component } from "../component/index.mjs"
import { Level0MinuteParser } from "./Level0MinuteParser.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"
import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { level0MinuteUnit } from "./Level0MinuteUnit.mjs"

export class Level0Minute extends Level0Component {
  /**
   * @protected Use Level0Minute.fromValue()
   * @param {Level0ComponentSpec|number} [spec] The minute value spec (or current minutes by default).
   * @param {TimeUnit} [unit] The minutes unit (Level0TimeUnits.minute by default).
   */
  constructor (spec = new Date().getMinutes(), unit) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {Level0ComponentSpec|number} [spec] The second value spec (or current second by default)
   * @param {TimeUnit} [unit] The minutes unit (level0MinuteUnit by default).
   */
  static fromValue (spec = new Date().getMinutes(), unit = level0MinuteUnit) {
    return new Level0Minute(spec, unit)
  }

  /**
   * @param {string} str
   * @param {Level0MinuteParser} [parser]
   * @return {Level0Minute}
   */
  static fromString (str, parser = new Level0MinuteParser()) {
    return new Level0Minute(parser.parse(str))
  }
}
