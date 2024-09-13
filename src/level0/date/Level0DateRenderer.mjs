/**
 * @interface
 * @typedef {Object} DateRenderer
 * @method render(date: Level0Date): string
 */

/**
 * @implements DateRenderer
 */
export class Level0DateRenderer {
  /**
   * @readonly
   * @type {Level0DateRenderer}
   */
  static instance = new Level0DateRenderer()

  /**
   * @param {Level0Date} date
   * @return {string}
   */
  render(date) {
    const dateCompStr = []
    if (date.year) {
      dateCompStr.push(date.year.toString())
    }
    if (date.month) {
      dateCompStr.push(date.month.toString())
    }
    if (date.day) {
      dateCompStr.push(date.day.toString())
    }
    const hourCompStr = []
    if (date.hour) {
      hourCompStr.push(date.hour.toString())
    }
    if (date.minute) {
      hourCompStr.push(date.minute.toString())
    }
    if (date.second) {
      hourCompStr.push(date.second.toString())
    }
    const dateStr = dateCompStr.join("-")
    const timeshiftStr = date.timeshift ? date.timeshift.toString() : ""
    const hourStr = hourCompStr.join(":") + timeshiftStr
    return dateStr + (hourStr.length > 0 ? "T" + hourStr : "")
  }
}
