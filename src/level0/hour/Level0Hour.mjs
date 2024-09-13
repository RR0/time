import { Level0Component } from "../component/index.mjs"
import { Level0HourParser } from "./Level0HourParser.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Hour extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec = new Date().getHours()) {
    super(spec, GregorianCalendar.hour)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
  }

  /**
   * @param {string} str
   * @param {Level0HourParser} parser
   * @return {Level0Hour}
   */
  static fromString (str, parser = new Level0HourParser()) {
    return new Level0Hour(parser.parse(str))
  }
}
