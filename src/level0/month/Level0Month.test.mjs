import { describe, test } from "node:test"
import assert, { fail } from "node:assert"

import { Level0Months } from "./Level0Months.mjs"
import { Level0Month } from "./Level0Month.mjs"
import { level0Calendar } from "../Level0Calendar.mjs"

describe("Level0Month", () => {

  test("certain", () => {
    const month = Level0Month.fromString("04")
    assert.equal(month.value, 4)
  })

  test("comparison", () => {
    const monthBefore = Level0Month.fromString("04")
    assert.equal(monthBefore.isEqual(monthBefore), true)
    const monthAfter = Level0Month.fromString("12")
    assert.equal(monthBefore.isEqual(monthAfter), false)
    assert.equal(monthBefore.isBefore(monthAfter), true)
    assert.equal(monthAfter.isBefore(monthBefore), false)
    assert.equal(monthBefore.isAfter(monthAfter), false)
    assert.equal(monthAfter.isAfter(monthBefore), true)
  })

  test("toString", () => {
    assert.equal(new Level0Month(4).toString(), "04")
    assert.equal(new Level0Month(12).toString(), "12")
  })

  test("predefined", () => {
    const certainMonth = Level0Months.april
    assert.equal(certainMonth.value, 4)
  })

  test("minimum", () => {
    const certainMonth = Level0Month.fromString("01")
    assert.equal(certainMonth.value, 1)
  })

  test("maximum", () => {
    const certainMonth = Level0Month.fromString("12")
    assert.equal(certainMonth.value, 12)
  })

  test("too low", () => {
    assert.throws(() => Level0Month.fromString("0"), { message: "month value must be >= 1 and <= 12, but was 0" })
  })

  test("too high", () => {
    assert.throws(() => Level0Month.fromString("13"), { message: "month value must be >= 1 and <= 12, but was 13" })
  })

  const montValue = 7

  describe("prev", () => {

    test("valid", () => {
      const month = new Level0Month(montValue)
      const next = month.previous()
      assert.equal(next.value, montValue - 1)
    })

    test("overflow", () => {
      const monthMin = level0Calendar.month.min
      const certainYear = new Level0Month(monthMin)
      try {
        certainYear.previous()
        fail("Should not allow next month before min")
      } catch (e) {
        assert.equal(e.message, "month value must be >= 1 and <= 12, but was 0")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const month = new Level0Month(montValue)
      const next = month.next()
      assert.equal(next.value, montValue + 1)
    })

    test("overflow", () => {
      const monthMax = level0Calendar.month.max
      const month = new Level0Month(monthMax)
      try {
        month.next()
        fail("Should not allow next month after max")
      } catch (e) {
        assert.equal(e.message, "month value must be >= 1 and <= 12, but was 13")
      }
    })
  })

})
