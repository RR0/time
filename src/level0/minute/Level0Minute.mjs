import Level0Component from "../component/Level0Component.mjs"
import Level0MinuteParser from "./Level0MinuteParser.mjs"
import Level0Second from "../second/Level0Second.mjs"
import { MinuteValidator } from "./MinuteValidator.mjs"

const name = "minute"

export default class Level0Minute extends Level0Component {
  /**
   * @readonly
   */
  static DURATION = 60 * Level0Second.DURATION

  /**
   * @param {number} value
   * @param {EDTFValidator} validator
   */
  constructor (value = new Date().getMinutes(), validator = new MinuteValidator()) {
    super(value, name, validator, Level0Minute.DURATION)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level0Minute}
   */
  static fromString (str) {
    const parser = new Level0MinuteParser()
    return new Level0Minute(parser.parse(str))
  }
}
