import Level1ComponentParser from "../component/Level1ComponentParser.mjs"
import RegExpFormat from "../../util/regexp/RegExpFormat.mjs"

const name = "yearValue"

export default class Level1YearParser extends Level1ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return "Y?" + Level1ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "+", "[-]?")
  }

  constructor () {
    super(Level1YearParser.format(), name)
  }
}
