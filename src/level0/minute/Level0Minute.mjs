import { Level0Component } from "../component/index.mjs"
import { Level0MinuteParser } from "./Level0MinuteParser.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"

export class Level0Minute extends Level0Component {
  /**
   * @param {Level0ComponentSpec|number} spec
   */
  constructor (spec = new Date().getMinutes()) {
    super(spec, GregorianCalendar.minute)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level0Minute}
   */
  static fromString (str) {
    const parser = new Level0MinuteParser()
    return new Level0Minute(parser.parse(str))
  }
}
