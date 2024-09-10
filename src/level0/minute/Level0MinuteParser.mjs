import Level0ComponentParser from "../component/Level0ComponentParser.mjs"
import RegExpFormat from "../../RegExpFormat.mjs"

const name = "minuteValue"

export default class Level0MinuteParser extends Level0ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    return RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(Level0MinuteParser.format(), name)
  }
}
