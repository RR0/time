import { describe, test } from "node:test"
import assert, { fail } from "node:assert"

import { Level1Year } from "./Level1Year.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"
import { level1Calendar } from "../Level1Calendar.mjs"

describe("Level1Year", () => {

  const yearValue = 1985

  describe("parsing", () => {

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

  describe("programmatic", () => {

    describe("certain", () => {

      test("positive", () => {
        const positive = new Level1Year(yearValue)
        level1Assert(positive, 1985)
        assert.equal(positive.toString(), yearValue.toString())
        const positiveSpec = new Level1Year({ value: yearValue })
        level1Assert(positiveSpec, 1985)
        assert.equal(positiveSpec.toString(), yearValue.toString())
      })

      test("comparison", () => {
        const yearBefore = new Level1Year(yearValue)
        assert.equal(yearBefore.isEqual(yearBefore), true)
        const yearAfter = new Level1Year(2001)
        assert.equal(yearBefore.isEqual(yearAfter), false)
        assert.equal(yearBefore.isBefore(yearAfter), true)
        assert.equal(yearAfter.isBefore(yearBefore), false)
        assert.equal(yearBefore.isAfter(yearAfter), false)
        assert.equal(yearAfter.isAfter(yearBefore), true)
      })

      test("big", () => {
        const positive = new Level1Year(170000002, level1Calendar.yearExtended)
        level1Assert(positive, 170000002)
        const positiveSpec = new Level1Year({ value: 170000002 }, level1Calendar.yearExtended)
        level1Assert(positiveSpec, 170000002)
      })

      test("negative", () => {
        const negative = new Level1Year(-yearValue)
        level1Assert(negative, -yearValue)
        assert.equal(negative.toString(), -yearValue.toString())
      })

      test("big negative", () => {
        const negative = new Level1Year(-170000002, level1Calendar.yearExtended)
        level1Assert(negative, -170000002)
      })
    })

    describe("uncertain", () => {

      const uncertainYear = new Level1Year({ value: yearValue, uncertain: true })

      test("positive", () => {
        level1Assert(uncertainYear, yearValue, true)
        assert.equal(uncertainYear.toString(), yearValue.toString() + "?")
      })

      test("comparison", () => {
        const yearBefore = uncertainYear
        assert.equal(yearBefore.isEqual(yearBefore), false)
        const yearAfter = new Level1Year({ value: 2001, uncertain: true })
        assert.equal(yearBefore.isEqual(yearAfter), false)
        assert.equal(yearBefore.isBefore(yearAfter), false)
        assert.equal(yearAfter.isBefore(yearBefore), false)
        assert.equal(yearBefore.isAfter(yearAfter), false)
        assert.equal(yearAfter.isAfter(yearBefore), false)
      })

      test("negative", () => {
        const value = -yearValue
        const uncertainNegative = new Level1Year({ value: value, uncertain: true })
        level1Assert(uncertainNegative, value, true)
        assert.equal(uncertainNegative.toString(), value + "?")
      })
    })

    describe("approximate", () => {

      const approximateYear = new Level1Year({ value: yearValue, approximate: true })

      test("positive", () => {
        level1Assert(approximateYear, yearValue, false, true)
        assert.equal(approximateYear.toString(), yearValue + "~")
      })

      test("comparison", () => {
        const yearBefore = approximateYear
        assert.equal(yearBefore.isEqual(yearBefore), false)
        const yearAfter = new Level1Year({ value: 2001, approximate: true })
        assert.equal(yearBefore.isEqual(yearAfter), false)
        assert.equal(yearBefore.isBefore(yearAfter), false)
        assert.equal(yearAfter.isBefore(yearBefore), false)
        assert.equal(yearBefore.isAfter(yearAfter), false)
        assert.equal(yearAfter.isAfter(yearBefore), false)
      })

      test("negative", () => {
        const value = -yearValue
        const approximate = new Level1Year({ value, approximate: true })
        level1Assert(approximate, value, false, true)
        assert.equal(approximate.toString(), value + "~")
      })
    })

    describe("uncertain and approximate", () => {

      const uncertainAndApproximate = new Level1Year({ value: yearValue, uncertain: true, approximate: true })

      test("positive", () => {
        level1Assert(uncertainAndApproximate, yearValue, true, true)
        assert.equal(uncertainAndApproximate.toString(), yearValue + "%")
      })

      test("comparison", () => {
        const yearBefore = uncertainAndApproximate
        assert.equal(yearBefore.isEqual(yearBefore), false)
        const yearAfter = new Level1Year({ value: 2001, uncertain: true, approximate: true })
        assert.equal(yearBefore.isEqual(yearAfter), false)
        assert.equal(yearBefore.isBefore(yearAfter), false)
        assert.equal(yearAfter.isBefore(yearBefore), false)
        assert.equal(yearBefore.isAfter(yearAfter), false)
        assert.equal(yearAfter.isAfter(yearBefore), false)
      })

      test("negative", () => {
        const value = -yearValue
        const uncertainAndApproximate = new Level1Year({ value, uncertain: true, approximate: true })
        level1Assert(uncertainAndApproximate, value, true, true)
        assert.equal(uncertainAndApproximate.toString(), value + "%")
      })
    })
  })

  describe("prev", () => {

    test("valid", () => {
      const certainYear = new Level1Year(yearValue)
      const prev = certainYear.previous()
      assert.equal(prev.value, yearValue - 1)

      const bigYearValue = -170000002
      const certainYearExtended = new Level1Year(bigYearValue, level1Calendar.yearExtended)
      const prevExtended = certainYearExtended.previous()
      assert.equal(prevExtended.value, bigYearValue - 1)
    })

    test("overflow", () => {
      const certainYear = new Level1Year(level1Calendar.year.min)
      try {
        certainYear.previous()
        fail("Should not allow next year before min")
      } catch (e) {
        assert.equal(e.message, "year value must be >= -9999 and <= 9999, but was -10000")
      }
    })
  })

  describe("next", () => {

    test("valid", () => {
      const certainYear = new Level1Year(yearValue)
      const next = certainYear.next()
      assert.equal(next.value, yearValue + 1)

      const bigYearValue = 170000002
      const certainYearExtended = new Level1Year(bigYearValue, level1Calendar.yearExtended)
      const nextExtended = certainYearExtended.next()
      assert.equal(nextExtended.value, bigYearValue + 1)
    })

    test("overflow", () => {
      const certainYear = new Level1Year(level1Calendar.year.max)
      try {
        certainYear.next()
        fail("Should not allow next year after max")
      } catch (e) {
        assert.equal(e.message, "year value must be >= -9999 and <= 9999, but was 10000")
      }
    })
  })

})
