import Level0Date from "./date/Level0Date.mjs"
import Level0Year from "./year/Level0Year.mjs"
import Level0Month from "./month/Level0Month.mjs"
import Level0Day from "./day/Level0Day.mjs"
import Level0Hour from "./hour/Level0Hour.mjs"
import Level0Minute from "./minute/Level0Minute.mjs"
import Level0Second from "./second/Level0Second.mjs"
import Level0Timeshift from "./timeshift/Level0Timeshift.mjs"
import Level0Interval from "./interval/Level0Interval.mjs"

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
