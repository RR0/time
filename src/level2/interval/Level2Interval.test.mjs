import { describe, test } from "node:test"
import assert from "node:assert"

import { level2Assert } from "../component/Level2TestUtil.mjs"

import { Level2Interval } from "./Level2Interval.mjs"
import { level0Calendar } from "../../calendar/index.mjs"

describe("Level2Interval", () => {

  describe("dates", () => {

    describe("certain and precise", () => {

      test("years", () => {
        const certain = Level2Interval.fromString("1985/2001")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, undefined)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, undefined)
        level2Assert(certain.end.day, undefined)
      })

      test("year and month", () => {
        const certain = Level2Interval.fromString("1985-04/2001-02")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, undefined)
      })

      test("year, month and day", () => {
        const certain = Level2Interval.fromString("1985-04-12/2001-02-28")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, 12)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, 28)
      })

      test("year, month, day and local time", () => {
        const certain = Level2Interval.fromString("1985-04-12T08:56/2001-02-28T18:20")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, 12)
        level2Assert(certain.start.hour, 8)
        level2Assert(certain.start.minute, 56)
        level2Assert(certain.start.timeshift, undefined)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, 28)
        level2Assert(certain.end.hour, 18)
        level2Assert(certain.end.minute, 20)
        level2Assert(certain.end.timeshift, undefined)
      })

      test("year, month, day, and UTC time", () => {
        const certain = Level2Interval.fromString("1985-04-12T08:56Z/2001-02-28T18:20Z")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, 12)
        level2Assert(certain.start.hour, 8)
        level2Assert(certain.start.minute, 56)
        level2Assert(certain.start.timeshift, 0)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, 28)
        level2Assert(certain.end.hour, 18)
        level2Assert(certain.end.minute, 20)
        level2Assert(certain.end.timeshift, 0)
      })

      test("year, month, day, and -5 hour time shift", () => {
        const certain = Level2Interval.fromString("1985-04-12T08:56-05/2001-02-28T18:20-05")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, 12)
        level2Assert(certain.start.hour, 8)
        level2Assert(certain.start.minute, 56)
        level2Assert(certain.start.timeshift, -5 * 60)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, 28)
        level2Assert(certain.end.hour, 18)
        level2Assert(certain.end.minute, 20)
        level2Assert(certain.end.timeshift, -5 * 60)
      })

      test("year, month, day, and +5:30 time shift", () => {
        const certain = Level2Interval.fromString("1985-04-12T08:56+05:30/2001-02-28T18:20+05:30")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, 12)
        level2Assert(certain.start.hour, 8)
        level2Assert(certain.start.minute, 56)
        level2Assert(certain.start.timeshift, 5 * 60 + 30)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, 28)
        level2Assert(certain.end.hour, 18)
        level2Assert(certain.end.minute, 20)
        level2Assert(certain.end.timeshift, 5 * 60 + 30)
      })

      test("year, month, day and time with seconds", () => {
        const certain = Level2Interval.fromString("1985-04-12T08:56:44/2001-02-28T22:40:50")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, 12)
        level2Assert(certain.start.hour, 8)
        level2Assert(certain.start.minute, 56)
        level2Assert(certain.start.second, 44)
        level2Assert(certain.start.timeshift, undefined)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, 28)
        level2Assert(certain.end.hour, 22)
        level2Assert(certain.end.minute, 40)
        level2Assert(certain.end.second, 50)
        level2Assert(certain.end.timeshift, undefined)
      })

      test("year, month, day and UTC time with seconds", () => {
        const certain = Level2Interval.fromString("1985-04-12T08:56:44Z/2001-02-28T22:40:50Z")
        level2Assert(certain.start.year, 1985)
        level2Assert(certain.start.month, 4)
        level2Assert(certain.start.day, 12)
        level2Assert(certain.start.hour, 8)
        level2Assert(certain.start.minute, 56)
        level2Assert(certain.start.second, 44)
        level2Assert(certain.start.timeshift, 0)
        level2Assert(certain.end.year, 2001)
        level2Assert(certain.end.month, 2)
        level2Assert(certain.end.day, 28)
        level2Assert(certain.end.hour, 22)
        level2Assert(certain.end.minute, 40)
        level2Assert(certain.end.second, 50)
        level2Assert(certain.end.timeshift, 0)
      })
    })

    describe("uncertain but precise", () => {

      test("years", () => {
        const certain = Level2Interval.fromString("1985?/2001?")
        level2Assert(certain.start.year, 1985, true)
        level2Assert(certain.start.month, undefined)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001, true)
        level2Assert(certain.end.month, undefined)
        level2Assert(certain.end.day, undefined)
      })

      test("year and month", () => {
        const certain = Level2Interval.fromString("1985-04?/2001-02?")
        level2Assert(certain.start.year, 1985, true)
        level2Assert(certain.start.month, 4, true)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001, true)
        level2Assert(certain.end.month, 2, true)
        level2Assert(certain.end.day, undefined)
      })

      test("year, month and day", () => {
        const certain = Level2Interval.fromString("1985-04-12?/2001-02-28?")
        level2Assert(certain.start.year, 1985, true)
        level2Assert(certain.start.month, 4, true)
        level2Assert(certain.start.day, 12, true)
        level2Assert(certain.end.year, 2001, true)
        level2Assert(certain.end.month, 2, true)
        level2Assert(certain.end.day, 28, true)
      })

      test("year, month, day and local time", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56?/2001-02-28T18:20?")
        level2Assert(uncertain.start.year, 1985, true)
        level2Assert(uncertain.start.month, 4, true)
        level2Assert(uncertain.start.day, 12, true)
        level2Assert(uncertain.start.hour, 8, true)
        level2Assert(uncertain.start.minute, 56, true)
        assert.equal(uncertain.start.timeshift, undefined)
        level2Assert(uncertain.end.year, 2001, true)
        level2Assert(uncertain.end.month, 2, true)
        level2Assert(uncertain.end.day, 28, true)
        level2Assert(uncertain.end.hour, 18, true)
        level2Assert(uncertain.end.minute, 20, true)
        assert.equal(uncertain.end.timeshift, undefined)
      })

      test("year, month, day, and UTC time", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56?Z/2001-02-28T18:20?Z")
        level2Assert(uncertain.start.year, 1985, true)
        level2Assert(uncertain.start.month, 4, true)
        level2Assert(uncertain.start.day, 12, true)
        level2Assert(uncertain.start.hour, 8, true)
        level2Assert(uncertain.start.minute, 56, true)
        assert.equal(uncertain.start.timeshift.value, 0)
        level2Assert(uncertain.end.year, 2001, true)
        level2Assert(uncertain.end.month, 2, true)
        level2Assert(uncertain.end.day, 28, true)
        level2Assert(uncertain.end.hour, 18, true)
        level2Assert(uncertain.end.minute, 20, true)
        assert.equal(uncertain.end.timeshift.value, 0)
      })

      test("year, month, day, and -5 hour time shift", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56?-05/2001-02-28T18:20?-05")
        level2Assert(uncertain.start.year, 1985, true)
        level2Assert(uncertain.start.month, 4, true)
        level2Assert(uncertain.start.day, 12, true)
        level2Assert(uncertain.start.hour, 8, true)
        level2Assert(uncertain.start.minute, 56, true)
        assert.equal(uncertain.start.timeshift.value, -5 * 60)
        level2Assert(uncertain.end.year, 2001, true)
        level2Assert(uncertain.end.month, 2, true)
        level2Assert(uncertain.end.day, 28, true)
        level2Assert(uncertain.end.hour, 18, true)
        level2Assert(uncertain.end.minute, 20, true)
        assert.equal(uncertain.end.timeshift.value, -5 * 60)
      })

      test("year, month, day, and +5:30 time shift", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56?+05:30/2001-02-28T18:20?+05:30")
        level2Assert(uncertain.start.year, 1985, true)
        level2Assert(uncertain.start.month, 4, true)
        level2Assert(uncertain.start.day, 12, true)
        level2Assert(uncertain.start.hour, 8, true)
        level2Assert(uncertain.start.minute, 56, true)
        assert.equal(uncertain.start.timeshift.value, 5 * 60 + 30)
        level2Assert(uncertain.end.year, 2001, true)
        level2Assert(uncertain.end.month, 2, true)
        level2Assert(uncertain.end.day, 28, true)
        level2Assert(uncertain.end.hour, 18, true)
        level2Assert(uncertain.end.minute, 20, true)
        assert.equal(uncertain.end.timeshift.value, 5 * 60 + 30)
      })

      test("year, month, day and time with seconds", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56:44?/2001-02-28T22:40:50?")
        level2Assert(uncertain.start.year, 1985, true)
        level2Assert(uncertain.start.month, 4, true)
        level2Assert(uncertain.start.day, 12, true)
        level2Assert(uncertain.start.hour, 8, true)
        level2Assert(uncertain.start.minute, 56, true)
        level2Assert(uncertain.start.second, 44, true)
        assert.equal(uncertain.start.timeshift, undefined)
        level2Assert(uncertain.end.year, 2001, true)
        level2Assert(uncertain.end.month, 2, true)
        level2Assert(uncertain.end.day, 28, true)
        level2Assert(uncertain.end.hour, 22, true)
        level2Assert(uncertain.end.minute, 40, true)
        level2Assert(uncertain.end.second, 50, true)
        assert.equal(uncertain.end.timeshift, undefined)
      })

      test("year, month, day and UTC time with seconds", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56:44?Z/2001-02-28T22:40:50?Z")
        level2Assert(uncertain.start.year, 1985, true)
        level2Assert(uncertain.start.month, 4, true)
        level2Assert(uncertain.start.day, 12, true)
        level2Assert(uncertain.start.hour, 8, true)
        level2Assert(uncertain.start.minute, 56, true)
        level2Assert(uncertain.start.second, 44, true)
        assert.equal(uncertain.start.timeshift.value, 0)
        level2Assert(uncertain.end.year, 2001, true)
        level2Assert(uncertain.end.month, 2, true)
        level2Assert(uncertain.end.day, 28, true)
        level2Assert(uncertain.end.hour, 22, true)
        level2Assert(uncertain.end.minute, 40, true)
        level2Assert(uncertain.end.second, 50, true)
        assert.equal(uncertain.end.timeshift.value, 0)
      })
    })

    describe("certain but approximate", () => {

      test("years", () => {
        const certain = Level2Interval.fromString("1985~/2001~")
        level2Assert(certain.start.year, 1985, false, true)
        level2Assert(certain.start.month, undefined)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001, false, true)
        level2Assert(certain.end.month, undefined)
        level2Assert(certain.end.day, undefined)
      })

      test("year and month", () => {
        const certain = Level2Interval.fromString("1985-04~/2001-02~")
        level2Assert(certain.start.year, 1985, false, true)
        level2Assert(certain.start.month, 4, false, true)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001, false, true)
        level2Assert(certain.end.month, 2, false, true)
        level2Assert(certain.end.day, undefined)
      })

      test("year, month and day", () => {
        const certain = Level2Interval.fromString("1985-04-12~/2001-02-28~")
        level2Assert(certain.start.year, 1985, false, true)
        level2Assert(certain.start.month, 4, false, true)
        level2Assert(certain.start.day, 12, false, true)
        level2Assert(certain.end.year, 2001, false, true)
        level2Assert(certain.end.month, 2, false, true)
        level2Assert(certain.end.day, 28, false, true)
      })

      test("year, month, day and local time", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56~/2001-02-28T18:20~")
        level2Assert(uncertain.start.year, 1985, false, true)
        level2Assert(uncertain.start.month, 4, false, true)
        level2Assert(uncertain.start.day, 12, false, true)
        level2Assert(uncertain.start.hour, 8, false, true)
        level2Assert(uncertain.start.minute, 56, false, true)
        assert.equal(uncertain.start.timeshift, undefined)
        level2Assert(uncertain.end.year, 2001, false, true)
        level2Assert(uncertain.end.month, 2, false, true)
        level2Assert(uncertain.end.day, 28, false, true)
        level2Assert(uncertain.end.hour, 18, false, true)
        level2Assert(uncertain.end.minute, 20, false, true)
        assert.equal(uncertain.end.timeshift, undefined)
      })

      test("year, month, day, and UTC time", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56~Z/2001-02-28T18:20~Z")
        level2Assert(uncertain.start.year, 1985, false, true)
        level2Assert(uncertain.start.month, 4, false, true)
        level2Assert(uncertain.start.day, 12, false, true)
        level2Assert(uncertain.start.hour, 8, false, true)
        level2Assert(uncertain.start.minute, 56, false, true)
        assert.equal(uncertain.start.timeshift.value, 0)
        level2Assert(uncertain.end.year, 2001, false, true)
        level2Assert(uncertain.end.month, 2, false, true)
        level2Assert(uncertain.end.day, 28, false, true)
        level2Assert(uncertain.end.hour, 18, false, true)
        level2Assert(uncertain.end.minute, 20, false, true)
        assert.equal(uncertain.end.timeshift.value, 0)
      })

      test("year, month, day, and -5 hour time shift", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56~-05/2001-02-28T18:20~-05")
        level2Assert(uncertain.start.year, 1985, false, true)
        level2Assert(uncertain.start.month, 4, false, true)
        level2Assert(uncertain.start.day, 12, false, true)
        level2Assert(uncertain.start.hour, 8, false, true)
        level2Assert(uncertain.start.minute, 56, false, true)
        assert.equal(uncertain.start.timeshift.value, -5 * 60)
        level2Assert(uncertain.end.year, 2001, false, true)
        level2Assert(uncertain.end.month, 2, false, true)
        level2Assert(uncertain.end.day, 28, false, true)
        level2Assert(uncertain.end.hour, 18, false, true)
        level2Assert(uncertain.end.minute, 20, false, true)
        assert.equal(uncertain.end.timeshift.value, -5 * 60)
      })

      test("year, month, day, and +5:30 time shift", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56~+05:30/2001-02-28T18:20~+05:30")
        level2Assert(uncertain.start.year, 1985, false, true)
        level2Assert(uncertain.start.month, 4, false, true)
        level2Assert(uncertain.start.day, 12, false, true)
        level2Assert(uncertain.start.hour, 8, false, true)
        level2Assert(uncertain.start.minute, 56, false, true)
        assert.equal(uncertain.start.timeshift.value, 5 * 60 + 30)
        level2Assert(uncertain.end.year, 2001, false, true)
        level2Assert(uncertain.end.month, 2, false, true)
        level2Assert(uncertain.end.day, 28, false, true)
        level2Assert(uncertain.end.hour, 18, false, true)
        level2Assert(uncertain.end.minute, 20, false, true)
        assert.equal(uncertain.end.timeshift.value, 5 * 60 + 30)
      })

      test("year, month, day and time with seconds", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56:44~/2001-02-28T22:40:50~")
        level2Assert(uncertain.start.year, 1985, false, true)
        level2Assert(uncertain.start.month, 4, false, true)
        level2Assert(uncertain.start.day, 12, false, true)
        level2Assert(uncertain.start.hour, 8, false, true)
        level2Assert(uncertain.start.minute, 56, false, true)
        level2Assert(uncertain.start.second, 44, false, true)
        assert.equal(uncertain.start.timeshift, undefined)
        level2Assert(uncertain.end.year, 2001, false, true)
        level2Assert(uncertain.end.month, 2, false, true)
        level2Assert(uncertain.end.day, 28, false, true)
        level2Assert(uncertain.end.hour, 22, false, true)
        level2Assert(uncertain.end.minute, 40, false, true)
        level2Assert(uncertain.end.second, 50, false, true)
        assert.equal(uncertain.end.timeshift, undefined)
      })

      test("year, month, day and UTC time with seconds", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56:44~Z/2001-02-28T22:40:50~Z")
        level2Assert(uncertain.start.year, 1985, false, true)
        level2Assert(uncertain.start.month, 4, false, true)
        level2Assert(uncertain.start.day, 12, false, true)
        level2Assert(uncertain.start.hour, 8, false, true)
        level2Assert(uncertain.start.minute, 56, false, true)
        level2Assert(uncertain.start.second, 44, false, true)
        assert.equal(uncertain.start.timeshift.value, 0)
        level2Assert(uncertain.end.year, 2001, false, true)
        level2Assert(uncertain.end.month, 2, false, true)
        level2Assert(uncertain.end.day, 28, false, true)
        level2Assert(uncertain.end.hour, 22, false, true)
        level2Assert(uncertain.end.minute, 40, false, true)
        level2Assert(uncertain.end.second, 50, false, true)
        assert.equal(uncertain.end.timeshift.value, 0)
      })
    })

    describe("uncertain and approximate", () => {

      test("years", () => {
        const certain = Level2Interval.fromString("1985%/2001%")
        level2Assert(certain.start.year, 1985, true, true)
        level2Assert(certain.start.month, undefined)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001, true, true)
        level2Assert(certain.end.month, undefined)
        level2Assert(certain.end.day, undefined)
      })

      test("year and month", () => {
        const certain = Level2Interval.fromString("1985-04%/2001-02%")
        level2Assert(certain.start.year, 1985, true, true)
        level2Assert(certain.start.month, 4, true, true)
        level2Assert(certain.start.day, undefined)
        level2Assert(certain.end.year, 2001, true, true)
        level2Assert(certain.end.month, 2, true, true)
        level2Assert(certain.end.day, undefined)
      })

      test("year, month and day", () => {
        const certain = Level2Interval.fromString("1985-04-12%/2001-02-28%")
        level2Assert(certain.start.year, 1985, true, true)
        level2Assert(certain.start.month, 4, true, true)
        level2Assert(certain.start.day, 12, true, true)
        level2Assert(certain.end.year, 2001, true, true)
        level2Assert(certain.end.month, 2, true, true)
        level2Assert(certain.end.day, 28, true, true)
      })

      test("year, month, day and local time", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56%/2001-02-28T18:20%")
        level2Assert(uncertain.start.year, 1985, true, true)
        level2Assert(uncertain.start.month, 4, true, true)
        level2Assert(uncertain.start.day, 12, true, true)
        level2Assert(uncertain.start.hour, 8, true, true)
        level2Assert(uncertain.start.minute, 56, true, true)
        assert.equal(uncertain.start.timeshift, undefined)
        level2Assert(uncertain.end.year, 2001, true, true)
        level2Assert(uncertain.end.month, 2, true, true)
        level2Assert(uncertain.end.day, 28, true, true)
        level2Assert(uncertain.end.hour, 18, true, true)
        level2Assert(uncertain.end.minute, 20, true, true)
        assert.equal(uncertain.end.timeshift, undefined)
      })

      test("year, month, day, and UTC time", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56%Z/2001-02-28T18:20%Z")
        level2Assert(uncertain.start.year, 1985, true, true)
        level2Assert(uncertain.start.month, 4, true, true)
        level2Assert(uncertain.start.day, 12, true, true)
        level2Assert(uncertain.start.hour, 8, true, true)
        level2Assert(uncertain.start.minute, 56, true, true)
        assert.equal(uncertain.start.timeshift.value, 0)
        level2Assert(uncertain.end.year, 2001, true, true)
        level2Assert(uncertain.end.month, 2, true, true)
        level2Assert(uncertain.end.day, 28, true, true)
        level2Assert(uncertain.end.hour, 18, true, true)
        level2Assert(uncertain.end.minute, 20, true, true)
        assert.equal(uncertain.end.timeshift.value, 0)
      })

      test("year, month, day, and -5 hour time shift", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56%-05/2001-02-28T18:20%-05")
        level2Assert(uncertain.start.year, 1985, true, true)
        level2Assert(uncertain.start.month, 4, true, true)
        level2Assert(uncertain.start.day, 12, true, true)
        level2Assert(uncertain.start.hour, 8, true, true)
        level2Assert(uncertain.start.minute, 56, true, true)
        assert.equal(uncertain.start.timeshift.value, -5 * 60)
        level2Assert(uncertain.end.year, 2001, true, true)
        level2Assert(uncertain.end.month, 2, true, true)
        level2Assert(uncertain.end.day, 28, true, true)
        level2Assert(uncertain.end.hour, 18, true, true)
        level2Assert(uncertain.end.minute, 20, true, true)
        assert.equal(uncertain.end.timeshift.value, -5 * 60)
      })

      test("year, month, day, and +5:30 time shift", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56%+05:30/2001-02-28T18:20%+05:30")
        level2Assert(uncertain.start.year, 1985, true, true)
        level2Assert(uncertain.start.month, 4, true, true)
        level2Assert(uncertain.start.day, 12, true, true)
        level2Assert(uncertain.start.hour, 8, true, true)
        level2Assert(uncertain.start.minute, 56, true, true)
        assert.equal(uncertain.start.timeshift.value, 5 * 60 + 30)
        level2Assert(uncertain.end.year, 2001, true, true)
        level2Assert(uncertain.end.month, 2, true, true)
        level2Assert(uncertain.end.day, 28, true, true)
        level2Assert(uncertain.end.hour, 18, true, true)
        level2Assert(uncertain.end.minute, 20, true, true)
        assert.equal(uncertain.end.timeshift.value, 5 * 60 + 30)
      })

      test("year, month, day and time with seconds", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56:44%/2001-02-28T22:40:50%")
        level2Assert(uncertain.start.year, 1985, true, true)
        level2Assert(uncertain.start.month, 4, true, true)
        level2Assert(uncertain.start.day, 12, true, true)
        level2Assert(uncertain.start.hour, 8, true, true)
        level2Assert(uncertain.start.minute, 56, true, true)
        level2Assert(uncertain.start.second, 44, true, true)
        assert.equal(uncertain.start.timeshift, undefined)
        level2Assert(uncertain.end.year, 2001, true, true)
        level2Assert(uncertain.end.month, 2, true, true)
        level2Assert(uncertain.end.day, 28, true, true)
        level2Assert(uncertain.end.hour, 22, true, true)
        level2Assert(uncertain.end.minute, 40, true, true)
        level2Assert(uncertain.end.second, 50, true, true)
        assert.equal(uncertain.end.timeshift, undefined)
      })

      test("year, month, day and UTC time with seconds", () => {
        const uncertain = Level2Interval.fromString("1985-04-12T08:56:44%Z/2001-02-28T22:40:50%Z")
        level2Assert(uncertain.start.year, 1985, true, true)
        level2Assert(uncertain.start.month, 4, true, true)
        level2Assert(uncertain.start.day, 12, true, true)
        level2Assert(uncertain.start.hour, 8, true, true)
        level2Assert(uncertain.start.minute, 56, true, true)
        level2Assert(uncertain.start.second, 44, true, true)
        assert.equal(uncertain.start.timeshift.value, 0)
        level2Assert(uncertain.end.year, 2001, true, true)
        level2Assert(uncertain.end.month, 2, true, true)
        level2Assert(uncertain.end.day, 28, true, true)
        level2Assert(uncertain.end.hour, 22, true, true)
        level2Assert(uncertain.end.minute, 40, true, true)
        level2Assert(uncertain.end.second, 50, true, true)
        assert.equal(uncertain.end.timeshift.value, 0)
      })
    })

    describe("extended", () => {

      describe("unknown", () => {

        test("unknown start", () => {
          const certain = Level2Interval.fromString("/2001")
          level2Assert(certain.start, null)
          level2Assert(certain.end.year, 2001)
          level2Assert(certain.end.month, undefined)
          level2Assert(certain.end.day, undefined)
        })

        test("unknown end", () => {
          const certain = Level2Interval.fromString("1985/")
          level2Assert(certain.start.year, 1985)
          level2Assert(certain.start.month, undefined)
          level2Assert(certain.start.day, undefined)
          level2Assert(certain.end, null)
        })
      })

      describe("open", () => {

        describe("open start", () => {

          test("unknown start up to year", () => {
            const certain = Level2Interval.fromString("../2001")
            level2Assert(certain.start, undefined)
            level2Assert(certain.end.year, 2001)
            level2Assert(certain.end.month, undefined)
            level2Assert(certain.end.day, undefined)
          })

          test("unknown start up to year and month", () => {
            const certain = Level2Interval.fromString("../2001-04")
            level2Assert(certain.start, undefined)
            level2Assert(certain.end.year, 2001)
            level2Assert(certain.end.month, 4)
            level2Assert(certain.end.day, undefined)
          })

          test("unknown start up to year, month and day", () => {
            const certain = Level2Interval.fromString("../2001-04-30")
            level2Assert(certain.start, undefined)
            level2Assert(certain.end.year, 2001)
            level2Assert(certain.end.month, 4)
            level2Assert(certain.end.day, 30)
          })
        })

        describe("open end", () => {

          test("from year to unknown end", () => {
            const certain = Level2Interval.fromString("1985/..")
            level2Assert(certain.start.year, 1985)
            level2Assert(certain.start.month, undefined)
            level2Assert(certain.start.day, undefined)
            level2Assert(certain.end, undefined)
          })

          test("from year month to unknown end", () => {
            const certain = Level2Interval.fromString("1985-04/..")
            level2Assert(certain.start.year, 1985)
            level2Assert(certain.start.month, 4)
            level2Assert(certain.start.day, undefined)
            level2Assert(certain.end, undefined)
          })

          test("from year month and day to unknown end", () => {
            const certain = Level2Interval.fromString("1985-04-30/..")
            level2Assert(certain.start.year, 1985)
            level2Assert(certain.start.month, 4)
            level2Assert(certain.start.day, 30)
            level2Assert(certain.end, undefined)
          })
        })
      })
    })
  })

  describe("durations", () => {

    describe("certain and precise", () => {

      test("years", () => {
        const minYears = 2
        const maxYears = 10
        const certain = Level2Interval.fromString(`P${minYears}Y/P${maxYears}Y`)
        assert.equal(certain.start.value, minYears * level0Calendar.year.duration)
        assert.equal(certain.start.toString(), `P${minYears}Y`)
        assert.equal(certain.end.value, maxYears * level0Calendar.year.duration)
        assert.equal(certain.end.toString(), `P${maxYears}Y`)
      })

      test("years and months", () => {
        const minYears = 2
        const minMonths = 3
        const maxYears = 10
        const maxMonths = 4
        const certain = Level2Interval.fromString(`P${minYears}Y${minMonths}MM/P${maxYears}Y${maxMonths}MM`)
        assert.equal(certain.start.toString(), `P${minYears}Y${minMonths}MM`)
        assert.equal(certain.start.value, (minYears * level0Calendar.year.duration) + (minMonths * level0Calendar.month.duration))
        assert.equal(certain.end.value, (maxYears * level0Calendar.year.duration) + (maxMonths * level0Calendar.month.duration))
        assert.equal(certain.end.toString(), `P${maxYears}Y${maxMonths}MM`)
      })
    })
  })
})
