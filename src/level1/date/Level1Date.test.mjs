import { describe, test } from "node:test"
import assert from "node:assert"

import { Level1Date } from "./Level1Date.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"

describe("Level1", () => {

  describe("certain and precise", () => {

    test("year", () => {
      const current = Level1Date.newInstance()
      assert.notStrictEqual(current.year.value, undefined)
      assert.notStrictEqual(current.month.value, undefined)
      assert.notStrictEqual(current.day.value, undefined)
      assert.notStrictEqual(current.hour.value, undefined)
      assert.notStrictEqual(current.minute.value, undefined)
      assert.notStrictEqual(current.second.value, undefined)
      assert.notStrictEqual(current.timeshift, undefined)
    })

    test("year", () => {
      const certainYear = Level1Date.fromString("1985")
      level1Assert(certainYear.year, 1985)
      assert.equal(certainYear.month, undefined)
      assert.equal(certainYear.day, undefined)
      assert.equal(certainYear.uncertain, false)
      assert.equal(certainYear.approximate, false)
    })

    test("year and month", () => {
      const certainYearAndMonth = Level1Date.fromString("1985-04")
      level1Assert(certainYearAndMonth.year, 1985)
      level1Assert(certainYearAndMonth.month, 4)
      assert.equal(certainYearAndMonth.day, undefined)
      assert.equal(certainYearAndMonth.uncertain, false)
      assert.equal(certainYearAndMonth.approximate, false)
    })

    test("year, month and day", () => {
      const certainDay = Level1Date.fromString("1985-04-12")
      level1Assert(certainDay.year, 1985)
      level1Assert(certainDay.month, 4)
      level1Assert(certainDay.day, 12)
      assert.equal(certainDay.uncertain, false)
      assert.equal(certainDay.approximate, false)
    })

    describe("year, month, day and time", () => {
      test("with 'T' time separator", () => {
        const certainTime = Level1Date.fromString("1985-04-12T08:56")
        level1Assert(certainTime.year, 1985)
        level1Assert(certainTime.month, 4)
        level1Assert(certainTime.day, 12)
        level1Assert(certainTime.hour, 8)
        level1Assert(certainTime.minute, 56)
        assert.equal(certainTime.uncertain, false)
        assert.equal(certainTime.approximate, false)
      })

      test("with space time separator", () => {
        const certainTime = Level1Date.fromString("1985-04-12 08:56")
        level1Assert(certainTime.year, 1985)
        level1Assert(certainTime.month, 4)
        level1Assert(certainTime.day, 12)
        level1Assert(certainTime.hour, 8)
        level1Assert(certainTime.minute, 56)
        assert.equal(certainTime.uncertain, false)
        assert.equal(certainTime.approximate, false)
      })
    })

    test("year, month, day and UTC time", () => {
      const certainTime = Level1Date.fromString("1985-04-12T08:56Z")
      level1Assert(certainTime.year, 1985)
      level1Assert(certainTime.month, 4)
      level1Assert(certainTime.day, 12)
      level1Assert(certainTime.hour, 8)
      level1Assert(certainTime.minute, 56)
      assert.equal(certainTime.timeshift.value, 0)
      assert.equal(certainTime.uncertain, false)
      assert.equal(certainTime.approximate, false)
    })

    test("year, month, day and time with seconds", () => {
      const certainWithSeconds = Level1Date.fromString("1985-04-12T08:56:44")
      level1Assert(certainWithSeconds.year, 1985)
      level1Assert(certainWithSeconds.month, 4)
      level1Assert(certainWithSeconds.day, 12)
      level1Assert(certainWithSeconds.hour, 8)
      level1Assert(certainWithSeconds.minute, 56)
      level1Assert(certainWithSeconds.second, 44)
      assert.equal(certainWithSeconds.uncertain, false)
      assert.equal(certainWithSeconds.approximate, false)
    })

    test("year, month, day and time with seconds with timeshift", () => {
      const certainWithSeconds = Level1Date.fromString("1985-04-12T08:56:44-05:45")
      level1Assert(certainWithSeconds.year, 1985)
      level1Assert(certainWithSeconds.month, 4)
      level1Assert(certainWithSeconds.day, 12)
      level1Assert(certainWithSeconds.hour, 8)
      level1Assert(certainWithSeconds.minute, 56)
      level1Assert(certainWithSeconds.second, 44)
      assert.equal(certainWithSeconds.timeshift.value, -5 * 60 + 45)
      assert.equal(certainWithSeconds.uncertain, false)
      assert.equal(certainWithSeconds.approximate, false)
    })
  })

  describe("uncertain but precise", () => {

    test("year", () => {
      const uncertainYear = Level1Date.fromString("1985?")
      level1Assert(uncertainYear.year, 1985, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, false)
    })

    test("year and certain month", () => {
      const uncertainYear = Level1Date.fromString("1985?-04")
      level1Assert(uncertainYear.year, 1985, true)
      level1Assert(uncertainYear.month, 4, false)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, true)
      assert.equal(uncertainYear.approximate, false)
    })

    test("year and month", () => {
      const uncertainYearAndMonth = Level1Date.fromString("1985-04?")
      level1Assert(uncertainYearAndMonth.year, 1985, true)
      level1Assert(uncertainYearAndMonth.month, 4, true)
      assert.equal(uncertainYearAndMonth.day, undefined)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, false)
    })

    test("year, month and day", () => {
      const uncertainDate = Level1Date.fromString("1985-04-12?")
      level1Assert(uncertainDate.year, 1985, true)
      level1Assert(uncertainDate.month, 4, true)
      level1Assert(uncertainDate.day, 12, true)
      assert.equal(uncertainDate.uncertain, true)
      assert.equal(uncertainDate.approximate, false)
    })

    test("year, month and certain day", () => {
      const uncertainYearAndMonth = Level1Date.fromString("1985-04?-12")
      level1Assert(uncertainYearAndMonth.year, 1985, true)
      level1Assert(uncertainYearAndMonth.month, 4, true)
      level1Assert(uncertainYearAndMonth.day, 12, false)
      assert.equal(uncertainYearAndMonth.uncertain, true)
      assert.equal(uncertainYearAndMonth.approximate, false)
    })

    test("year, month, day and time", () => {
      const uncertainHour = Level1Date.fromString("1985-04-12T08?:56")
      level1Assert(uncertainHour.year, 1985, true)
      level1Assert(uncertainHour.month, 4, true)
      level1Assert(uncertainHour.day, 12, true)
      level1Assert(uncertainHour.hour, 8, true)
      level1Assert(uncertainHour.minute, 56)
      assert.equal(uncertainHour.timeshift, undefined)
      assert.equal(uncertainHour.uncertain, true)
      assert.equal(uncertainHour.approximate, false)
    })

    test("year, month, day and UTC time", () => {
      const uncertainHour = Level1Date.fromString("1985-04-12T08?:56Z")
      level1Assert(uncertainHour.year, 1985, true)
      level1Assert(uncertainHour.month, 4, true)
      level1Assert(uncertainHour.day, 12, true)
      level1Assert(uncertainHour.hour, 8, true)
      level1Assert(uncertainHour.minute, 56)
      assert.equal(uncertainHour.timeshift.value, 0)
      assert.equal(uncertainHour.uncertain, true)
      assert.equal(uncertainHour.approximate, false)
    })

    test("year, month, day and time", () => {
      const uncertainMinutes = Level1Date.fromString("1985-04-12T08:56?")
      level1Assert(uncertainMinutes.year, 1985, true)
      level1Assert(uncertainMinutes.month, 4, true)
      level1Assert(uncertainMinutes.day, 12, true)
      level1Assert(uncertainMinutes.hour, 8, true)
      level1Assert(uncertainMinutes.minute, 56, true)
      assert.equal(uncertainMinutes.uncertain, true)
      assert.equal(uncertainMinutes.approximate, false)
    })

    test("year, month, day and time with seconds", () => {
      const uncertainMinutes = Level1Date.fromString("1985-04-12T08:56:44?")
      level1Assert(uncertainMinutes.year, 1985, true)
      level1Assert(uncertainMinutes.month, 4, true)
      level1Assert(uncertainMinutes.day, 12, true)
      level1Assert(uncertainMinutes.hour, 8, true)
      level1Assert(uncertainMinutes.minute, 56, true)
      level1Assert(uncertainMinutes.second, 44, true)
      assert.equal(uncertainMinutes.uncertain, true)
      assert.equal(uncertainMinutes.approximate, false)
    })
  })

  describe("certain but approximate", () => {

    test("year", () => {
      const uncertainYear = Level1Date.fromString("1985~")
      level1Assert(uncertainYear.year, 1985, false, true)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, false)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year and certain month", () => {
      const uncertainYear = Level1Date.fromString("1985~-04")
      level1Assert(uncertainYear.year, 1985, false, true)
      level1Assert(uncertainYear.month, 4)
      assert.equal(uncertainYear.day, undefined)
      assert.equal(uncertainYear.uncertain, false)
      assert.equal(uncertainYear.approximate, true)
    })

    test("year and month", () => {
      const uncertainYearAndMonth = Level1Date.fromString("1985-04~")
      level1Assert(uncertainYearAndMonth.year, 1985, false, true)
      level1Assert(uncertainYearAndMonth.month, 4, false, true)
      assert.equal(uncertainYearAndMonth.day, undefined)
      assert.equal(uncertainYearAndMonth.uncertain, false)
      assert.equal(uncertainYearAndMonth.approximate, true)
    })

    test("year, month and day", () => {
      const uncertainDate = Level1Date.fromString("1985-04-12~")
      level1Assert(uncertainDate.year, 1985, false, true)
      level1Assert(uncertainDate.month, 4, false, true)
      level1Assert(uncertainDate.day, 12, false, true)
      assert.equal(uncertainDate.uncertain, false)
      assert.equal(uncertainDate.approximate, true)
    })

    test("year, month and certain day", () => {
      const uncertainYearAndMonth = Level1Date.fromString("1985-04~-12")
      level1Assert(uncertainYearAndMonth.year, 1985, false, true)
      level1Assert(uncertainYearAndMonth.month, 4, false, true)
      level1Assert(uncertainYearAndMonth.day, 12)
      assert.equal(uncertainYearAndMonth.uncertain, false)
      assert.equal(uncertainYearAndMonth.approximate, true)
    })

    test("year, month, day and time", () => {
      const uncertainHour = Level1Date.fromString("1985-04-12T08~:56")
      level1Assert(uncertainHour.year, 1985, false, true)
      level1Assert(uncertainHour.month, 4, false, true)
      level1Assert(uncertainHour.day, 12, false, true)
      level1Assert(uncertainHour.hour, 8, false, true)
      level1Assert(uncertainHour.minute, 56)
      assert.equal(uncertainHour.uncertain, false)
      assert.equal(uncertainHour.approximate, true)
    })

    test("year, month, day and time", () => {
      const uncertainMinutes = Level1Date.fromString("1985-04-12T08:56~")
      level1Assert(uncertainMinutes.year, 1985, false, true)
      level1Assert(uncertainMinutes.month, 4, false, true)
      level1Assert(uncertainMinutes.day, 12, false, true)
      level1Assert(uncertainMinutes.hour, 8, false, true)
      level1Assert(uncertainMinutes.minute, 56, false, true)
      assert.equal(uncertainMinutes.uncertain, false)
      assert.equal(uncertainMinutes.approximate, true)
    })
  })

  describe("unspecified", () => {

    test("year unit", () => {
      const uncertainYear = Level1Date.fromString("198X")
      level1Assert(uncertainYear.year.start, 1980)
      level1Assert(uncertainYear.year.end, 1989)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
    })

    test("year decade and unit", () => {
      const uncertainYear = Level1Date.fromString("19XX")
      level1Assert(uncertainYear.year.start, 1900)
      level1Assert(uncertainYear.year.end, 1999)
      assert.equal(uncertainYear.month, undefined)
      assert.equal(uncertainYear.day, undefined)
    })

    test("year's month", () => {
      const uncertainYear = Level1Date.fromString("1985-XX")
      level1Assert(uncertainYear.year, 1985)
      level1Assert(uncertainYear.month.start, 1)
      level1Assert(uncertainYear.month.end, 12)
      assert.equal(uncertainYear.day, undefined)
    })

    test("year, month and day", () => {
      const uncertainDate = Level1Date.fromString("1985-04-XX")
      level1Assert(uncertainDate.year, 1985)
      level1Assert(uncertainDate.month, 4)
      level1Assert(uncertainDate.day.start, 1)
      level1Assert(uncertainDate.day.end, 31)
    })

    test("year, month and day", () => {
      const uncertainDate = Level1Date.fromString("1985-XX-XX")
      level1Assert(uncertainDate.year, 1985)
      level1Assert(uncertainDate.month.start, 1)
      level1Assert(uncertainDate.month.end, 12)
      level1Assert(uncertainDate.day.start, 1)
      level1Assert(uncertainDate.day.end, 31)
    })

    test("all", () => {
      const uncertainDate = Level1Date.fromString("XXXX-XX-XX")
      level1Assert(uncertainDate.year.start, 0)
      level1Assert(uncertainDate.year.end, 9999)
      level1Assert(uncertainDate.month.start, 1)
      level1Assert(uncertainDate.month.end, 12)
      level1Assert(uncertainDate.day.start, 1)
      level1Assert(uncertainDate.day.end, 31)
    })
  })
})
