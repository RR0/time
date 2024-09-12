import { Level0Date } from "../../level0/date/Level0Date.mjs"
import Level1DateParser from "./Level1DateParser.mjs"

/**
 * @typedef {Level0DateSpec} Level1DateSpec
 */

export class Level1Date extends Level0Date {
  /**
   * @param {Level1DateSpec} spec
   */
  constructor (spec) {
    super(spec)
  }

  /**
   * @param {string} str An EDTF level 0-1 string
   * @return {Level1Date}
   */
  static fromString (str) {
    const parser = new Level1DateParser()
    const spec = parser.parse(str)
    return new Level1Date(spec)
  }

  static newInstance () {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level1Date.fromString(edtfNow)
  }

  /**
   * @return boolean
   */
  get uncertain () {
    return this.year?.uncertain === true || this.month?.uncertain === true || this.day?.uncertain === true || this.hour?.uncertain === true || this.minute?.uncertain === true || this.second?.uncertain === true
  }

  /**
   * @return boolean
   */
  get approximate () {
    return this.year?.approximate === true || this.month?.approximate === true || this.day?.approximate === true || this.hour?.approximate === true || this.minute?.approximate === true || this.second?.approximate === true
  }
}
