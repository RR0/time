import { describe, test } from "node:test"
import assert, { fail } from "node:assert"

import { Level2Date as EdtfDate } from "./src/level2/date/index.mjs"
import { Level2Interval, Level2Interval as EdtfInterval } from "./src/level2/interval/index.mjs"

import { Level2Duration as Duration } from "./src/level2/duration/index.mjs"
import { level0Calendar } from "./src/calendar/index.mjs"
import { assertLevel2 } from "./src/level2/component/Level2TestUtil.mjs"
import { level2Calendar } from "./src/level2/Level2Calendar.mjs"

describe("Demo samples", () => {

  describe("Dates", () => {

    describe("instanciation", () => {

      test("now", () => {
        const now = new EdtfDate()
        assert.ok(now.year.value >= 2025)
      })

      test("from date", () => {
        const now = EdtfDate.fromDate(new Date(2025, 1, 28))
        assert.ok(now instanceof EdtfDate)
        assert.equal(now.year.value, 2025)
        assert.equal(now.month.value, 2)
        assert.equal(now.day.value, 28)
        assert.equal(now.hour?.value, 0)
        assert.equal(now.minute?.value, 0)
        assert.equal(now.second?.value, 0)
      })

      test("instanciation", () => {
        const date = new EdtfDate({year: 1972, month: 8, day: 12, hour: 16, minute: 45, second: 55})
        assert.equal(date.year.value, 1972)
        assert.equal(date.month.value, 8)
        assert.equal(date.day.value, 12)
        assert.equal(date.hour.value, 16)
        assert.equal(date.minute.value, 45)
        assert.equal(date.second.value, 55)
      })
    })

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

    test("between", () => {
      const start = EdtfDate.fromString("2024-01-01")
      const now = new EdtfDate()
      const duration = Duration.between(start, now)
      assert.ok(duration.toSpec().years.value >= 1)
    })
  })

  describe("Intervals", () => {

    test("instanciation", () => {
      const start = new EdtfDate({year: 1972, month: 8, day: 12, hour: 16, minute: 45, second: 55})
      const end = new EdtfDate({year: 1972, month: 8, day: 12, hour: 16, minute: 45, second: 55})
      const interval = new Level2Interval(start, end)
      assert.equal(interval.start.year.value, 1972)
      assert.equal(interval.start.month.value, 8)
      assert.equal(interval.start.day.value, 12)
      assert.equal(interval.start.hour.value, 16)
      assert.equal(interval.start.minute.value, 45)
      assert.equal(interval.start.second.value, 55)
    })


    test("from uncertain to approximate", {todo: true}, () => {
      const maybeAugust = EdtfInterval.fromString("2023-12-?08/2024-12~")
      assertLevel2(maybeAugust.start.day).to.equal(8).and.beUncertain().atTheComponentLevel().but.bePrecise()
      assertLevel2(maybeAugust.end.month).to.equal(
        12).and.beApproximate().atTheGroupLevel().but.beApproximate().atTheGroupLevel()
    })

    test("approximate", () => {
      const aroundMarch2025 = EdtfDate.fromString("2025-03~")
      assertLevel2(aroundMarch2025.month).to.equal(3).and.beApproximate().atTheGroupLevel().but.not.beUncertain()
      assertLevel2(aroundMarch2025.year).to.equal(2025).and.beApproximate().atTheGroupLevel().but.not.beUncertain()
      assert.equal(aroundMarch2025.approximate, true)
    })
  })

  describe("prev", () => {

    test("valid", () => {
      const dateWithYear = EdtfDate.fromString("1985")
      const nextDateWithYear = dateWithYear.previous()
      assert.equal(nextDateWithYear.toString(), "1984")

      const dateWithMonth = EdtfDate.fromString("1985-07")
      const nextDateWithMonth = dateWithMonth.previous()
      assert.equal(nextDateWithMonth.toString(), "1985-06")

      const dateWithDay = EdtfDate.fromString("1985-07-25")
      const nextDateWithDay = dateWithDay.previous()
      assert.equal(nextDateWithDay.toString(), "1985-07-24")

      const dateWithHour = EdtfDate.fromString("1985-07-25 16:00")
      const nextDateWithHour = dateWithHour.previous()
      assert.equal(nextDateWithHour.toString(), "1985-07-25T15:00")

      const dateWithMinute = EdtfDate.fromString("1985-07-25 16:30")
      const nextDateWithMinute = dateWithMinute.previous()
      assert.equal(nextDateWithMinute.toString(), "1985-07-25T16:29")

      const dateWithSecond = EdtfDate.fromString("1985-07-25 16:30:40")
      const nextDateWithSecond = dateWithSecond.previous()
      assert.equal(nextDateWithSecond.toString(), "1985-07-25T16:30:39")
    })

    test("overflow", () => {
      const date = EdtfDate.fromString(level2Calendar.year.min.toString())
      try {
        date.previous()
        fail("Should not allow next year before min")
      } catch (e) {
        assert.equal(e.message,
          "year value must be >= -9007199254740991 and <= 9007199254740991, but was -9007199254740992")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const date = EdtfDate.fromString("1985")
      const next = date.next()
      assert.equal(next.toString(), "1986")

      const dateWithMonth = EdtfDate.fromString("1985-07")
      const nextDateWithMonth = dateWithMonth.next()
      assert.equal(nextDateWithMonth.toString(), "1985-08")

      const dateWithDay = EdtfDate.fromString("1985-07-25")
      const nextDateWithDay = dateWithDay.next()
      assert.equal(nextDateWithDay.toString(), "1985-07-26")

      const dateWithHour = EdtfDate.fromString("1985-07-25T16:00")
      dateWithHour.minute = undefined
      const nextDateWithHour = dateWithHour.next()
      assert.equal(nextDateWithHour.toString(), "1985-07-25T17")

      const dateWithMinute = EdtfDate.fromString("1985-07-25 16:30")
      const nextDateWithMinute = dateWithMinute.next()
      assert.equal(nextDateWithMinute.toString(), "1985-07-25T16:31")

      const dateWithSecond = EdtfDate.fromString("1985-07-25 16:30:40")
      const nextDateWithSecond = dateWithSecond.next()
      assert.equal(nextDateWithSecond.toString(), "1985-07-25T16:30:41")
    })

    test("overflow", () => {
      const certainYear = EdtfDate.fromString(String(level2Calendar.year.max))
      try {
        certainYear.next()
        fail("Should not allow next year after max")
      } catch (e) {
        assert.equal(e.message,
          "year value must be >= -9007199254740991 and <= 9007199254740991, but was 9007199254740992")
      }
    })
  })
})
