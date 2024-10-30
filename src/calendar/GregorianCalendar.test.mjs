import { describe } from "node:test"
import { calendarUnits } from "./GregorianCalendar.mjs"
import assert from "node:assert"

describe("GregorianCalendar", () => {

  assert.equal(calendarUnits.millisecond.duration, 1)
  assert.equal(calendarUnits.second.duration, 1000)
  assert.equal(calendarUnits.minute.duration, 60 * 1000)
  assert.equal(calendarUnits.hour.duration, 60 * 60 * 1000)
  assert.equal(calendarUnits.day.duration, 24 * 60 * 60 * 1000)
  assert.equal(calendarUnits.month.duration, 31 * 24 * 60 * 60 * 1000)
  assert.equal(calendarUnits.year.duration, 12 * 31 * 24 * 60 * 60 * 1000)
})
