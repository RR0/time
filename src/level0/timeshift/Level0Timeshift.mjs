import Level0TimeshiftParser from "./Level0TimeshiftParser.mjs"

export default class Level0Timeshift {
  /**
   * @readonly
   * @type number
   */
  value

  /**
   * @readonly
   * @type string
   */
  name = "timeshift"

  /**
   * @param {number} value
   */
  constructor (value = 0) {
    this.value = value
  }

  toString () {
    const absValue = Math.abs(this.value)
    const hours = Math.floor(absValue / 60)
    const minutes = absValue % 60
    return hours === 0 && minutes === 0 ? "Z" : (this.value < 0 ? "-" : "+") + hours.toString().padStart(2, "0") + (minutes ? ":" + minutes.toString().padEnd(2, "0") : "")
  }

  /**
   * @param {string} str
   * @return {Level0Timeshift}
   */
  static fromString (str) {
    const parser = new Level0TimeshiftParser()
    return new Level0Timeshift(parser.parse(str))
  }
}
