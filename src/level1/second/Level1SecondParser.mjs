import Level1ComponentParser from "../component/Level1ComponentParser.mjs"
import RegExpFormat from "../../util/regexp/RegExpFormat.mjs"

const name = "secondValue"

export default class Level1SecondParser extends Level1ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return Level1ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(Level1SecondParser.format(), name)
  }
}
