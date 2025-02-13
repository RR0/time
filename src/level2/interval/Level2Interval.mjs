import { Level2Date } from "../date/index.mjs"
import { EDTFError } from "../../EDTFError.mjs"
import { Level2Duration } from "../duration/index.mjs"
import { Level2IntervalParser } from "./Level2IntervalParser.mjs"
import { Level1Interval } from "../../level1/interval/Level1Interval.mjs"

/** @import { EDTFParser } from "../../EDTFParser.mjs" */

export class Level2Interval extends Level1Interval {
  /**
   * @return {Level2Date|null|undefined}
   */
  get start() {
    return this._start
  }

  /**
   * @param {Level2Date|null|undefined} start
   */
  set start(start) {
    if (typeof start === "string") {
      super.start = Level2Date.fromString(start)
    }
    if (start && !(start instanceof Level2Date) && !(start instanceof Level2Duration)) {
      throw new EDTFError("Interval start is not a level 2 date or duration: " + start)
    }
    this._start = start
  }

  /**
   * @return {Level2Date|null|undefined}
   */
  get end() {
    return this._end
  }

  set end(end) {
    if (typeof end === "string") {
      end = Level2Date.fromString(end)
    }
    if (end && !(end instanceof Level2Date) && !(end instanceof Level2Duration)) {
      throw new EDTFError("Interval end is not a level 2 date or duration: " + end)
    }
    this._end = end
  }

  /**
   * @param {string} spec
   * @param {EDTFParser} parser
   * @return {Level2Interval}
   */
  static fromString(spec, parser = new Level2IntervalParser()) {
    const { start, end } = parser.parse(spec)
    return new Level2Interval(start, end)
  }
}
