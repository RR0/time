import { describe, test } from "node:test"
import assert from "node:assert"

import { Level2Day } from "./Level2Day.mjs"
import { level2Assert } from "../component/Level2TestUtil.mjs"

describe("Level2Day", () => {

  describe("parsing", () => {

    test("certain", () => {
      const zeroDay = Level2Day.fromString("01")
      level2Assert(zeroDay, 1)
      assert.equal(zeroDay.toString(), "01")
      const certainDay = Level2Day.fromString("30")
      level2Assert(certainDay, 30)
      assert.equal(certainDay.toString(), "30")
    })

    test("uncertain", () => {
      const certainDay = Level2Day.fromString("30?")
      level2Assert(certainDay, 30, true)
      const certainDay1 = Level2Day.fromString("?30")
      level2Assert(certainDay1, 30, true, false, true)
    })

    test("approximate", () => {
      const certainDay = Level2Day.fromString("30~")
      level2Assert(certainDay, 30, false, true)
      const certainDay1 = Level2Day.fromString("~30")
      level2Assert(certainDay1, 30, false, true, false, true)
    })

    test("uncertain and approximate", () => {
      const certainDay = Level2Day.fromString("30%")
      level2Assert(certainDay, 30, true, true)
      const certainDay1 = Level2Day.fromString("%30")
      level2Assert(certainDay1, 30, true, true, true, true)
    })

    describe("unspecified", () => {

      test("unit", () => {
        const certainDay = Level2Day.fromString("0X")
        level2Assert(certainDay.start, 1)
        level2Assert(certainDay.end, 9)
      })

      test("decade and unit", () => {
        const certainDay = Level2Day.fromString("XX")
        level2Assert(certainDay.start, 1)
        level2Assert(certainDay.end, 31)
      })
    })
  })
})
