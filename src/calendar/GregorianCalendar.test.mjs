import { describe } from "node:test"
import { GregorianCalendar } from "./GregorianCalendar.mjs"
import assert from "node:assert"

describe("GregorianCalendar", () => {

  assert.equal(GregorianCalendar.millisecond.duration, 1)
  assert.equal(GregorianCalendar.second.duration, 1000)
  assert.equal(GregorianCalendar.minute.duration, 60 * 1000)
  assert.equal(GregorianCalendar.hour.duration, 60 * 60 * 1000)
  assert.equal(GregorianCalendar.day.duration, 24 * 60 * 60 * 1000)
  assert.equal(GregorianCalendar.month.duration, 31 * 24 * 60 * 60 * 1000)
  assert.equal(GregorianCalendar.year.duration, 12 * 31 * 24 * 60 * 60 * 1000)
})
