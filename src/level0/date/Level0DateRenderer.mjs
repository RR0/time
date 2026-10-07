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
   * @protected
   * @param {Level0Date} date
   * @param {"year"|"month"|"day"|"hour"|"minute"|"second"} name The name of the date component to render.
   * @return {string}
   */
  renderComponent(date, name) {
    return date[name].toString()
  }

  /**
   * @protected
   * @param {Level0Date} date
   * @return {string} The seconds, followed by the decimal fraction of the seconds, if any.
   */
  renderSecond(date) {
    return this.renderComponent(date, "second") + (date.millisecond ? "." + date.millisecond.toString() : "")
  }

  /**
   * @param {Level0Date} date
   * @return {string}
   */
  render(date) {
    const dateCompStr = []
    if (date.year) {
      dateCompStr.push(this.renderComponent(date, "year"))
    }
    if (date.month) {
      dateCompStr.push(this.renderComponent(date, "month"))
    }
    if (date.day) {
      dateCompStr.push(this.renderComponent(date, "day"))
    }
    const hourCompStr = []
    if (date.hour) {
      hourCompStr.push(this.renderComponent(date, "hour"))
    }
    if (date.minute) {
      hourCompStr.push(this.renderComponent(date, "minute"))
    }
    if (date.second) {
      hourCompStr.push(this.renderSecond(date))
    }
    const dateStr = dateCompStr.join("-")
    const timeshiftStr = date.timeshift ? date.timeshift.toString() : ""
    const hourStr = hourCompStr.join(":") + timeshiftStr
    return dateStr + (hourStr.length > 0 ? "T" + hourStr : "")
  }
}
