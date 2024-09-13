import { Level0MonthParser } from "./Level0MonthParser.mjs"
import { Level0Component } from "../component/index.mjs"

import { GregorianMonth } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Month extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   * @param {GregorianMonth} unit
   */
  constructor (
    spec = new Date().getMonth() + 1,
    unit = GregorianMonth.create(new Date().getMonth() + 1, new Date().getFullYear())
  ) {
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
