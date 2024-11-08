import { Level0MonthParser } from "./Level0MonthParser.mjs"
import { Level0Component } from "../component/Level0Component.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"
import { MonthUnit } from "../../unit/MonthUnit.mjs"
import { level0MonthUnit } from "./Level0MonthUnit.mjs"

/**
 * @implements ILevel0Month
 * @extends ILevel0Component
 */
export class Level0Month extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The month value spec (current month by default).
   * @param {MonthUnit} [unit] The month unit (MonthUnit.create(currentMonth) by default).
   */
  constructor (spec = new Date().getMonth() + 1, unit = MonthUnit.create(new Date().getMonth() + 1, new Date().getFullYear())) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str
   * @return {Level0Month}
   */
  static fromString (str) {
    const parser = new Level0MonthParser()
    return new Level0Month(parser.parse(str))
  }
}
