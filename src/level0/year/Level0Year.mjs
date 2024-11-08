import { Level0YearParser } from "./Level0YearParser.mjs"
import { Level0Component } from "../component/Level0Component.mjs"
import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { level0YearUnit } from "./Level0YearUnit.mjs"

export class Level0Year extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The year value spec (current year by default).
   * @param {TimeUnit} [unit] The year unit (Level0TimeUnits.year by default).
   */
  constructor (spec = new Date().getFullYear(), unit = level0YearUnit) {
    super(spec, unit)
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
