import { Level2ComponentParser } from "../component/Level2ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

const name = "minuteValue"

export class Level2MinuteParser extends Level2ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(name, Level2MinuteParser.format())
  }
}
