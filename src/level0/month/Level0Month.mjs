import { Level0MonthParser } from "./Level0MonthParser.mjs"
import { Level0Component } from "../component/index.mjs"

import { GregorianMonth, level0Calendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Month extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} [spec] The month value spec (current month by default).
   * @param {GregorianMonth} [unit] The month unit (GregorianMonth.create(currentMonth) by default).
   */
  constructor(
    spec = new Date().getMonth() + 1,
    unit = level0Calendar.month
  ) {
    super(spec, unit)
  }

  /**
   * @param {string} str
   * @return {Level0Month}
   */
  static fromString(str) {
    const parser = new Level0MonthParser()
    return new Level0Month(parser.parse(str))
  }

  toString(renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }
}
