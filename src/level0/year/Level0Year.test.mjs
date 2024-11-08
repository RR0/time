import { describe, test } from "node:test"
import assert from "node:assert"

import { Level0Year } from "./Level0Year.mjs"
import { level0YearUnit } from "./Level0YearUnit.mjs"

describe("Level0Year", () => {

  const year1985 = 1985

  test("4 digits", () => {
    const certainYear = Level0Year.fromString(year1985.toString())
    assert.equal(certainYear.value, year1985)
    assert.equal(certainYear.unit.duration, level0YearUnit.duration)
    assert.equal(certainYear.duration, year1985 * level0YearUnit.duration)
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
    const certainYear = new Level0Year(year1985)
    assert.equal(certainYear.toString(), year1985.toString())
  })

  test("toString", () => {
    assert.throws(() => new Level0Year("incorrect"), { message: "year value must be a number, but was undefined" })
  })
})
