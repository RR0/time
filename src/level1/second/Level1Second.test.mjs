import { describe, test } from "node:test"
import { Level1Second } from "./Level1Second.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"

describe("Level1Second", () => {

  test("certain", () => {
    const second = Level1Second.fromString("44")
    level1Assert(second, 44)
  })

  test("uncertain", () => {
    const maybeSecond = Level1Second.fromString("44?")
    level1Assert(maybeSecond, 44, true)
  })

  test("approximate", () => {
    const aroundSecond = Level1Second.fromString("44~")
    level1Assert(aroundSecond, 44, false, true)
  })

  test("uncertain and approximate", () => {
    const maybeAroundSecond = Level1Second.fromString("44%")
    level1Assert(maybeAroundSecond, 44, true, true)
  })

  describe("unspecified", () => {

    test("month unit", () => {
      const unspecifiedMonthUnit = Level1Second.fromString("0X")
      level1Assert(unspecifiedMonthUnit.start, 0)
      level1Assert(unspecifiedMonthUnit.end, 9)
    })

    test("month decade and unit", () => {
      const unspecifiedMonthUnit = Level1Second.fromString("XX")
      level1Assert(unspecifiedMonthUnit.start, 0)
      level1Assert(unspecifiedMonthUnit.end, 59)
    })
  })
})
