import Level2DateParser from "./Level2DateParser.mjs"
import { Level1Date } from "../../level1/date/Level1Date.mjs"
import { Level2Second } from "../second/index.mjs"
import { Level2Minute } from "../minute/index.mjs"
import { Level2Hour } from "../hour/index.mjs"
import { Level2Day } from "../day/index.mjs"
import { Level2Month } from "../month/index.mjs"
import { Level2Year } from "../year/index.mjs"

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

  newYear (value) {
    return new Level2Year(value)
  }

  newMonth (value) {
    return new Level2Month(value)
  }

  newDay (value) {
    return new Level2Day(value)
  }

  newHour (value) {
    return new Level2Hour(value)
  }

  newMinute (value) {
    return new Level2Minute(value)
  }

  newSecond (value) {
    return new Level2Second(value)
  }

  /**
   * @param {string} str An EDTF level 0-1 string
   * @param {Level2DateParser} parser
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
