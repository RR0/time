import { TimeUnits } from "../../unit/TimeUnits.mjs"
import { level2MillisecondUnit } from "../second/Level2MillisecondUnit.mjs"
import { level2SecondUnit } from "../second/Level2SecondUnit.mjs"
import { level2MinuteUnit } from "../minute/Level2MinuteUnit.mjs"
import { level2HourUnit } from "../hour/Level2HourUnit.mjs"
import { level2DayUnit } from "../day/Level2DayUnit.mjs"
import { level2MonthUnit } from "../month/Level2MonthUnit.mjs"
import { level2YearUnit } from "../year/Level2YearUnit.mjs"

export class Level2TimeUnits extends TimeUnits {

  millisecond = level2MillisecondUnit

  second = level2SecondUnit

  minute = level2MinuteUnit

  hour = level2HourUnit

  day = level2DayUnit

  month = level2MonthUnit

  year = level2YearUnit
}

export const level2TimeUnits = new Level2TimeUnits()
