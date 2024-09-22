import { Level1ComponentParser } from "../component/Level1ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

const name = "dayValue"

export class Level1DayParser extends Level1ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return Level1ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(name, Level1DayParser.format())
  }
}
