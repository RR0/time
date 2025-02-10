import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2Date } from "./Level2Date.mjs"
import { assertLevel2, level2Assert } from "../component/Level2TestUtil.mjs"
import { level0Calendar } from "../../level0/index.mjs"

describe("Level2", () => {

  test("default", () => {
    const current = Level2Date.newInstance()
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

  describe("certain and precise", () => {

    test("year", () => {
      const certainYear = Level2Date.fromString("1985")
      level2Assert(certainYear.year, 1985)
      assert.equal(certainYear.month, undefined)
      assert.equal(certainYear.day, undefined)
      assert.equal(certainYear.uncertain, false)
      assert.equal(certainYear.approximate, false)
    })

    test("negative year", () => {
      const certainYear = Level2Date.fromString("-1000")
      assertLevel2(certainYear.year).equal(-1000).and.bePrecise().atTheGroupLevel().and.beCertain().atTheGroupLevel()
      assert.equal(certainYear.month, undefined)
      assert.equal(certainYear.day, undefined)
      assert.equal(certainYear.uncertain, false)
      assert.equal(certainYear.approximate, false)
      const certainYear2 = new Level2Date({ year: -1000 })
      assertLevel2(certainYear2.year).equal(-1000).and.bePrecise().atTheGroupLevel().and.beCertain().atTheGroupLevel()
      assert.equal(certainYear2.month, undefined)
      assert.equal(certainYear2.day, undefined)
      assert.equal(certainYear2.uncertain, false)
      assert.equal(certainYear2.approximate, false)
    })

    test("year and month", () => {
      const certainYearAndMonth = Level2Date.fromString("1985-04")
      level2Assert(certainYearAndMonth.year, 1985)
      level2Assert(certainYearAndMonth.month, 4)
      assert.equal(certainYearAndMonth.day, undefined)
      assert.equal(certainYearAndMonth.uncertain, false)
      assert.equal(certainYearAndMonth.approximate, false)
    })

    test("year, month and day", () => {
      const certainDay = Level2Date.fromString("1985-04-12")
      level2Assert(certainDay.year, 1985)
      level2Assert(certainDay.month, 4)
      level2Assert(certainDay.day, 12)
      assert.equal(certainDay.uncertain, false)
      assert.equal(certainDay.approximate, false)
    })

    describe("year, month, day and time", () => {

      test("with 'T' time separator", () => {
        const certainTime = Level2Date.fromString("1985-04-12T08:56")
        level2Assert(certainTime.year, 1985)
        level2Assert(certainTime.month, 4)
        level2Assert(certainTime.day, 12)
        level2Assert(certainTime.hour, 8)
        level2Assert(certainTime.minute, 56)
        assert.equal(certainTime.uncertain, false)
        assert.equal(certainTime.approximate, false)
      })

      test("with space time separator", () => {
        const certainTime = Level2Date.fromString("1985-04-12 08:56")
        level2Assert(certainTime.year, 1985)
        level2Assert(certainTime.month, 4)
        level2Assert(certainTime.day, 12)
        level2Assert(certainTime.hour, 8)
        level2Assert(certainTime.minute, 56)
        assert.equal(certainTime.uncertain, false)
        assert.equal(certainTime.approximate, false)
      })
    })

    test("year, month, day and UTC time", () => {
      const certainTime = Level2Date.fromString("1985-04-12T08:56Z")
      level2Assert(certainTime.year, 1985)
      level2Assert(certainTime.month, 4)
      level2Assert(certainTime.day, 12)
      level2Assert(certainTime.hour, 8)
      level2Assert(certainTime.minute, 56)
      assert.equal(certainTime.timeshift.value, 0)
      assert.equal(certainTime.uncertain, false)
      assert.equal(certainTime.approximate, false)
    })

    test("year, month, day and time with seconds", () => {
      const certainWithSeconds = Level2Date.fromString("1985-04-12T08:56:44")
      level2Assert(certainWithSeconds.year, 1985)
      level2Assert(certainWithSeconds.month, 4)
      level2Assert(certainWithSeconds.day, 12)
      level2Assert(certainWithSeconds.hour, 8)
      level2Assert(certainWithSeconds.minute, 56)
      level2Assert(certainWithSeconds.second, 44)
      assert.equal(certainWithSeconds.uncertain, false)
      assert.equal(certainWithSeconds.approximate, false)
    })

    test("year, month, day and time with seconds with timeshift", () => {
      const certainWithSeconds = Level2Date.fromString("1985-04-12T08:56:44-05:45")
      level2Assert(certainWithSeconds.year, 1985)
      level2Assert(certainWithSeconds.month, 4)
      level2Assert(certainWithSeconds.day, 12)
      level2Assert(certainWithSeconds.hour, 8)
      level2Assert(certainWithSeconds.minute, 56)
      level2Assert(certainWithSeconds.second, 44)
      assert.equal(certainWithSeconds.timeshift.value, -5 * 60 + 45)
      assert.equal(certainWithSeconds.uncertain, false)
      assert.equal(certainWithSeconds.approximate, false)
    })
  })

  describe("uncertain but precise", () => {

    test("uncertain year date", () => {
      const uncertainYear = Level2Date.fromString("1985?")
      level2Assert(uncertainYear.year, 1985, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, false)
    })

    test("uncertain year component", () => {
      const uncertainYear = Level2Date.fromString("?1985")
      level2Assert(uncertainYear.year, 1985, true, false, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, false)
    })

    test("year and certain month", () => {
      const uncertainDate = Level2Date.fromString("1985?-04")
      level2Assert(uncertainDate.year, 1985, true)
      level2Assert(uncertainDate.month, 4, false)
      assert.equal(uncertainDate.day, undefined)
      assert.equal(uncertainDate.uncertain, true)
      assert.equal(uncertainDate.approximate, false)
    })

    test("year component and certain month", () => {
      const uncertainYear = Level2Date.fromString("?1985-04")
      level2Assert(uncertainYear.year, 1985, true, false, true)
      level2Assert(uncertainYear.month, 4, false)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, false)
    })

    test("certain year and uncertain month", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-04?")
      level2Assert(uncertainYearAndMonth.year, 1985, true)
      level2Assert(uncertainYearAndMonth.month, 4, true)
      assert.equal(uncertainYearAndMonth.day, undefined)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, false)
    })

    test("certain year and uncertain month component", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-?04")
      level2Assert(uncertainYearAndMonth.year, 1985, true)
      level2Assert(uncertainYearAndMonth.month, 4, true, false, true)
      assert.equal(uncertainYearAndMonth.day, undefined)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, false)
    })

    test("year, month and uncertain day", () => {
      const uncertainDate = Level2Date.fromString("1985-04-12?")
      level2Assert(uncertainDate.year, 1985, true)
      level2Assert(uncertainDate.month, 4, true)
      level2Assert(uncertainDate.day, 12, true)
      assert.equal(uncertainDate.uncertain, true)
      assert.equal(uncertainDate.approximate, false)
    })

    test("year, month and uncertain day component", () => {
      const uncertainDate = Level2Date.fromString("1985-04-?12")
      level2Assert(uncertainDate.year, 1985, true)
      level2Assert(uncertainDate.month, 4, true)
      level2Assert(uncertainDate.day, 12, true, false, true)
      assert.equal(uncertainDate.uncertain, true)
      assert.equal(uncertainDate.approximate, false)
    })

    test("year, uncertain month and certain day", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-04?-12")
      level2Assert(uncertainYearAndMonth.year, 1985, true)
      level2Assert(uncertainYearAndMonth.month, 4, true)
      level2Assert(uncertainYearAndMonth.day, 12, false)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, false)
    })

    test("year, uncertain month component and certain day", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-?04-12")
      level2Assert(uncertainYearAndMonth.year, 1985, true)
      level2Assert(uncertainYearAndMonth.month, 4, true, false, true)
      level2Assert(uncertainYearAndMonth.day, 12, false)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, false)
    })

    test("year, month, day and time", () => {
      const uncertainHour = Level2Date.fromString("1985-04-12T08?:56")
      level2Assert(uncertainHour.year, 1985, true)
      level2Assert(uncertainHour.month, 4, true)
      level2Assert(uncertainHour.day, 12, true)
      level2Assert(uncertainHour.hour, 8, true)
      level2Assert(uncertainHour.minute, 56)
      assert.equal(uncertainHour.timeshift, undefined)
      assert.equal(uncertainHour.uncertain, true)
      assert.equal(uncertainHour.approximate, false)
    })

    test("year, month, day and UTC time", () => {
      const uncertainHour = Level2Date.fromString("1985-04-12T08?:56Z")
      level2Assert(uncertainHour.year, 1985, true)
      level2Assert(uncertainHour.month, 4, true)
      level2Assert(uncertainHour.day, 12, true)
      level2Assert(uncertainHour.hour, 8, true)
      level2Assert(uncertainHour.minute, 56)
      assert.equal(uncertainHour.timeshift.value, 0)
      assert.equal(uncertainHour.uncertain, true)
      assert.equal(uncertainHour.approximate, false)
    })

    test("year, month, day and time", () => {
      const uncertainMinutes = Level2Date.fromString("1985-04-12T08:56?")
      level2Assert(uncertainMinutes.year, 1985, true)
      level2Assert(uncertainMinutes.month, 4, true)
      level2Assert(uncertainMinutes.day, 12, true)
      level2Assert(uncertainMinutes.hour, 8, true)
      level2Assert(uncertainMinutes.minute, 56, true)
      assert.equal(uncertainMinutes.uncertain, true)
      assert.equal(uncertainMinutes.approximate, false)
    })

    test("year, month, day and time with seconds", () => {
      const uncertainMinutes = Level2Date.fromString("1985-04-12T08:56:44?")
      level2Assert(uncertainMinutes.year, 1985, true)
      level2Assert(uncertainMinutes.month, 4, true)
      level2Assert(uncertainMinutes.day, 12, true)
      level2Assert(uncertainMinutes.hour, 8, true)
      level2Assert(uncertainMinutes.minute, 56, true)
      level2Assert(uncertainMinutes.second, 44, true)
      assert.equal(uncertainMinutes.uncertain, true)
      assert.equal(uncertainMinutes.approximate, false)
    })
  })

  describe("certain but approximate", () => {

    test("year", () => {
      const uncertainYear = Level2Date.fromString("1985~")
      level2Assert(uncertainYear.year, 1985, false, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, false)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year component", () => {
      const uncertainYear = Level2Date.fromString("~1985")
      level2Assert(uncertainYear.year, 1985, false, true, false, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, false)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year and certain month", () => {
      const uncertainYear = Level2Date.fromString("1985~-04")
      level2Assert(uncertainYear.year, 1985, false, true)
      level2Assert(uncertainYear.month, 4)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, false)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year and month", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-04~")
      level2Assert(uncertainYearAndMonth.year, 1985, false, true)
      level2Assert(uncertainYearAndMonth.month, 4, false, true)
      assert.equal(uncertainYearAndMonth.day, undefined)
      assert.equal(uncertainYearAndMonth.uncertain, false)
      assert.equal(uncertainYearAndMonth.approximate, true)
    })

    test("year, month and day", () => {
      const uncertainDate = Level2Date.fromString("1985-04-12~")
      level2Assert(uncertainDate.year, 1985, false, true)
      level2Assert(uncertainDate.month, 4, false, true)
      level2Assert(uncertainDate.day, 12, false, true)
      assert.equal(uncertainDate.uncertain, false)
      assert.equal(uncertainDate.approximate, true)
    })

    test("year, month and certain day", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-04~-12")
      level2Assert(uncertainYearAndMonth.year, 1985, false, true)
      level2Assert(uncertainYearAndMonth.month, 4, false, true)
      level2Assert(uncertainYearAndMonth.day, 12)
      assert.equal(uncertainYearAndMonth.uncertain, false)
      assert.equal(uncertainYearAndMonth.approximate, true)
    })

    test("year, month, day and time", () => {
      const uncertainHour = Level2Date.fromString("1985-04-12T08~:56")
      level2Assert(uncertainHour.year, 1985, false, true)
      level2Assert(uncertainHour.month, 4, false, true)
      level2Assert(uncertainHour.day, 12, false, true)
      level2Assert(uncertainHour.hour, 8, false, true)
      level2Assert(uncertainHour.minute, 56)
      assert.equal(uncertainHour.uncertain, false)
      assert.equal(uncertainHour.approximate, true)
    })

    test("year, month, day and time", () => {
      const uncertainMinutes = Level2Date.fromString("1985-04-12T08:56~")
      level2Assert(uncertainMinutes.year, 1985, false, true)
      level2Assert(uncertainMinutes.month, 4, false, true)
      level2Assert(uncertainMinutes.day, 12, false, true)
      level2Assert(uncertainMinutes.hour, 8, false, true)
      level2Assert(uncertainMinutes.minute, 56, false, true)
      assert.equal(uncertainMinutes.uncertain, false)
      assert.equal(uncertainMinutes.approximate, true)
    })
  })

  describe("uncertain *and* approximate", () => {

    test("year", () => {
      const uncertainYear = Level2Date.fromString("1985%")
      level2Assert(uncertainYear.year, 1985, true, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year component", () => {
      const uncertainYear = Level2Date.fromString("%1985")
      level2Assert(uncertainYear.year, 1985, true, true, true, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year and certain month", () => {
      const uncertainYear = Level2Date.fromString("1985%-04")
      level2Assert(uncertainYear.year, 1985, true, true)
      level2Assert(uncertainYear.month, 4)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year and month", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-04%")
      level2Assert(uncertainYearAndMonth.year, 1985, true, true)
      level2Assert(uncertainYearAndMonth.month, 4, true, true)
      assert.equal(uncertainYearAndMonth.day, undefined)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, true)
    })

    test("year, month and day", () => {
      const uncertainDate = Level2Date.fromString("1985-04-12%")
      level2Assert(uncertainDate.year, 1985, true, true)
      level2Assert(uncertainDate.month, 4, true, true)
      level2Assert(uncertainDate.day, 12, true, true)
      assert.equal(uncertainDate.uncertain, true)
      assert.equal(uncertainDate.approximate, true)
    })

    test("year, month and certain day", () => {
      const uncertainYearAndMonth = Level2Date.fromString("1985-04%-12")
      level2Assert(uncertainYearAndMonth.year, 1985, true, true)
      level2Assert(uncertainYearAndMonth.month, 4, true, true)
      level2Assert(uncertainYearAndMonth.day, 12)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, true)
    })

    test("year, month, day and time", () => {
      const uncertainHour = Level2Date.fromString("1985-04-12T08%:56")
      level2Assert(uncertainHour.year, 1985, true, true)
      level2Assert(uncertainHour.month, 4, true, true)
      level2Assert(uncertainHour.day, 12, true, true)
      level2Assert(uncertainHour.hour, 8, true, true)
      level2Assert(uncertainHour.minute, 56)
      assert.equal(uncertainHour.uncertain, true)
      assert.equal(uncertainHour.approximate, true)
    })

    test("year, month, day and time", () => {
      const uncertainMinutes = Level2Date.fromString("1985-04-12T08:56%")
      level2Assert(uncertainMinutes.year, 1985, true, true)
      level2Assert(uncertainMinutes.month, 4, true, true)
      level2Assert(uncertainMinutes.day, 12, true, true)
      level2Assert(uncertainMinutes.hour, 8, true, true)
      level2Assert(uncertainMinutes.minute, 56, true, true)
      assert.equal(uncertainMinutes.uncertain, true)
      assert.equal(uncertainMinutes.approximate, true)
    })
  })

  describe("unspecified", () => {

    test("year unit", () => {
      const uncertainYear = Level2Date.fromString("198X")
      level2Assert(uncertainYear.year.start, 1980)
      level2Assert(uncertainYear.year.end, 1989)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
    })

    test("year decade and unit", () => {
      const uncertainYear = Level2Date.fromString("19XX")
      level2Assert(uncertainYear.year.start, 1900)
      level2Assert(uncertainYear.year.end, 1999)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
    })

    test("year's month", () => {
      const uncertainYear = Level2Date.fromString("1985-XX")
      level2Assert(uncertainYear.year, 1985)
      level2Assert(uncertainYear.month.start, 1)
      level2Assert(uncertainYear.month.end, 12)
      assert.equal(uncertainYear.day, undefined)
    })

    test("year, month and day", () => {
      const uncertainDate = Level2Date.fromString("1985-04-XX")
      level2Assert(uncertainDate.year, 1985)
      level2Assert(uncertainDate.month, 4)
      level2Assert(uncertainDate.day.start, 1)
      level2Assert(uncertainDate.day.end, 31)
    })

    test("year, month and day", () => {
      const uncertainDate = Level2Date.fromString("1985-XX-XX")
      level2Assert(uncertainDate.year, 1985)
      level2Assert(uncertainDate.month.start, 1)
      level2Assert(uncertainDate.month.end, 12)
      level2Assert(uncertainDate.day.start, 1)
      level2Assert(uncertainDate.day.end, 31)
    })

    test("all", () => {
      const uncertainDate = Level2Date.fromString("XXXX-XX-XX")
      level2Assert(uncertainDate.year.start, 0)
      level2Assert(uncertainDate.year.end, 9999)
      level2Assert(uncertainDate.month.start, 1)
      level2Assert(uncertainDate.month.end, 12)
      level2Assert(uncertainDate.day.start, 1)
      level2Assert(uncertainDate.day.end, 31)
    })
  })

  test("comparison", () => {
    const beforeDate = Level2Date.fromString("2006-07-14T17:56")
    const afterDate = Level2Date.fromString("2007-06-15T18:47")
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
})
