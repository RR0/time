import { describe, test } from "node:test"
import assert from "node:assert"

import { Level0Year } from "./Level0Year.mjs"
import { level0Calendar } from "../../calendar/index.mjs"

describe("Level0Year", () => {

  const yearValue = 1985

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
