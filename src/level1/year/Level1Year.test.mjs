import { describe, test } from "node:test"
import assert from "node:assert"

import Level1Year from "./Level1Year.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"

describe("Level1Year", () => {

  describe("certain", () => {

    test("positive", () => {
      const str = "1985"
      const positive = Level1Year.fromString(str)
      level1Assert(positive, 1985)
      assert.equal(positive.toString(), str)
    })

    test("comparison", () => {
      const yearBefore = Level1Year.fromString("1985")
      assert.equal(yearBefore.isEqual(yearBefore), true)
      const yearAfter = Level1Year.fromString("2001")
      assert.equal(yearBefore.isEqual(yearAfter), false)
      assert.equal(yearBefore.isBefore(yearAfter), true)
      assert.equal(yearAfter.isBefore(yearBefore), false)
      assert.equal(yearBefore.isAfter(yearAfter), false)
      assert.equal(yearAfter.isAfter(yearBefore), true)
    })

    test("big", () => {
      const positive = Level1Year.fromString("Y170000002")
      level1Assert(positive, 170000002)
    })

    test("negative", () => {
      const str = "-1985"
      const negative = Level1Year.fromString(str)
      level1Assert(negative, -1985)
      assert.equal(negative.toString(), str)
    })

    test("big negative", () => {
      const negative = Level1Year.fromString("Y-170000002")
      level1Assert(negative, -170000002)
    })
  })

  describe("uncertain", () => {

    test("positive", () => {
      const str = "1985?"
      const uncertainPositive = Level1Year.fromString(str)
      level1Assert(uncertainPositive, 1985, true)
      assert.equal(uncertainPositive.toString(), str)
    })

    test("comparison", () => {
      const yearBefore = Level1Year.fromString("1985?")
      assert.equal(yearBefore.isEqual(yearBefore), false)
      const yearAfter = Level1Year.fromString("2001?")
      assert.equal(yearBefore.isEqual(yearAfter), false)
      assert.equal(yearBefore.isBefore(yearAfter), false)
      assert.equal(yearAfter.isBefore(yearBefore), false)
      assert.equal(yearBefore.isAfter(yearAfter), false)
      assert.equal(yearAfter.isAfter(yearBefore), false)
    })

    test("negative", () => {
      const str = "-1985?"
      const uncertainNegative = Level1Year.fromString(str)
      level1Assert(uncertainNegative, -1985, true)
      assert.equal(uncertainNegative.toString(), str)
    })
  })

  describe("approximate", () => {

    test("positive", () => {
      const str = "1985~"
      const approximate = Level1Year.fromString(str)
      level1Assert(approximate, 1985, false, true)
      assert.equal(approximate.toString(), str)
    })

    test("comparison", () => {
      const yearBefore = Level1Year.fromString("1985~")
      assert.equal(yearBefore.isEqual(yearBefore), false)
      const yearAfter = Level1Year.fromString("2001~")
      assert.equal(yearBefore.isEqual(yearAfter), false)
      assert.equal(yearBefore.isBefore(yearAfter), false)
      assert.equal(yearAfter.isBefore(yearBefore), false)
      assert.equal(yearBefore.isAfter(yearAfter), false)
      assert.equal(yearAfter.isAfter(yearBefore), false)
    })

    test("negative", () => {
      const str = "-1985~"
      const approximate = Level1Year.fromString(str)
      level1Assert(approximate, -1985, false, true)
      assert.equal(approximate.toString(), str)
    })
  })

  describe("uncertain and approximate", () => {

    test("positive", () => {
      const str = "1985%"
      const uncertainAndApproximate = Level1Year.fromString(str)
      level1Assert(uncertainAndApproximate, 1985, true, true)
      assert.equal(uncertainAndApproximate.toString(), str)
    })

    test("comparison", () => {
      const yearBefore = Level1Year.fromString("1985%")
      assert.equal(yearBefore.isEqual(yearBefore), false)
      const yearAfter = Level1Year.fromString("2001%")
      assert.equal(yearBefore.isEqual(yearAfter), false)
      assert.equal(yearBefore.isBefore(yearAfter), false)
      assert.equal(yearAfter.isBefore(yearBefore), false)
      assert.equal(yearBefore.isAfter(yearAfter), false)
      assert.equal(yearAfter.isAfter(yearBefore), false)
    })

    test("negative", () => {
      const str = "-1985%"
      const uncertainAndApproximate = Level1Year.fromString(str)
      level1Assert(uncertainAndApproximate, -1985, true, true)
      assert.equal(uncertainAndApproximate.toString(), str)
    })
  })

  describe("unspecified", () => {

    test("year unit", () => {
      const str = "201X"
      const unspecifiedYearUnit = Level1Year.fromString(str)
      level1Assert(unspecifiedYearUnit.start, 2010)
      level1Assert(unspecifiedYearUnit.end, 2019)
    })

    test("year decade and unit", () => {
      const unspecifiedYearUnit = Level1Year.fromString("20XX")
      level1Assert(unspecifiedYearUnit.start, 2000)
      level1Assert(unspecifiedYearUnit.end, 2099)
    })

    test("year century, decade and unit", () => {
      const unspecifiedYearUnit = Level1Year.fromString("2XXX")
      level1Assert(unspecifiedYearUnit.start, 2000)
      level1Assert(unspecifiedYearUnit.end, 2999)
    })

    test("all", () => {
      const unspecifiedYearUnit = Level1Year.fromString("XXXX")
      level1Assert(unspecifiedYearUnit.start, 0)
      level1Assert(unspecifiedYearUnit.end, 9999)
    })
  })
})
