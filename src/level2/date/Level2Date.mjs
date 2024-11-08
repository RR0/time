import { Level2DateParser } from "./Level2DateParser.mjs"
import { Level1Date } from "../../level1/date/Level1Date.mjs"
import { level2Factory } from "../Level2Factory.mjs"
/** @import { EDTFParser } from "../../EDTFParser.mjs" */

/** @import { Level1DateSpec } from "../../level1/date/Level1Date.mjs" */

/**
 * @typedef {Level1DateSpec} Level2DateSpec
 */

export class Level2Date extends Level1Date {
  /**
   * @readonly
   * @type {Level2Factory}
   */
  factory = level2Factory

  /**
   * @param {Level2DateSpec} spec
   */
  constructor (spec) {
    super(spec)
  }

  /**
   * @param {string} str An EDTF level 0-1 string
   * @param {EDTFParser} parser
   * @return {Level2Date}
   */
  static fromString (str, parser = new Level2DateParser()) {
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
