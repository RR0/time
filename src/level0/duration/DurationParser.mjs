import EDTFParser from "../../EDTFParser.mjs"

/**
 * @typedef {Object} DurationParseResult
 * @property {number} [second]
 * @property {number} [minute]
 * @property {number} [hour]
 * @property {number} [day]
 * @property {number} [month]
 * @property {number} [year]
 */

export default class DurationParser extends EDTFParser {

  constructor () {
    super("duration", format())
  }

  parse (str) {
    return undefined
  }
}
