import {
  Level2Date as EdtfDate,
  Level2Duration as EdtfDuration,
  Level2Interval as EdtfInterval,
  Level2Timeshift
} from "./level2/index.mjs"

/**
 * Time context for a RR0 page.
 */
export class TimeContext {
  /**
   * @readonly
   */
  static MINUTE = 60
  /**
   * @readonly
   */
  static HOUR = 60 * TimeContext.MINUTE
  /**
   * @readonly
   */
  static DAY = 24 * TimeContext.HOUR
  /**
   * @type EdtfDate | undefined
   */
  date
  /**
   * @type EdtfInterval | undefined
   */
  interval
  /**
   * @type EdtfDuration | undefined
   */
  duration

  /**
   *
   * @param {number} [_year]
   * @param {number} [_month]
   * @param {number} [_dayOfMonth]
   * @param {number} [_hour]
   * @param {number} [_minutes]
   * @param {string} [_timeZone]
   * @param {boolean} [approximate]
   * @param {boolean} [approximateTime]
   * @param {TimeContext | undefined} [from]
   * @param {TimeContext | undefined} [to]
   * @param {number | undefined} [duration]
   */
  constructor(
    _year = undefined,
    _month = undefined,
    _dayOfMonth = undefined,
    _hour = undefined,
    _minutes = undefined,
    _timeZone = undefined,
    approximate = false,
    approximateTime = false,
    /** @deprecated */
    from = undefined,
    /** @deprecated */
    to = undefined,
    duration = undefined
  ) {
    if (from) {
      this.interval = new EdtfInterval(from?.date, to?.date)
    } else if (duration) {
      this.duration = new EdtfDuration(duration)
    } else {
      this.date = new EdtfDate(
        { year: _year, month: _month, day: _dayOfMonth, hour: _hour, minute: _minutes, timeZone: _timeZone })
      if (approximate) {
        this.date.year.approximate = true
      }
      if (approximateTime) {
        if (this.date.hour) {
          this.date.hour.approximateComponent = true
        }
        if (this.date.minutes) {
          this.date.minutes.approximateComponent = true
        }
        if (this.date.seconds) {
          this.date.seconds.approximateComponent = true
        }
      }
    }
  }

  /**
   * @return {EdtfDate | undefined}
   */
  get from() {
    return this.interval?.start
  }

  /**
   * @return {EdtfDate | undefined}
   */
  get to() {
    return this.interval?.end
  }

  /**
   * @return {boolean}
   */
  get approximate() {
    return this.date?.approximate || this.interval?.approximate || this.duration?.approximate
  }

  /**
   *
   * @param {boolean} approx
   */
  set approximate(approx) {
    this.date.approximate = approx
  }

  /**
   * @return {boolean}
   */
  get approximateTime() {
    return this.approximate || this.date?.hour?.approximate || this.date?.minute?.approximate || this.date?.second?.approximate
  }

  /**
   *
   * @param {string} timeStr
   * @return {TimeContext}
   */
  static fromString(timeStr) {
    const timeContext = new TimeContext()
    timeContext.updateFromStr(timeStr)
    return timeContext
  }

  /**
   * @param {Date} date
   * @return {TimeContext}
   */
  static fromDate(date) {
    return new TimeContext(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(),
      "UTC" + (date.getTimezoneOffset() < 0 ? "-" : "+") + date.getTimezoneOffset())
  }

  /**
   * @param {string} timeStr
   * @return If the string could be parsed
   */
  updateFromStr(timeStr) {
    let valid = Boolean(timeStr)
    if (valid) {
      try {
        this.interval = EdtfInterval.fromString(timeStr)
        this.date = undefined
        this.duration = undefined
      } catch (e) {
        try {
          this.duration = EdtfDuration.fromString(timeStr)
          this.interval = undefined
          this.date = undefined
        } catch (e) {
          try {
            this.date = EdtfDate.fromString(timeStr)
            this.duration = undefined
            this.interval = undefined
          } catch (e) {
            console.warn("Could not resolve time string", timeStr, e.message)
            valid = false
          }
        }
      }
    }
    return valid
  }

  /**
   *
   * @return {number | undefined}
   */
  getYear() {
    return this.date?.year?.value
  }

