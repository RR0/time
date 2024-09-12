import { describe, test } from "node:test"
import assert from "node:assert"

import { Level0Duration } from "./Level0Duration.mjs"
import { Level0Date } from "../date/index.mjs"
import { GregorianCalendar } from "../../calendar/index.mjs"

describe("Duration", () => {

  describe("parsing", () => {

    test("in seconds", () => {
      const seconds = 3
      const toString = `P${seconds}S`
      const durationMs = Level0Duration.fromString(toString)
      assert.equal(durationMs.millis, seconds * GregorianCalendar.second.duration)
    })
  })

  describe("programmatic", () => {

    test("in seconds", () => {
      const seconds = 3
      const durationMs = new Level0Duration(seconds * GregorianCalendar.second.duration)
      const toString = `P${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level0Duration({ seconds })
      assert.equal(durationObj.toString(), toString)
    })

    test("in minutes", () => {
      const minutes = 1
      const seconds = 3
      const durationMs = new Level0Duration(minutes * GregorianCalendar.minute.duration + seconds * GregorianCalendar.second.duration)
      const toString = `P${minutes}M${seconds}S`
      assert.equal(durationMs.toString(), toString)
      const durationObj = new Level0Duration({ minutes, seconds })
      assert.equal(durationObj.toString(), toString)
    })
  })

  test("between", () => {
    const beforeDate = Level0Date.fromString("1985-04-21")
    const twoDays = Level0Duration.between(beforeDate, Level0Date.fromString("1985-04-23"))
    assert.equal(twoDays.millis, 2 * GregorianCalendar.day.duration)
    const years = Level0Duration.between(beforeDate, Level0Date.fromString("2001"))
    const expected = ((2001 - 1985) * GregorianCalendar.year.duration) - (8 * GregorianCalendar.month.duration) - (7 * GregorianCalendar.day.duration)
    // assert.equal(years.millis, expected)
  })
})
