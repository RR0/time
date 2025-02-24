import { level0Calendar } from "./Level0Calendar.mjs"
import { describe, test } from "node:test"
import assert from "node:assert"

describe("Level0Calendar", () => {

  test("year", () => {
    const years = Array.from(level0Calendar.year)
    assert.equal(years.length, 10000)
    assert.equal(years[0], 0)
    assert.equal(years[years.length - 1], 9999)
  })

  test("month", () => {
    const months = Array.from(level0Calendar.month)
    assert.equal(months.length, 12)
    assert.equal(months[0], 1)
    assert.equal(months[months.length - 1], 12)
  })

  test("day", () => {
    const days = Array.from(level0Calendar.day)
    assert.equal(days.length, 31)
    assert.equal(days[0], 1)
    assert.equal(days[days.length - 1], 31)
  })

  test("hour", () => {
    const hours = Array.from(level0Calendar.hour)
    assert.equal(hours.length, 24)
    assert.equal(hours[0], 0)
    assert.equal(hours[hours.length - 1], 23)
  })

  test("minute", () => {
    const minutes = Array.from(level0Calendar.minute)
    assert.equal(minutes.length, 60)
    assert.equal(minutes[0], 0)
    assert.equal(minutes[minutes.length - 1], 59)
  })

  test("second", () => {
    const seconds = Array.from(level0Calendar.second)
    assert.equal(seconds.length, 60)
    assert.equal(seconds[0], 0)
    assert.equal(seconds[seconds.length - 1], 59)
  })

  test("millisecond", () => {
    const milliseconds = Array.from(level0Calendar.millisecond)
    assert.equal(milliseconds.length, 1000)
    assert.equal(milliseconds[0], 0)
    assert.equal(milliseconds[milliseconds.length - 1], 999)
  })
})
