import { TimeUnit } from "../../unit/TimeUnit.mjs"
import { level0MillisecondUnit } from "./Level0MillisecondUnit.mjs"

export const level0SecondUnit = new TimeUnit("second", 0, 59, level0MillisecondUnit)
