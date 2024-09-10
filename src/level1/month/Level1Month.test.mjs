import { describe, test } from "node:test"
import assert from "node:assert"

import Level1Month from "./Level1Month.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"
import Level1Months from "./Level1Months.mjs"

describe("Level1Month", () => {

  describe("certain", () => {

    test("gregorian month", () => {
      const certain = Level1Month.fromString("04")
      level1Assert(certain, 4)
    })

    test("invalid", () => {
      try {
        Level1Month.fromString("13")
        assert.fail("Should not allow value above 12 and below 21")
      } catch (e) {
        assert.equal(e.message, "month value must be >= 1 and <= 12")
      }
    })

    test("predefined", () => {
      const spring = Level1Months.Spring
      assert.equal(spring.value, 21)
    })

    test("Spring", () => {
      const certain = Level1Month.fromString("21")
      level1Assert(certain, 21)
    })
  })

  test("uncertain", () => {
    const uncertain = Level1Month.fromString("04?")
    level1Assert(uncertain, 4, true)
  })

  test("approximate", () => {
    const approximate = Level1Month.fromString("04~")
    level1Assert(approximate, 4, false, true)
  })

  test("uncertain and approximate", () => {
    const uncertainAndApproximate = Level1Month.fromString("04%")
    level1Assert(uncertainAndApproximate, 4, true, true)
  })

  describe("unspecified", () => {

    test("month unit", () => {
      const unspecifiedMonthUnit = Level1Month.fromString("0X")
      level1Assert(unspecifiedMonthUnit.start, 1)
      level1Assert(unspecifiedMonthUnit.end, 9)
    })

    test("month decade and unit", () => {
      const unspecifiedMonthUnit = Level1Month.fromString("XX")
      level1Assert(unspecifiedMonthUnit.start, 1)
      level1Assert(unspecifiedMonthUnit.end, 12)
    })
  })
})
