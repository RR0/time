import Level1Year from "./year/Level1Year.mjs"
import Level1Month from "./month/Level1Month.mjs"
import Level1Day from "./day/Level1Day.mjs"
import { Level1Date } from "./date/index.mjs"
import Level1Hour from "./hour/Level1Hour.mjs"
import Level1Minute from "./minute/Level1Minute.mjs"
import Level1Second from "./second/Level1Second.mjs"
import Level1Timeshift from "./timeshift/Level1Timeshift.mjs"
import { Level1Interval } from "./interval/index.mjs"

export const level1 = {
  Year: Level1Year,
  Month: Level1Month,
  Day: Level1Day,
  Hour: Level1Hour,
  Minute: Level1Minute,
  Second: Level1Second,
  Timeshift: Level1Timeshift,
  Date: Level1Date,
  Interval: Level1Interval
}
export default level1
