import Level0ComponentParser from "../component/Level0ComponentParser.mjs"
import RegExpFormat from "../../RegExpFormat.mjs"

const name = "hourValue"

export default class Level0HourParser extends Level0ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    return RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(Level0HourParser.format(), name)
  }
}
