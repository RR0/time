import { describe, test } from "node:test"
import assert from "node:assert"

import Level0Months from "./Level0Months.mjs"
import Level0Month from "./Level0Month.mjs"

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
    const certainMonth = Level0Months.April
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
    try {
      Level0Month.fromString("0")
      assert.fail("Should not allow 0-based months")
    } catch (e) {
      assert.equal(e.message, `month value must be >= 1 and <= 12`)
    }
  })

  test("too high", () => {
    try {
      Level0Month.fromString("13")
      assert.fail("Should not allow months > 12")
    } catch (e) {
      assert.equal(e.message, "month value must be >= 1 and <= 12")
    }
  })
})
