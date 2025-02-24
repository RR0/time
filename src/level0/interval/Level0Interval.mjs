import { Level0IntervalParser } from "./Level0IntervalParser.mjs"
import { Level0IntervalRenderer } from "./Level0IntervalRenderer.mjs"
import { Level0Date } from "../date/index.mjs"
import { EDTFError } from "../../EDTFError.mjs"
import { Level0Duration } from "../duration/index.mjs"

/**
 * @template S extends Level0Component = Level0Date
 * @template E extends Level0Component = Level0Date
 */
export class Level0Interval {
  /**
   * @param {Level0Date|null|undefined} start
   * @param {Level0Date|null|undefined} end
   */
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  /**
   * @readonly
   * @protected
   * @type {Level0Date|null|undefined}
   */
  _start

  /**
   * @return {Level0Date|null|undefined}
   */
  get start() {
    return this._start
  }

  /**
   * @param {Level0Date|null|undefined} start
   */
  set start(start) {
    if (typeof start === "string") {
      start = Level0Date.fromString(start)
    }
    if (start && !(start instanceof Level0Date) && !(start instanceof Level0Duration)) {
      throw new EDTFError("Interval start is not a level 0 date or duration: " + start)
    }
    this._start = start
  }

  /**
   * @protected
   * @readonly
   * @type {Level0Date|null|undefined}
   */
  _end

  /**
   * @return {Level0Date|null|undefined}
   */
  get end() {
    return this._end
  }

  /**
   * @param {Level0Date|null|undefined} end
   */
  set end(end) {
    if (typeof end === "string") {
      end = Level0Date.fromString(end)
    }
    if (end && !(end instanceof Level0Date) && !(end instanceof Level0Duration)) {
      throw new EDTFError("Interval end is not a level 0 date or duration: " + end)
    }
    this._end = end
  }

  /**
   * @param {string} spec
   * @param {EDTFParser} parser
   * @return {Level0Interval}
   */
  static fromString(spec, parser = new Level0IntervalParser()) {
    const { start, end } = parser.parse(spec)
    return new Level0Interval(start, end)
  }

  toString(renderer = Level0IntervalRenderer.instance) {
    return renderer.render(this)
  }

  [Symbol.iterator]() {
    let value = this.start
    return {
      next: () => {
        const result = {
          done: value > this.end,
          value
        }
        value++
        return result
      }
    }
  }
}
