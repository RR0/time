import { TimeUnits } from "../../unit/TimeUnits.mjs"
import { MonthUnit } from "../../unit/index.mjs"
import { level1MillisecondUnit } from "../second/Level1MillisecondUnit.mjs"
import { level1SecondUnit } from "../second/Level1SecondUnit.mjs"
import { level1MinuteUnit } from "../minute/index.mjs"
import { level1HourUnit } from "../hour/index.mjs"
import { level1DayUnit } from "../day/index.mjs"
import { level1YearUnit } from "../year/index.mjs"

export class Level1TimeUnits extends TimeUnits {

  millisecond = level1MillisecondUnit

  second = level1SecondUnit

  minute = level1MinuteUnit

  hour = level1HourUnit

  day = level1DayUnit

  month = MonthUnit.Month31

  year = level1YearUnit
}

export const level1TimeUnits = new Level1TimeUnits()
