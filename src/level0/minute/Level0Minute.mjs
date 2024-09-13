import { Level0Component } from "../component/index.mjs"
import { Level0MinuteParser } from "./Level0MinuteParser.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"
import { PaddedComponentRenderer } from "../PaddedComponentRenderer.mjs"

export class Level0Minute extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec = new Date().getMinutes()) {
    super(spec, GregorianCalendar.minute)
  }

  toString (renderer = PaddedComponentRenderer.default) {
    return super.toString(renderer)
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
