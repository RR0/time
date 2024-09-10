import Level0ComponentParser from "../component/Level0ComponentParser.mjs"
import RegExpFormat from "../../RegExpFormat.mjs"

const name = "yearValue"

export default class Level0YearParser extends Level0ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, name), "{4}", undefined)
  }

  constructor () {
    super(Level0YearParser.format(), name)
  }
}
