import Level0IntervalParser from "./Level0IntervalParser.mjs"

/**
 * @template S extends Level0Component = Level0Date
 * @template E extends Level0Component = Level0Date
 */
export default class Level0Interval {
  /**
   * @readonly
   * @type S
   */
  start

  /**
   * @readonly
   * @type {E}
   */
  end

  /**
   * @param {S} start
   * @param {E} end
   */
  constructor (start, end) {
    this.start = start
    this.end = end
  }

  toString () {
    return (this.start ? this.start : "") + "/" + (this.end ? this.end : "")
  }

  /**
   * @param {string} spec
   */
  static fromString (spec) {
    const parser = /** Level0DateParser<Level0Year, Level0Month, Level0Day> */ new Level0IntervalParser()
    const { start, end } = parser.parse(spec)
    return new Level0Interval(start, end)
  }
}
