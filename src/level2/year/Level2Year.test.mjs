import { describe, test } from "node:test"
import assert from "node:assert"

import { level2Assert } from "../component/Level2TestUtil.mjs"
import { Level2Year } from "./Level2Year.mjs"

describe("Level2Year", () => {

  describe("certain", () => {

    test("positive", () => {
      const positive = Level2Year.fromString("1985")
      level2Assert(positive, 1985)
    })

    test("negative", () => {
      const negative = Level2Year.fromString("-1985")
      level2Assert(negative, -1985)
    })

    describe("big", () => {

      test("positive", () => {
        const positive = Level2Year.fromString("Y170000002")
        level2Assert(positive, 170000002)
      })

      test("big negative", () => {
        const negative = Level2Year.fromString("Y-170000002")
        level2Assert(negative, -170000002)
      })
    })

    describe("exponential", () => {

      test("positive", () => {
        const negative = Level2Year.fromString("Y17E7")
        level2Assert(negative, 170000000)
      })

      test("exponential negative", () => {
        const negative = Level2Year.fromString("Y-17E7")
        level2Assert(negative, -170000000)
      })
    })

    describe("significant digits", () => {

      test("small", () => {
        const signifDecade = Level2Year.fromString("1950S2")
        level2Assert(signifDecade.start, 1900)
        assert.equal(signifDecade.estimate, 1950)
        level2Assert(signifDecade.end, 1999)
      })

      test("big", () => {
        const signifBig = Level2Year.fromString("Y171010000S3")
        level2Assert(signifBig.start, 171000000)
        assert.equal(signifBig.estimate, 171010000)
        level2Assert(signifBig.end, 171999999)
      })
    })
  })

  describe("uncertain", () => {

    const yearValue = 1985

    describe("parsing", () => {

      test("positive", () => {
        const uncertainPositiveFromString = Level2Year.fromString(yearValue + "?")
        level2Assert(uncertainPositiveFromString, yearValue, true)
        const uncertainPositive1 = Level2Year.fromString("?" + yearValue)
        level2Assert(uncertainPositive1, yearValue, true, false, true)
      })

      test("negative", () => {
        const uncertainNegative = Level2Year.fromString("-" + yearValue + "?")
        level2Assert(uncertainNegative, -yearValue, true)
        const uncertainNegative1 = Level2Year.fromString("?-" + yearValue)
        level2Assert(uncertainNegative1, -yearValue, true, false, true)
      })
    })

    describe("programmatic", () => {

      test("positive", () => {
        const uncertainPositiveFromString = new Level2Year({ value: yearValue, uncertain: true })
        level2Assert(uncertainPositiveFromString, yearValue, true)
        const uncertainPositive1 = new Level2Year({ value: yearValue, uncertainComponent: true })
        level2Assert(uncertainPositive1, yearValue, true, false, true)
      })

      test("negative", () => {
        const uncertainNegative = new Level2Year({ value: -yearValue, uncertain: true })
        level2Assert(uncertainNegative, -yearValue, true)
        const uncertainNegative1 = new Level2Year({ value: -yearValue, uncertainComponent: true })
        level2Assert(uncertainNegative1, -yearValue, true, false, true)
      })
    })
  })

  describe("approximate", () => {

    test("positive", () => {
      const approximate = Level2Year.fromString("1985~")
      level2Assert(approximate, 1985, false, true)
      const approximate1 = Level2Year.fromString("~1985")
      level2Assert(approximate1, 1985, false, true, false, true)
    })

    test("negative", () => {
      const approximate = Level2Year.fromString("-1985~")
      level2Assert(approximate, -1985, false, true)
      const approximate1 = Level2Year.fromString("~-1985")
      level2Assert(approximate1, -1985, false, true, false, true)
    })
  })

  describe("uncertain and approximate", () => {

    test("positive", () => {
      const uncertainAndApproximate = Level2Year.fromString("1985%")
      level2Assert(uncertainAndApproximate, 1985, true, true)
      const uncertainAndApproximate1 = Level2Year.fromString("%1985")
      level2Assert(uncertainAndApproximate1, 1985, true, true, true, true)
    })

    test("negative", () => {
      const uncertainAndApproximate = Level2Year.fromString("-1985%")
      level2Assert(uncertainAndApproximate, -1985, true, true)
      const uncertainAndApproximate1 = Level2Year.fromString("%-1985")
      level2Assert(uncertainAndApproximate1, -1985, true, true, true, true)
    })
  })

  describe("unspecified", () => {

    test("year unit", () => {
      const unspecifiedYearUnit = Level2Year.fromString("201X")
      level2Assert(unspecifiedYearUnit.start, 2010)
      level2Assert(unspecifiedYearUnit.end, 2019)
    })

    test("year decade and unit", () => {
      const unspecifiedYearUnit = Level2Year.fromString("20XX")
      level2Assert(unspecifiedYearUnit.start, 2000)
      level2Assert(unspecifiedYearUnit.end, 2099)
    })

    test("year century, decade and unit", () => {
      const unspecifiedYearUnit = Level2Year.fromString("2XXX")
      level2Assert(unspecifiedYearUnit.start, 2000)
      level2Assert(unspecifiedYearUnit.end, 2999)
    })

    test("all", () => {
      const unspecifiedYearUnit = Level2Year.fromString("XXXX")
      level2Assert(unspecifiedYearUnit.start, 0)
      level2Assert(unspecifiedYearUnit.end, 9999)
    })
  })
})
