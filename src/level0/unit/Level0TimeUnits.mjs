import { TimeUnits } from "../../unit/TimeUnits.mjs"
import { MonthUnit } from "../../unit/index.mjs"
import { level0MillisecondUnit } from "../second/Level0MillisecondUnit.mjs"
import { level0SecondUnit } from "../second/Level0SecondUnit.mjs"
import { level0MinuteUnit } from "../minute/Level0MinuteUnit.mjs"
import { level0HourUnit } from "../hour/Level0HourUnit.mjs"
import { level031DayUnit } from "../day/Level031DayUnit.mjs"
import { level0YearUnit } from "../year/index.mjs"

export class Level0TimeUnits extends TimeUnits {

  millisecond = level0MillisecondUnit

  second = level0SecondUnit

  minute = level0MinuteUnit

  hour = level0HourUnit

  day = level031DayUnit

  month = MonthUnit.Month31

  year = level0YearUnit
}

export const level0TimeUnits = new Level0TimeUnits()
