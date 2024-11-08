import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { level0SecondUnit } from "../second/Level0SecondUnit.mjs"

export const level0MinuteUnit = new TimeUnit("minute", 0, 59, level0SecondUnit)
