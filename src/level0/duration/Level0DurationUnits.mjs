import { TimeUnits } from "../../unit/TimeUnits.mjs"
import { DurationUnit } from "../../unit/DurationUnit.mjs"

export class Level0DurationUnits extends TimeUnits {

  millisecond = new DurationUnit("milliseconds", undefined, undefined)

  second = new DurationUnit("seconds", 1000, this.millisecond)

  minute = new DurationUnit("minutes", 60, this.second)

  hour = new DurationUnit("hours", 60, this.minute)

  day = new DurationUnit("days", 24, this.hour)

  month = new DurationUnit("months", 30, this.day)

  year = new DurationUnit("years", 365, this.day)
}

export const level0DurationUnits = new Level0DurationUnits()
