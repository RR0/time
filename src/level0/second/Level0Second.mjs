import Level0Component from "../component/Level0Component.mjs"
import Level0SecondParser from "./Level0SecondParser.mjs"
import { SecondValidator } from "./SecondValidator.mjs"

const name = "second"

export default class Level0Second extends Level0Component {
  /**
   * @readonly
   */
  static DURATION = 1000

  /**
   * @param {number} value
   * @param {EDTFValidator} validator
   */
  constructor (value = new Date().getSeconds(), validator = new SecondValidator()) {
    super(value, name, validator, Level0Second.DURATION)
  }

  toString () {
    return super.toString().padStart(2, "0")
  }

  /**
   * @param {string} str
   * @return {Level0Second}
   */
  static fromString (str) {
    const parser = new Level0SecondParser()
    return new Level0Second(parser.parse(str))
  }
}
