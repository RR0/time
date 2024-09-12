import Level2DateParser from "./Level2DateParser.mjs"
import { Level1Date } from "../../level1/date/Level1Date.mjs"

/**
 * @typedef {Level1DateSpec} Level2DateSpec
 */

export class Level2Date extends Level1Date {
  /**
   * @param {Level2DateSpec} spec
   */
  constructor (spec) {
    super(spec)
  }

  /**
   * @param {string} str An EDTF level 0-1 string
   * @return {Level2Date}
   */
  static fromString (str) {
    const parser = new Level2DateParser()
    const spec = parser.parse(str)
    return new Level2Date(spec)
  }

  static newInstance () {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level2Date.fromString(edtfNow)
  }
}
