import Level2DateParser from "./Level2DateParser.mjs"
import Level1Date from "../../level1/date/Level1Date.mjs"

export default class Level2Date extends Level1Date {
  /**
   * @param {Level2Year} year
   * @param {Level2Month} month
   * @param {Level2Day} day
   * @param {Level2Hour} hour
   * @param {Level2Minute} minute
   * @param {Level2Second} second
   * @param {Level2Timeshift} timeshift
   */
  constructor (year, month, day, hour, minute, second, timeshift) {
    super(year, month, day, hour, minute, second, timeshift)
  }

  /**
   * @param {string} str An EDTF level 0-1 string
   * @return {Level2Date}
   */
  static fromString (str) {
    const parser = new Level2DateParser()
    const { year, month, day, hour, minute, second, timeshift } = parser.parse(str)
    return new Level2Date(year, month, day, hour, minute, second, timeshift)
  }

  static newInstance () {
    const utcNow = new Date().toISOString()
    const millisPos = utcNow.indexOf(".")
    const edtfNow = utcNow.substring(0, millisPos) + utcNow.substring(millisPos + 4)
    return Level2Date.fromString(edtfNow)
  }
}
