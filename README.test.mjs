import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2Date as EdtfDate } from "./src/level2/date/index.mjs"
import { Level2Interval as EdtfInterval } from "./src/level2/interval/index.mjs"

describe("Demo samples", () => {

  describe("Dates", () => {

    test("uncertain", () => {
      const maybeAugust = EdtfDate.fromString("2024-?08-25")
      assert.equal(maybeAugust.month.value, 8)
      assert.equal(maybeAugust.month.uncertainComponent, true)
      assert.equal(maybeAugust.year.uncertain, true)
      assert.equal(maybeAugust.year.uncertainComponent, false)
      assert.equal(maybeAugust.uncertain, true)
    })

    test("approximate", () => {
      const aroundMarch2025 = EdtfDate.fromString("2025-03~")
      assert.equal(aroundMarch2025.month.approximate, true)
      assert.equal(aroundMarch2025.month.value, 3)
      assert.equal(aroundMarch2025.year.approximate, true)
      assert.equal(aroundMarch2025.year.value, 2025)
      assert.equal(aroundMarch2025.year.approximate, true)
      assert.equal(aroundMarch2025.approximate, true)
    })
  })

  describe("Intervals", () => {

    test("from uncertain to approximate", {skip: true}, () => {
      const maybeAugust = EdtfInterval.fromString("2023-12-?08/2024-12~")
      assert.equal(maybeAugust.start.day.value, 8)
      assert.equal(maybeAugust.start.day.uncertainComponent, true)
      assert.equal(maybeAugust.end.month.value, 12)
      assert.equal(maybeAugust.end.month.uncertain, true)
    })

    test("approximate", {skip: true}, () => {
      const aroundMarch2025 = EdtfDate.fromString("2025-03~")
      assert.equal(aroundMarch2025.month.approximate, true)
      assert.equal(aroundMarch2025.month.value, 3)
      assert.equal(aroundMarch2025.year.approximate, true)
      assert.equal(aroundMarch2025.year.value, 2025)
      assert.equal(aroundMarch2025.year.approximate, true)
      assert.equal(aroundMarch2025.approximate, true)
    })
  })
})
