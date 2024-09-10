import Level2Month from "./month/Level2Month.mjs"
import Level2Year from "./year/Level2Year.mjs"
import Level2Day from "./day/Level2Day.mjs"
import Level2Hour from "./hour/Level2Hour.mjs"
import Level2Minute from "./minute/Level2Minute.mjs"
import Level2Second from "./second/Level2Second.mjs"
import Level2Date from "./date/Level2Date.mjs"
import Level2Timeshift from "./timeshift/Level2Timeshift.mjs"
import Level2Interval from "./interval/Level2Interval.mjs"
import Level2Set from "./set/Level2Set.mjs"

export const level2 = {
  Year: Level2Year,
  Month: Level2Month,
  Day: Level2Day,
  Hour: Level2Hour,
  Minute: Level2Minute,
  Second: Level2Second,
  Timeshift: Level2Timeshift,
  Date: Level2Date,
  Interval: Level2Interval,
  Set: Level2Set
}
export default level2
