import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level2ComponentParser, Level2ComponentParseResult } from "../component/Level2ComponentParser.mjs"
import { Level1ComponentParseResult } from "../../level1/component/Level1ComponentParser.mjs"

export class Level2YearParseResult extends Level2ComponentParseResult {
}

const name = "yearValue"
const exponentialGroup = "exp"
const significantGroup = "signif"

export class Level2YearParser extends Level2ComponentParser {
  constructor() {
    super(name, Level2YearParser.format())
  }

  /**
   * @param {string} prefix
   * @return {string}
   */
  static format(prefix = "") {
    return "Y?" + RegExpFormat.nonCapturingGroup(
      RegExpFormat.group(RegExpFormat.groupName(prefix, exponentialGroup), "[-]?\\d+E\\d+")
      + "|"
      + Level2ComponentParser.numberFormat(RegExpFormat.groupName(prefix, name), "+", "[-]?")
      + RegExpFormat.optionalGroup(RegExpFormat.groupName(prefix, significantGroup), "S\\d+")
    )
  }

  /**
   * @param {{ [p: string]: string }} groups
   * @return {Level2YearParseResult}
   */
  parseGroups(groups) {
    const exp = groups[exponentialGroup]
    if (exp) {
      const expPos = exp.indexOf("E")
      const pow = parseInt(exp.substring(expPos + 1), 10)
      const num = parseInt(exp.substring(0, expPos), 10)
      const value = num * Math.pow(10, pow)
      groups[name] = value.toString()
    }
    const signif = groups[significantGroup]
    const valueStr = groups[name]
    if (signif) {
      const significantCount = parseInt(signif.substring(1), 10)
      const { valueStr, sign } = this.getValueAndSign(groups)
      let valueWithUnspecified = ""
      for (let i = 0; i < valueStr.length; i++) {
        valueWithUnspecified += i < significantCount ? valueStr.charAt(i) : "X"
      }
      groups[name] = (sign < 0 ? "-" : "") + valueWithUnspecified
    }
    const result = super.parseGroups(groups)
    if (signif) {
      result.value.estimate = parseInt(valueStr, 10)
    }
    return result
  }

  /**
   * @param {string} str
   * @return {Level1ComponentParseResult}
   */
  parse(str) {
    // Doesn't call super.parse(str) to avoid year negativity error.
    const groups = this.regexGroups(str)
    return this.parseGroups(groups)
  }
}
