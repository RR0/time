import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { level0MinuteUnit } from "../minute/Level0MinuteUnit.mjs"

export const level0HourUnit = new TimeUnit("hour", 0, 23, level0MinuteUnit)
