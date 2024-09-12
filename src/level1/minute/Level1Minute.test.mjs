import { describe, test } from "node:test"
import assert from "node:assert"

import { level1Assert } from "../component/Level1TestUtil.mjs"

import { Level1Minute } from "./Level1Minute.mjs"

describe("Level1Minute", () => {

  test("certain", () => {
    const minute = Level1Minute.fromString("56")
    assert.equal(minute.value, 56)
    assert.equal(minute.uncertain, false)
    assert.equal(minute.approximate, false)
  })

  test("uncertain", () => {
    const maybeMinute = Level1Minute.fromString("56?")
    assert.equal(maybeMinute.value, 56)
    assert.equal(maybeMinute.uncertain, true)
    assert.equal(maybeMinute.approximate, false)
  })

  test("approximate", () => {
    const aroundMinute = Level1Minute.fromString("56~")
    assert.equal(aroundMinute.value, 56)
    assert.equal(aroundMinute.uncertain, false)
    assert.equal(aroundMinute.approximate, true)
  })

  test("uncertain and approximate", () => {
    const maybeAroundMinute = Level1Minute.fromString("56%")
    assert.equal(maybeAroundMinute.value, 56)
    assert.equal(maybeAroundMinute.uncertain, true)
    assert.equal(maybeAroundMinute.approximate, true)
  })

  describe("unspecified", () => {

    test("month unit", () => {
      const unspecifiedMonthUnit = Level1Minute.fromString("0X")
      level1Assert(unspecifiedMonthUnit.start, 0)
      level1Assert(unspecifiedMonthUnit.end, 9)
    })

    test("month decade and unit", () => {
      const unspecifiedMonthUnit = Level1Minute.fromString("XX")
      level1Assert(unspecifiedMonthUnit.start, 0)
      level1Assert(unspecifiedMonthUnit.end, 59)
    })
  })
})
