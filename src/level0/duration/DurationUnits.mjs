import { CalendarUnit }  from "../../calendar/index.mjs"
import { TimeUnits } from "../../calendar/unit/TimeUnits.mjs"

export class DurationUnits extends TimeUnits {

  millisecond = new CalendarUnit("milliseconds", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, undefined)

  second = new CalendarUnit("seconds", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.millisecond)

  minute = new CalendarUnit("minutes", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.second)

  hour = new CalendarUnit("hours", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.minutes)

  day = new CalendarUnit("days", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.hour)

  month = new CalendarUnit("months", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.day)

  year = new CalendarUnit("years", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, this.month)
}

export const durationUnits = new DurationUnits()
