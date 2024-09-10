import Level0ComponentParser from "../component/Level0ComponentParser.mjs"
import RegExpFormat from "../../RegExpFormat.mjs"

const name = "monthValue"

export default class Level0MonthParser extends Level0ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    return RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(Level0MonthParser.format(), name)
  }
}
