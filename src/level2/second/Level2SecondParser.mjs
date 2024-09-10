import Level2ComponentParser from "../component/Level2ComponentParser.mjs"
import RegExpFormat from "../../RegExpFormat.mjs"

const name = "secondValue"

export default class Level2SecondParser extends Level2ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format (prefix = "") {
    return Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(Level2SecondParser.format(), name)
  }
}
