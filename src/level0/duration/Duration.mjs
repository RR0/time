import Level0Second from "../second/Level0Second.mjs"

export default class Duration {
  /**
   * @readonly
   * @type number
   */
  millis

  /**
   * @param {number} millis
   */
  constructor(millis) {
    this.millis = millis
  }

  /**
   * @param {Level0Date} beforeDate
   * @param {Level0Date} afterDate
   * @return {Duration}
   */
  static between(beforeDate, afterDate) {
    const afterTime = afterDate.getTime()
    const beforeTime = beforeDate.getTime()
    return new Duration(afterTime - beforeTime)
  }

  toString(){
    return "P" + this.millis / Level0Second.DURATION + "S"
  }
}
