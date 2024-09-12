import { Level0Year } from "./year/index.mjs"
import { Level0Month } from "./month/index.mjs"
import { Level0Day } from "./day/Level0Day.mjs"
import { Level0Hour } from "./hour/index.mjs"
import { Level0Minute } from "./minute/index.mjs"
import { Level0Second } from "./second/index.mjs"
import { Level0Timeshift } from "./timeshift/index.mjs"
import { Level0Date } from "./date/index.mjs"
import { Level0Interval } from "./interval/index.mjs"

export const level0 = {
  Year: Level0Year,
  Month: Level0Month,
  Day: Level0Day,
  Hour: Level0Hour,
  Minute: Level0Minute,
  Second: Level0Second,
  Timeshift: Level0Timeshift,
  Date: Level0Date,
  Interval: Level0Interval
}
export default level0
