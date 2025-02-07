import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2Date as EdtfDate } from "./src/level2/date/index.mjs"
import { Level2Interval as EdtfInterval } from "./src/level2/interval/index.mjs"

import { Level2Duration as Duration } from "./src/level2/duration/index.mjs"
import { level0Calendar } from "./src/calendar/index.mjs"
import { assertLevel2 } from "./src/level2/component/Level2TestUtil.mjs"

describe("Demo samples", () => {

  describe("Dates", () => {

    test("comparison", () => {
      const maybeAugust = EdtfDate.fromString("2024-?08-15")
      const aroundMarch2025 = EdtfDate.fromString("2025-03~")
      assert.ok(!maybeAugust.isEqual(aroundMarch2025))
      assert.ok(maybeAugust.isBefore(aroundMarch2025))
      assert.ok(aroundMarch2025.isAfter(maybeAugust))
      const delta = aroundMarch2025.delta(maybeAugust).toSpec()
      assert.equal(delta.months, 6)
      assert.equal(delta.days, 16)
    })

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

  describe("Durations", () => {

    test("parsing", () => {
      const aroundTenMinutes = Duration.fromString("P10M~")
      assert.equal(aroundTenMinutes.value, 10 * level0Calendar.minute.duration)
      const tenMnSpec = aroundTenMinutes.toSpec()
      assert.equal(tenMnSpec.minutes, 10)
    })
  })

  describe("Intervals", () => {

    test("from uncertain to approximate", { todo: true }, () => {
      const maybeAugust = EdtfInterval.fromString("2023-12-?08/2024-12~")
      assertLevel2(maybeAugust.start.day).to.equal(8).and.beUncertain().atTheComponentLevel().but.bePrecise()
      assertLevel2(maybeAugust.end.month).to.equal(12).and.beApproximate().atTheGroupLevel().but.beApproximate().atTheGroupLevel()
    })

    test("approximate", () => {
      const aroundMarch2025 = EdtfDate.fromString("2025-03~")
      assertLevel2(aroundMarch2025.month).to.equal(3).and.beApproximate().atTheGroupLevel().but.not.beUncertain()
      assertLevel2(aroundMarch2025.year).to.equal(2025).and.beApproximate().atTheGroupLevel().but.not.beUncertain()
      assert.equal(aroundMarch2025.approximate, true)
    })
  })
})
