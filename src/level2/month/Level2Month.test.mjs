import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2Month } from "./Level2Month.mjs"
import { Level2Months } from "./Level2Months.mjs"
import { level2Assert } from "../component/Level2TestUtil.mjs"

describe("Level2Month", () => {

  describe("certain", () => {

    test("gregorian month", () => {
      const certain = Level2Month.fromString("04")
      level2Assert(certain, 4)
    })

    test("invalid", () => {
      assert.throws(() => Level2Month.fromString("42"), { message: "month value must be >= 1 and <= 12, but was 42" })
    })

    test("predefined", () => {
      const spring = Level2Months.Semestral2
      assert.equal(spring.value, 41)
    })

    test("Spring", () => {
      const certain = Level2Month.fromString("21")
      level2Assert(certain, 21)
    })
  })

  test("uncertain", () => {
    const uncertain = Level2Month.fromString("04?")
    level2Assert(uncertain, 4, true)
    const uncertain1 = Level2Month.fromString("?04")
    level2Assert(uncertain1, 4, true, false, true)
  })

  test("approximate", () => {
    const approximate = Level2Month.fromString("04~")
    level2Assert(approximate, 4, false, true)
    const approximate1 = Level2Month.fromString("~04")
    level2Assert(approximate1, 4, false, true, false, true)
  })

  test("uncertain and approximate", () => {
    const uncertainAndApproximate = Level2Month.fromString("04%")
    level2Assert(uncertainAndApproximate, 4, true, true)
    const uncertainAndApproximate1 = Level2Month.fromString("%04")
    level2Assert(uncertainAndApproximate1, 4, true, true, true, true)
  })

  describe("unspecified", () => {

    test("month unit", () => {
      const unspecifiedMonthUnit = Level2Month.fromString("0X")
      level2Assert(unspecifiedMonthUnit.start, 1)
      level2Assert(unspecifiedMonthUnit.end, 9)
    })

    test("month decade and unit", () => {
      const unspecifiedMonthUnit = Level2Month.fromString("XX")
      level2Assert(unspecifiedMonthUnit.start, 1)
      level2Assert(unspecifiedMonthUnit.end, 12)
    })
  })

  describe("serialization", () => {

    test("toString()", () => {
      const str = "11"
      const month = Level2Month.fromString(str)
      assert.equal(month.toString(), str)
    })

    test("stringify()", () => {
      const str = "11"
      const month = Level2Month.fromString(str)
      const json = JSON.stringify(month)
      const spec = JSON.parse(json)
      const parsedMonth = new Level2Month(spec)
      assert.ok(parsedMonth.isEqual(month))
    })
  })
})
