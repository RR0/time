import { Level0YearParser } from "./Level0YearParser.mjs"
import { Level0Component } from "../component/Level0Component.mjs"
import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { Level0YearUnit, level0YearUnit } from "./Level0YearUnit.mjs"
import { Level0MonthUnit } from "../month/Level0MonthUnit.mjs"

/** import { Level0ComponentSpec } from "../component/Level0Component.mjs" */

export class Level0Year extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The year value spec (current year by default).
   * @param {TimeUnit} [unit] The year unit (Level0TimeUnits.year by default).
   */
  constructor (spec = new Date().getFullYear(), unit) {
    super(spec, unit)
  }

  get duration () {
    const unit = new Level0YearUnit(0, 9999, new Level0MonthUnit(this.value))
    return this.value * unit.duration
  }

  /**
   * @param {Level0ComponentSpec|number} [spec] The second value spec (or current second by default)
   * @param {TimeUnit} [unit] The day unit (level031DayUnit by default).
   */
  static fromValue (spec = new Date().getDate(), unit = level0YearUnit) {
    return new Level0Year(spec, unit)
  }

  /**
   * @param {string} str
   * @return {Level0Year}
   */
  static fromString (str) {
    const parser = new Level0YearParser()
    return new Level0Year(parser.parse(str))
  }
}
