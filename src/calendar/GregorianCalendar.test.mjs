import { describe } from "node:test"
import { level0Calendar } from "../level0/Level0Calendar.mjs"
import assert from "node:assert"

describe("GregorianCalendar", () => {

  assert.equal(level0Calendar.millisecond.duration, 1)
  assert.equal(level0Calendar.second.duration, 1000)
  assert.equal(level0Calendar.minute.duration, 60 * 1000)
  assert.equal(level0Calendar.hour.duration, 60 * 60 * 1000)
  assert.equal(level0Calendar.day.duration, 24 * 60 * 60 * 1000)
  assert.equal(level0Calendar.month.duration, 31 * 24 * 60 * 60 * 1000)
  assert.equal(level0Calendar.year.duration, 12 * 31 * 24 * 60 * 60 * 1000)
})