  /**
   * @param {number | undefined} year
   * @param {boolean} [print]
   * @return {TimeContext}
   */
  setYear(year, print = true) {
    if (year !== this.date?.year?.value && print) {
      this.setMonth(undefined, print)
    }
    this.date = this.date || new EdtfDate()
    this.date.year = year
    return this
  }

  /**
   * @return {number | undefined}
   */
  getMonth() {
    return this.date?.month?.value
  }

  /**
   *
   * @param {number | undefined} month
   * @param {boolean} [print]
   * @return {TimeContext}
   */
  setMonth(month, print = true) {
    if (month !== this.date?.month?.value && print) {
      this.setDayOfMonth(undefined, print)
    }
    this.date = this.date || new EdtfDate()
    this.date.month = month
    return this
  }

  /**
   * @return {number | undefined}
   */
  getDayOfMonth() {
    return this.date?.day?.value
  }

  /**
   * @param {number | undefined} dayOfMonth
   * @param {boolean} [print]
   * @return {TimeContext}
   */
  setDayOfMonth(dayOfMonth, print = true) {
    if (dayOfMonth !== this.date?.day?.value && print) {
      this.setHour(undefined, print)
    }
    this.date = this.date || new EdtfDate()
    this.date.day = dayOfMonth
    return this
  }

  /**
   * @return {number | undefined}
   */
  getHour() {
    return this.date?.hour?.value
  }

  /**
   *
   * @param {number | undefined} hour
   * @param {boolean} [print]
   * @return {TimeContext}
   */
  setHour(hour, print = true) {
    if (hour !== this.date?.hour?.value && print) {
      this.setMinutes(undefined)
    }
    this.date = this.date || new EdtfDate()
    this.date.hour = hour
    return this
  }

  /**
   * @return {number | undefined}
   */
  getMinutes() {
    return this.date?.minute?.value
  }

  /**
   * @param {number | undefined} minutes
   * @return {TimeContext}
   */
  setMinutes(minutes) {
    this.date = this.date || new EdtfDate()
    this.date.minute = minutes
    return this
  }

  /**
   * @deprecated
   * @return {string | undefined}
   */
  getTimeZone() {
    return this.date?.timeshift?.toString()
  }

  /**
   * @return {string | undefined}
   */
  getTimeshift() {
    return this.date?.timeshift?.toString()
  }

  /**
   * @param {string | undefined} timeZone
   * @return {TimeContext}
   */
  setTimeZone(timeZone) {
    this.date = this.date || new Level2Timeshift()
    try {
      this.date.timeshift = Level2Timeshift.fromString(timeZone)
    } catch (e) {
      console.warn("Could not resolve time zone", timeZone, e.message)
    }
    return this
  }

  /**
   * @return {boolean}
   */
  isDefined() {
    const date = this.date
    if (!date) {
      return false
    }
    return date.year?.value !== undefined
      || date.month?.value !== undefined
      || date.day?.value !== undefined
      || date.hour?.value !== undefined
      || date.minute?.value !== undefined
  }

  /**
   * @return {TimeContext}
   */
  clone() {
    const date = this.date
    const interval = this.interval
    return new TimeContext(
      date?.year?.value, date?.month?.value, date?.day?.value,
      date?.hour?.value, date?.minute?.value,
      date?.timeshift?.value,
      this.approximate, this.approximateTime,
      interval?.from, interval?.to,
      this.duration
    )
  }

  /**
   *
   * @return {this}
   */
  reset() {
    this.date = undefined
    this.interval = undefined
    this.duration = undefined
    return this
  }

  /**
   * @param {TimeContext} other
   * @return {boolean}
   */
  isBefore(other) {
    return this.toString().localeCompare(other.toString()) < 0
  }

  /**
   * @param {TimeContext} other
   * @return {boolean}
   */
  isAfter(other) {
    return this.toString().localeCompare(other.toString()) > 0
  }

  /**
   * @param {TimeContext} other
   * @return {boolean}
   */
  equals(other) {
    return this.toString() === other.toString()
  }

  /**
   * @return {string}
   */
  toString() {
    return this.date ? this.date.toString() : ""
  }

  /**
   * @return {string}
   */
  toJSON() {
    return this.toString()
  }

  /**
   * @protected
   * @param {any} value
   */
  isSet(value) {
    return value !== void 0 && value != null
  }
}
