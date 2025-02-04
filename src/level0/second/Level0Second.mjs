import { Level0Component } from "../component/Level0Component.mjs"
import { Level0SecondParser } from "./Level0SecondParser.mjs"
import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"
import { level0SecondUnit } from "./Level0SecondUnit.mjs"

export class Level0Second extends Level0Component {
  /**
   * @protected
   * @param {Level0ComponentSpec|number} [spec] The second value spec (or current second by default)
   * @param {TimeUnit} [unit] The seconds unit (Level0TimeUnits.second by default).
   */
  constructor (spec, unit) {
    super(spec, unit)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {Level0ComponentSpec|number} [spec] The second value spec (or current second by default)
   * @param {TimeUnit} [unit] The seconds unit (Level0TimeUnits.second by default).
   */
  static fromValue (spec = new Date().getSeconds(), unit = level0SecondUnit) {
    return new Level0Second(spec, unit)
  }

  /**
   * @param {string} str
   * @param {SecondUnit} unit
   * @return {Level0Second}
   */
  static fromString (str, unit = level0SecondUnit) {
    const parser = new Level0SecondParser()
    return new Level0Second(parser.parse(str), unit)
  }
}
