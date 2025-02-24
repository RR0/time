import { describe, test } from "node:test"
import assert, { fail } from "node:assert"

import { Level0Day } from "./Level0Day.mjs"
import { level0Calendar } from "../Level0Calendar.mjs"
import { GregorianMonth } from "../../calendar/index.mjs"

describe("Level0Day", () => {

  test("certain", () => {
    const day = Level0Day.fromString("30")
    assert.equal(day.value, 30)
  })

  test("toString", () => {
    assert.equal(new Level0Day(9).toString(), "09")
    assert.equal(new Level0Day(30).toString(), "30")
  })

  const dayValue = 15

  describe("prev", () => {

    test("valid", () => {
      const day = new Level0Day(dayValue)
      const next = day.previous()
      assert.equal(next.value, dayValue - 1)
    })

    test("overflow", () => {
      const dayMin = level0Calendar.day.min
      const day = new Level0Day(dayMin)
      try {
        day.previous()
        fail("Should not allow next month before min")
      } catch (e) {
        assert.equal(e.message, "day value must be >= 1 and <= 31, but was 0")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const day = new Level0Day(dayValue)
      const next = day.next()
      assert.equal(next.value, dayValue + 1)

      const dayFeb = new Level0Day(dayValue, GregorianMonth.Month28)
      const nextFeb = dayFeb.next()
      assert.equal(nextFeb.value, dayValue + 1)
    })

    test("overflow", () => {
      const dayMax = level0Calendar.day.max
      const day = new Level0Day(dayMax)
      try {
        day.next()
        fail("Should not allow next month after max")
      } catch (e) {
        assert.equal(e.message, "day value must be >= 1 and <= 31, but was 32")
      }

      const febUnit = GregorianMonth.create(2)
      const febDayMax = febUnit.max
      const febDay = new Level0Day(febDayMax, febUnit)
      try {
        febDay.next()
        fail("Should not allow next month after max")
      } catch (e) {
        assert.equal(e.message, "month value must be >= 1 and <= 28, but was 29")
      }
    })
  })
})
