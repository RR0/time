import { Level1ComponentParser } from "../../level1/component/Level1ComponentParser.mjs"
import "../../level1/year/Level1YearParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"
import { Level1YearParseResult } from "../../level1/year/Level1YearParser.mjs"

export class Level2YearParseResult extends Level1YearParseResult {
  /**
   * @type boolean
   */
  uncertain1

  /**
   * @type boolean
   */
  approximate1

  /**
   * @type boolean
   */
  uncertain1approximate1
}

export class Level2ComponentParser extends Level1ComponentParser {
  /**
   * @readonly
   * @type {string}
   */
  static uncertainGroup = "uncertain1"

  /**
   * @readonly
   * @type {string}
   */
  static approximateGroup = "approx1"

  /**
   * @readonly
   * @type {string}
   */
  static uncertainAndApproximateGroup = Level2ComponentParser.uncertainGroup + Level2ComponentParser.approximateGroup

  /**
   * @param {string} count
   * @param {string} name The group name
   * @param {string} prefix This can be allowed signs or "Y"
   * @return {string} The relevant regex pattern.
   */
  static numberFormat (name, count, prefix) {
    return this.qualifierFormat(RegExpFormat.groupName(Level2ComponentParser.uncertainGroup, name), "?")
      + this.qualifierFormat(RegExpFormat.groupName(Level2ComponentParser.approximateGroup, name), "~")
      + this.qualifierFormat(RegExpFormat.groupName(Level2ComponentParser.uncertainAndApproximateGroup, name), "%")
      + Level1ComponentParser.numberFormat(name, count, prefix)
  }

  /**
   * @param {string} name
   * @param {string} format
   * @return {number}
   */
  constructor (name, format) {
    super(name, format)
  }

  /**
   * @param {{ [p: string]: string }} groups
   * @return {Level2YearParseResult}
   */
  parseGroups (groups) {
    const result = super.parseGroups(groups)
    const uncertainAndApproximate = groups[RegExpFormat.groupName(Level2ComponentParser.uncertainAndApproximateGroup, this.name)]
    if (groups[RegExpFormat.groupName(Level2ComponentParser.uncertainGroup, this.name)] || uncertainAndApproximate) {
      result.uncertainComponent = true
    }
    if (groups[RegExpFormat.groupName(Level2ComponentParser.approximateGroup, this.name)] || uncertainAndApproximate) {
      result.approximateComponent = true
    }
    return result
  }
}
