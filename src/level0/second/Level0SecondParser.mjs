import Level0ComponentParser from "../component/Level0ComponentParser.mjs"
import RegExpFormat from "../../util/regexp/RegExpFormat.mjs"

const name = "secondValue"

export default class Level0SecondParser extends Level0ComponentParser {
  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    return RegExpFormat.numberGroup(RegExpFormat.groupName(prefix, name), "{1,2}", undefined)
  }

  constructor () {
    super(name, Level0SecondParser.format())
  }
}
