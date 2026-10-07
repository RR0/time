import { Level0Component } from "../component/index.mjs"
import { level0Calendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

/**
 * The millisecond part of a date's seconds, rendered as 3 digits ("033").
 * Not a distinct EDTF component: it is the decimal fraction of the seconds, so it has no uncertainty/approximation of its own.
 */
export class Level0Millisecond extends Level0Component {
  static renderer = new PaddedComponentRenderer("0", 3)

  /**
   * @param {Level0ComponentSpec|number} spec The millisecond value spec
   * @param {CalendarUnit} [unit] The milliseconds unit (level0Calendar.millisecond by default).
   */
  constructor(spec, unit = level0Calendar.millisecond) {
    super(spec, unit)
  }

  /**
   * Reads the decimal fraction of seconds ("5" -> 500, "123" -> 123, "123456" -> 123, i.e. truncated to the millisecond).
   *
   * @param {string} fraction The digits following the decimal separator.
   * @return {number}
   */
  static parseFraction(fraction) {
    return parseInt(fraction.padEnd(3, "0").substring(0, 3), 10)
  }

  toString(renderer = Level0Millisecond.renderer) {
    return super.toString(renderer)
  }
}
