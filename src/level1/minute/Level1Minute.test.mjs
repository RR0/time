import { describe, test } from "node:test"
import assert from "node:assert"

import { level1Assert } from "../component/Level1TestUtil.mjs"

import { Level1Minute } from "./Level1Minute.mjs"
import { Level0ComponentRenderer } from "../../level0/component/Level0ComponentRenderer.mjs"
import { calendarUnits } from "../../calendar/index.mjs"

describe("Level1Minute", () => {

  describe("render", () => {

    test("default", () => {
      const zeroMn = new Level1Minute(calendarUnits.minute.min)
      assert.equal(zeroMn.toString(), "00")
      zeroMn.approximate = true
      assert.equal(zeroMn.toString(), "00~")
      zeroMn.uncertain = true
      assert.equal(zeroMn.toString(), "00%")
      zeroMn.approximate = false
      assert.equal(zeroMn.toString(), "00?")
    })

    test("custom renderer", () => {
      const customRenderer = new class extends Level0ComponentRenderer {
        render (comp) {
          const value = comp.value
          return (comp.uncertain ? "maybe " : "") + (comp.approximate ? "around " : "") + value + " minute" + (value > 1 ? "s" : "")
        }
      }()
      const oneMinute = new Level1Minute(calendarUnits.minute.min + 1)
      assert.equal(oneMinute.toString(customRenderer), "1 minute")
      oneMinute.uncertain = true
      assert.equal(oneMinute.toString(customRenderer), "maybe 1 minute")
      oneMinute.approximate = true
      assert.equal(oneMinute.toString(customRenderer), "maybe around 1 minute")
      oneMinute.uncertain = false
      assert.equal(oneMinute.toString(customRenderer), "around 1 minute")
    })
  })

  test("certain", () => {
    const twoDigits = "09"
    const minute = Level1Minute.fromString(twoDigits)
    assert.equal(minute.value, 9)
    assert.equal(minute.uncertain, false)
    assert.equal(minute.approximate, false)
    assert.equal(minute.toString(), twoDigits)
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
