import { describe, test } from "node:test"
import assert from "node:assert"

import Level0Year from "./Level0Year.mjs"

describe("Level0Year", () => {

  test("4 digits", () => {
    const certainYear = Level0Year.fromString("1985")
    assert.equal(certainYear.value, 1985)
    const yearMs = 365 * 24 * 60 * 60 * 1000
    assert.equal(certainYear.unitDuration, yearMs)
    assert.equal(certainYear.duration, 1985 * yearMs)
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
    const certainYear = new Level0Year(1985)
    assert.equal(certainYear.toString(), "1985")
  })
})
