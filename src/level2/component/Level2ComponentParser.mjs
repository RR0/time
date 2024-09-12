import { Level1ComponentParser } from "../../level1/component/Level1ComponentParser.mjs"
import { RegExpFormat } from "../../util/regexp/RegExpFormat.mjs"

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
