import { describe, test } from "node:test"
import assert from "node:assert"

import Level0Interval from "./Level0Interval.mjs"

describe("Level0Interval", () => {

  test("years", () => {
    const str = "1985/2001"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month, undefined)
    assert.equal(certain.start.day, undefined)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month, undefined)
    assert.equal(certain.end.day, undefined)
    assert.equal(certain.toString(), str)
  })

  test("year and month", () => {
    const str = "1985-04/2001-02"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day, undefined)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day, undefined)
    assert.equal(certain.toString(), str)
  })

  test("year, month and day", () => {
    const str = "1985-04-12/2001-02-28"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day.value, 12)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day.value, 28)
    assert.equal(certain.toString(), str)
  })

  test("year, month, day and local time", () => {
    const str = "1985-04-12T08:56/2001-02-28T18:20"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day.value, 12)
    assert.equal(certain.start.hour.value, 8)
    assert.equal(certain.start.minute.value, 56)
    assert.equal(certain.start.timeshift, undefined)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day.value, 28)
    assert.equal(certain.end.hour.value, 18)
    assert.equal(certain.end.minute.value, 20)
    assert.equal(certain.end.timeshift, undefined)
    assert.equal(certain.toString(), str)
  })

  test("year, month, day, and UTC time", () => {
    const str = "1985-04-12T08:56Z/2001-02-28T18:20Z"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day.value, 12)
    assert.equal(certain.start.hour.value, 8)
    assert.equal(certain.start.minute.value, 56)
    assert.equal(certain.start.timeshift.value, 0)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day.value, 28)
    assert.equal(certain.end.hour.value, 18)
    assert.equal(certain.end.minute.value, 20)
    assert.equal(certain.end.timeshift.value, 0)
    assert.equal(certain.toString(), str)
  })

  test("year, month, day, and -5 hour time shift", () => {
    const str = "1985-04-12T08:56-05/2001-02-28T18:20-05"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day.value, 12)
    assert.equal(certain.start.hour.value, 8)
    assert.equal(certain.start.minute.value, 56)
    assert.equal(certain.start.timeshift.value, -5 * 60)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day.value, 28)
    assert.equal(certain.end.hour.value, 18)
    assert.equal(certain.end.minute.value, 20)
    assert.equal(certain.end.timeshift.value, -5 * 60)
    assert.equal(certain.toString(), str)
  })

  test("year, month, day, and +5:30 time shift", () => {
    const str = "1985-04-12T08:56+05:30/2001-02-28T18:20+05:30"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day.value, 12)
    assert.equal(certain.start.hour.value, 8)
    assert.equal(certain.start.minute.value, 56)
    assert.equal(certain.start.timeshift.value, 5 * 60 + 30)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day.value, 28)
    assert.equal(certain.end.hour.value, 18)
    assert.equal(certain.end.minute.value, 20)
    assert.equal(certain.end.timeshift.value, 5 * 60 + 30)
    assert.equal(certain.toString(), str)
  })

  test("year, month, day and time with seconds", () => {
    const str = "1985-04-12T08:56:44/2001-02-28T22:40:50"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day.value, 12)
    assert.equal(certain.start.hour.value, 8)
    assert.equal(certain.start.minute.value, 56)
    assert.equal(certain.start.second.value, 44)
    assert.equal(certain.start.timeshift, undefined)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day.value, 28)
    assert.equal(certain.end.hour.value, 22)
    assert.equal(certain.end.minute.value, 40)
    assert.equal(certain.end.second.value, 50)
    assert.equal(certain.end.timeshift, undefined)
    assert.equal(certain.toString(), str)
  })

  test("year, month, day and UTC time with seconds", () => {
    const str = "1985-04-12T08:56:44Z/2001-02-28T22:40:50Z"
    const certain = Level0Interval.fromString(str)
    assert.equal(certain.start.year.value, 1985)
    assert.equal(certain.start.month.value, 4)
    assert.equal(certain.start.day.value, 12)
    assert.equal(certain.start.hour.value, 8)
    assert.equal(certain.start.minute.value, 56)
    assert.equal(certain.start.second.value, 44)
    assert.equal(certain.start.timeshift.value, 0)
    assert.equal(certain.end.year.value, 2001)
    assert.equal(certain.end.month.value, 2)
    assert.equal(certain.end.day.value, 28)
    assert.equal(certain.end.hour.value, 22)
    assert.equal(certain.end.minute.value, 40)
    assert.equal(certain.end.second.value, 50)
    assert.equal(certain.end.timeshift.value, 0)
    assert.equal(certain.toString(), str)
  })
})
