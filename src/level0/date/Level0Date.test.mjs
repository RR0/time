import { describe, test } from "node:test"
import assert, { fail } from "node:assert"

import { Level0Date } from "./Level0Date.mjs"
import { Level0Year } from "../year/index.mjs"
import { level0Calendar } from "../../calendar/index.mjs"

describe("Level0Date", () => {

  test("default", () => {
    const current = Level0Date.newInstance()
    assert.notStrictEqual(current.year.value, undefined)
    assert.notStrictEqual(current.month.value, undefined)
    assert.notStrictEqual(current.day.value, undefined)
    assert.notStrictEqual(current.hour.value, undefined)
    assert.notStrictEqual(current.minute.value, undefined)
    assert.notStrictEqual(current.second.value, undefined)
    assert.notStrictEqual(current.timeshift, undefined)
    current.year = undefined
    assert.strictEqual(current.year, undefined)
    current.month = undefined
    assert.strictEqual(current.month, undefined)
    current.day = undefined
    assert.strictEqual(current.day, undefined)
    current.hour = undefined
    assert.strictEqual(current.hour, undefined)
    current.minute = undefined
    assert.strictEqual(current.minute, undefined)
    current.second = undefined
    assert.strictEqual(current.second, undefined)
  })

  describe("parsing", () => {

    test("year", () => {
      const str = "1985"
      const certain = Level0Date.fromString(str)
      assert.strictEqual(certain.year.value, 1985)
      assert.strictEqual(certain.month, undefined)
      assert.strictEqual(certain.day, undefined)
      assert.strictEqual(certain.toString(), str)
    })

    test("comparison", () => {
      const beforeDate = Level0Date.fromString("1985-04-21")
      const afterDate = Level0Date.fromString("2001-02-18")
      assert.equal(beforeDate.isEqual(afterDate), false)
      assert.equal(afterDate.isEqual(beforeDate), false)
      assert.equal(beforeDate.isBefore(afterDate), true)
      assert.equal(afterDate.isAfter(beforeDate), true)
      const deltaMs = 15 * level0Calendar.year.duration + 9 * level0Calendar.month.duration + 28 * level0Calendar.day.duration
      assert.equal(afterDate.compare(beforeDate), deltaMs)
      const dur = afterDate.delta(beforeDate)
      assert.equal(dur.value, deltaMs)
      const durSpec = dur.toSpec()
      assert.equal(durSpec.years.value, 15)
      assert.equal(durSpec.months.value, 9)
      assert.equal(durSpec.days.value, 28)
    })

    test("year and month", () => {
      const str = "1985-04"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day, undefined)
      assert.equal(certain.toString(), str)
    })

    test("year, month and day", () => {
      const str = "1985-04-12"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.toString(), str)
    })

    describe("year, month, day and local time", () => {

      test("with 'T' time separator", () => {
        const str = "1985-04-12T08:56"
        const certain = Level0Date.fromString(str)
        assert.equal(certain.year.value, 1985)
        assert.equal(certain.month.value, 4)
        assert.equal(certain.day.value, 12)
        assert.equal(certain.hour.value, 8)
        assert.equal(certain.minute.value, 56)
        assert.equal(certain.timeshift, undefined)
        assert.equal(certain.toString(), str)
      })

      test("with space time separator", () => {
        const str = "1985-04-12 08:56"
        const certain = Level0Date.fromString(str)
        assert.equal(certain.year.value, 1985)
        assert.equal(certain.month.value, 4)
        assert.equal(certain.day.value, 12)
        assert.equal(certain.hour.value, 8)
        assert.equal(certain.minute.value, 56)
        assert.equal(certain.timeshift, undefined)
        assert.equal(certain.toString(), str.replace(" ", "T"))
      })

      test("with no time separator", () => {
        const str = "1985-04-12 0856"
        const certain = Level0Date.fromString(str)
        assert.equal(certain.year.value, 1985)
        assert.equal(certain.month.value, 4)
        assert.equal(certain.day.value, 12)
        assert.equal(certain.hour.value, 8)
        assert.equal(certain.minute.value, 56)
        assert.equal(certain.timeshift, undefined)
        assert.equal(certain.toString(), "1985-04-12T08:56")
      })
    })

    test("year, month, day, and UTC time", () => {
      const str = "1985-04-12T08:56Z"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.timeshift.value, 0)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day, and -5 hour time shift", () => {
      const str = "1985-04-12T08:56-05"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.timeshift.value, -5 * 60)
      assert.equal(certain.toString(), str)
      const cdt = Level0Date.fromString("1985-04-12T08:56CDT")
      assert.equal(cdt.toString(), str)
      const cdtSpace = Level0Date.fromString("1985-04-12T08:56 CDT")
      assert.equal(cdtSpace.toString(), str)
    })

    test("year, month, day, and +5:30 time shift", () => {
      const str = "1985-04-12T08:56+05:30"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.timeshift.value, 5 * 60 + 30)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day and time with seconds", () => {
      const str = "1985-04-12T08:56:44"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.second.value, 44)
      assert.equal(certain.timeshift, undefined)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day and UTC time with seconds", () => {
      const str = "1985-04-12T08:56:44Z"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.second.value, 44)
      assert.equal(certain.timeshift.value, 0)
      assert.equal(certain.toString(), str)
    })
  })

  describe("programmatic", () => {

    test("year", () => {
      const value = 1985
      const objDate = new Level0Date({ year: new Level0Year(1985) })
      assert.strictEqual(objDate.year.value, value)
      assert.strictEqual(objDate.month, undefined)
      assert.strictEqual(objDate.day, undefined)
      assert.strictEqual(objDate.toString(), value.toString())
      const numberDate = new Level0Date({ year: 1985 })
      assert.strictEqual(numberDate.year.value, value)
      assert.strictEqual(numberDate.month, undefined)
      assert.strictEqual(numberDate.day, undefined)
      assert.strictEqual(numberDate.toString(), value.toString())
    })

    test("comparison", () => {
      const beforeDate = new Level0Date({ year: 1985, month: 4, day: 21 })
      const afterDate = new Level0Date({ year: 2001, month: 2, day: 18 })
      assert.equal(beforeDate.isEqual(afterDate), false)
      assert.equal(afterDate.isEqual(beforeDate), false)
      assert.equal(beforeDate.isBefore(afterDate), true)
      assert.equal(afterDate.isAfter(beforeDate), true)
    })

    test("year and month", () => {
      const str = "1985-04"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day, undefined)
      assert.equal(certain.toString(), str)
    })

    test("year, month and day", () => {
      const str = "1985-04-12"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day and local time", () => {
      const str = "1985-04-12T08:56"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.timeshift, undefined)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day, and UTC time", () => {
      const str = "1985-04-12T08:56Z"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.timeshift.value, 0)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day, and -5 hour time shift", () => {
      const str = "1985-04-12T08:56-05"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.timeshift.value, -5 * 60)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day, and +5:30 time shift", () => {
      const str = "1985-04-12T08:56+05:30"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.timeshift.value, 5 * 60 + 30)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day and time with seconds", () => {
      const str = "1985-04-12T08:56:44"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.second.value, 44)
      assert.equal(certain.timeshift, undefined)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day and UTC time with seconds", () => {
      const str = "1985-04-12T08:56:44Z"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.second.value, 44)
      assert.equal(certain.timeshift.value, 0)
      assert.equal(certain.toString(), str)
    })

    test("year, month, day and LST time with seconds", { skip: true }, () => {
      const str = "1967-05-13 15:40LST"
      const certain = Level0Date.fromString(str)
      assert.equal(certain.year.value, 1985)
      assert.equal(certain.month.value, 4)
      assert.equal(certain.day.value, 12)
      assert.equal(certain.hour.value, 8)
      assert.equal(certain.minute.value, 56)
      assert.equal(certain.second.value, 44)
      assert.equal(certain.timeshift.value, 0)
      assert.equal(certain.toString(), str)
    })
  })

  describe("prev", () => {

    test("valid", () => {
      const dateWithYear = Level0Date.fromString("1985")
      const nextDateWithYear = dateWithYear.previous()
      assert.equal(nextDateWithYear.toString(), "1984")

      const dateWithMonth = Level0Date.fromString("1985-07")
      const nextDateWithMonth = dateWithMonth.previous()
      assert.equal(nextDateWithMonth.toString(), "1985-06")

      const dateWithDay = Level0Date.fromString("1985-07-25")
      const nextDateWithDay = dateWithDay.previous()
      assert.equal(nextDateWithDay.toString(), "1985-07-24")

      const dateWithHour = Level0Date.fromString("1985-07-25 16:00")
      const nextDateWithHour = dateWithHour.previous()
      assert.equal(nextDateWithHour.toString(), "1985-07-25T15:00")

      const dateWithMinute = Level0Date.fromString("1985-07-25 16:30")
      const nextDateWithMinute = dateWithMinute.previous()
      assert.equal(nextDateWithMinute.toString(), "1985-07-25T16:29")

      const dateWithSecond = Level0Date.fromString("1985-07-25 16:30:40")
      const nextDateWithSecond = dateWithSecond.previous()
      assert.equal(nextDateWithSecond.toString(), "1985-07-25T16:30:39")
    })

    test("overflow", () => {
      const date = Level0Date.fromString(level0Calendar.year.min.toString().padStart(4, "0"))
      try {
        date.previous()
        fail("Should not allow next year before min")
      } catch (e) {
        assert.equal(e.message, "year value must be >= 0 and <= 9999, but was -1")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const date = Level0Date.fromString("1985")
      const next = date.next()
      assert.equal(next.toString(), "1986")

      const dateWithMonth = Level0Date.fromString("1985-07")
      const nextDateWithMonth = dateWithMonth.next()
      assert.equal(nextDateWithMonth.toString(), "1985-08")

      const dateWithDay = Level0Date.fromString("1985-07-25")
      const nextDateWithDay = dateWithDay.next()
      assert.equal(nextDateWithDay.toString(), "1985-07-26")

      const dateWithHour = Level0Date.fromString("1985-07-25T16:00")
      dateWithHour.minute = undefined
      const nextDateWithHour = dateWithHour.next()
      assert.equal(nextDateWithHour.toString(), "1985-07-25T17")

      const dateWithMinute = Level0Date.fromString("1985-07-25 16:30")
      const nextDateWithMinute = dateWithMinute.next()
      assert.equal(nextDateWithMinute.toString(), "1985-07-25T16:31")

      const dateWithSecond = Level0Date.fromString("1985-07-25 16:30:40")
      const nextDateWithSecond = dateWithSecond.next()
      assert.equal(nextDateWithSecond.toString(), "1985-07-25T16:30:41")
    })

    test("overflow", () => {
      const certainYear = Level0Date.fromString(String(level0Calendar.year.max))
      try {
        certainYear.next()
        fail("Should not allow next year after max")
      } catch (e) {
        assert.equal(e.message, "year value must be >= 0 and <= 9999, but was 10000")
      }
    })
  })

})
