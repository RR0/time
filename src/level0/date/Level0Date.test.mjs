import { describe, test } from "node:test"
import assert from "node:assert"

import { Level0Date } from "./Level0Date.mjs"
import Level0Year from "../year/Level0Year.mjs"

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
  })
})
