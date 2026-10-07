// Compiled (not run) by `npm run test-types`: what a TypeScript client may call must be typed so.
import { Level1Date, Level2Date, Level2Duration } from "@rr0/time"

const date = Level2Date.fromString("2004-06-11")
const level1 = Level1Date.fromString("2004-06-11")
const strings: string[] = [
  date.year.toString(), date.month.toString(), date.day.toString(),  // No renderer needed
  level1.month.toString(), level1.day.toString(),
  date.toString(), Level2Duration.fromString("PT30M").toString()
]
console.log(strings)
