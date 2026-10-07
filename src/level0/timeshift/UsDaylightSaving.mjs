/**
 * The date and hour of a time, as much as needed to know on which side of a daylight saving transition it is.
 *
 * @typedef {Object} TimeshiftAt
 * @property {number} [year]
 * @property {number} [month] From 1 to 12.
 * @property {number} [day]
 * @property {number} [hour] Defaults to the middle of the day.
 */

/**
 * Daylight saving time in the United States, which tells if "Pacific Time" is -08 (PST) or -07 (PDT) at some time.
 *
 * The Uniform Time Act applies since 1967, with a rule that changed several times:
 * - 2007 and after: from the second Sunday of March to the first Sunday of November,
 * - 1987 to 2006: from the first Sunday of April to the last Sunday of October,
 * - 1976 to 1986: from the last Sunday of April to the last Sunday of October,
 * - 1974 and 1975: from January 6th (February 23rd in 1975) to the last Sunday of October,
 * - 1967 to 1973: from the last Sunday of April to the last Sunday of October.
 * Each transition occurs at 02:00. Before 1967 there was no rule common to the states: those times are standard times.
 */
export class UsDaylightSaving {

  /**
   * @param {number} standardMinutes The offset of the standard time of a zone, in minutes east of UTC (-480 for PST).
   * @param {TimeshiftAt} at
   * @return {number} The offset of the zone at this time, in minutes east of UTC.
   */
  static timeshift(standardMinutes, at) {
    return standardMinutes + (UsDaylightSaving.isDaylight(at) ? 60 : 0)
  }

  /**
   * @param {TimeshiftAt} at
   * @return {boolean} If daylight saving time is in effect at this time.
   */
  static isDaylight(at) {
    const { year, month, day } = at
    const hour = at.hour ?? 12
    if (![year, month, day].every(Number.isInteger)) {
      throw new RangeError("Daylight saving time depends on the year, month and day")
    }
    const rule = UsDaylightSaving.rule(year)
    if (!rule) {
      return false
    }
    const time = UsDaylightSaving.rank(month, day, hour)
    return time >= UsDaylightSaving.rank(rule.start.month, rule.start.day, 2)
      && time < UsDaylightSaving.rank(rule.end.month, rule.end.day, 2)
  }

  /**
   * @return {{start: {month: number, day: number}, end: {month: number, day: number}} | undefined} The transitions of a year.
   */
  static rule(year) {
    if (year < 1967) {
      return undefined
    }
    const lastOctober = { month: 10, day: UsDaylightSaving.sunday(year, 10, -1) }
    if (year >= 2007) {
      return { start: { month: 3, day: UsDaylightSaving.sunday(year, 3, 2) }, end: { month: 11, day: UsDaylightSaving.sunday(year, 11, 1) } }
    } else if (year >= 1987) {
      return { start: { month: 4, day: UsDaylightSaving.sunday(year, 4, 1) }, end: lastOctober }
    } else if (year === 1975) {
      return { start: { month: 2, day: 23 }, end: lastOctober }
    } else if (year === 1974) {
      return { start: { month: 1, day: 6 }, end: lastOctober }
    }
    return { start: { month: 4, day: UsDaylightSaving.sunday(year, 4, -1) }, end: lastOctober }
  }

  /**
   * @param {number} year
   * @param {number} month From 1 to 12.
   * @param {number} nth Which Sunday of the month: 1 for the first one, -1 for the last one.
   * @return {number} The day of the month.
   */
  static sunday(year, month, nth) {
    const first = new Date(Date.UTC(2000, month - 1, 1))
    first.setUTCFullYear(year)  // Years before 100 too
    const firstSunday = 1 + (7 - first.getUTCDay()) % 7
    if (nth > 0) {
      return firstSunday + 7 * (nth - 1)
    }
    const monthLength = [31, UsDaylightSaving.isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
    let day = firstSunday
    while (day + 7 <= monthLength) {
      day += 7
    }
    return day
  }

  static isLeap(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  }

  /**
   * @return {number} A number which orders times of a year.
   */
  static rank(month, day, hour) {
    return (month * 100 + day) * 100 + hour
  }
}
