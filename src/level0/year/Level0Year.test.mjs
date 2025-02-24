import { describe, test } from "node:test"
import assert, { fail } from "node:assert"

import { Level0Year } from "./Level0Year.mjs"
import { level0Calendar } from "../../calendar/index.mjs"

describe("Level0Year", () => {

  const yearValue = 1985

  describe("prev", () => {

    test("valid", () => {
      const certainYear = new Level0Year(yearValue)
      const next = certainYear.previous()
      assert.equal(next.value, yearValue - 1)
    })

    test("overflow", () => {
      const certainYear = new Level0Year(level0Calendar.year.min)
      try {
        certainYear.previous()
        fail("Should not allow next year before min")
      } catch (e) {
        assert.equal(e.message, "year value must be >= 0 and <= 9999, but was -1")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const certainYear = new Level0Year(yearValue)
      const next = certainYear.next()
      assert.equal(next.value, yearValue + 1)
    })

    test("overflow", () => {
      const certainYear = new Level0Year(level0Calendar.year.max)
      try {
        certainYear.next()
        fail("Should not allow next year after max")
      } catch (e) {
        assert.equal(e.message, "year value must be >= 0 and <= 9999, but was 10000")
      }
    })
  })

  test("4 digits", () => {
    const certainYear = Level0Year.fromString(yearValue.toString())
    assert.equal(certainYear.value, yearValue)
    assert.equal(certainYear.unit.duration, level0Calendar.year.duration)
    assert.equal(certainYear.duration, yearValue * level0Calendar.year.duration)
  })

  test("comparison", () => {
    const yearBefore = Level0Year.fromString("1985")
    assert.equal(yearBefore.isEqual(yearBefore), true)
    const yearAfter = Level0Year.fromString("2001")
    assert.equal(yearBefore.isEqual(yearAfter), false)
    assert.equal(yearBefore.isBefore(yearAfter), true)
    assert.equal(yearAfter.isBefore(yearBefore), false)
    assert.equal(yearBefore.isAfter(yearAfter), false)
    assert.equal(yearAfter.isAfter(yearBefore), true)
  })

  test("toString", () => {
    const certainYear = new Level0Year(yearValue)
    assert.equal(certainYear.toString(), yearValue.toString())
  })

  test("toString", () => {
    assert.throws(() => new Level0Year("incorrect"), { message: "year value must be a number, but was undefined" })
  })
})
