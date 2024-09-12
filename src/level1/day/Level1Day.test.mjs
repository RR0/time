import { describe, test } from "node:test"
import { Level1Day } from "./Level1Day.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"

describe("Level1Day", () => {

  test("certain", () => {
    const certainDay = Level1Day.fromString("30")
    level1Assert(certainDay, 30)
  })

  test("uncertain", () => {
    const certainDay = Level1Day.fromString("30?")
    level1Assert(certainDay, 30, true)
  })

  test("approximate", () => {
    const certainDay = Level1Day.fromString("30~")
    level1Assert(certainDay, 30, false, true)
  })

  test("uncertain and approximate", () => {
    const certainDay = Level1Day.fromString("30%")
    level1Assert(certainDay, 30, true, true)
  })

  describe("unspecified", () => {

    test("unit", () => {
      const certainDay = Level1Day.fromString("0X")
      level1Assert(certainDay.start, 1)
      level1Assert(certainDay.end, 9)
    })

    test("decade and unit", () => {
      const certainDay = Level1Day.fromString("XX")
      level1Assert(certainDay.start, 1)
      level1Assert(certainDay.end, 31)
    })
  })
})
