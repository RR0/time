export class GregorianCalendar {
  /**
   * @param {Level0Year|number} year
   * @return {boolean}
   */
  static isLeap (year) {
    const value = typeof year === "number" ? year : year.value
    return value % 100 === 0 ? value % 400 === 0 : value % 4 === 0
  }
}
