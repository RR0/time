import { Level0Component } from "../component/index.mjs"
import { Level0MinuteParser } from "./Level0MinuteParser.mjs"
import { level0Calendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Minute extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The minute value spec (or current minutes by default).
   * @param {CalendarUnit} [unit] The minutes unit (GregorianCalendar.minute by default).
   */
  constructor(spec = new Date().getMinutes(), unit = level0Calendar.minute) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @param {Level0MinuteParser} [parser]
   * @return {Level0Minute}
   */
  static fromString(str, parser = new Level0MinuteParser()) {
    return new Level0Minute(parser.parse(str))
  }

  toString(renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }
}
