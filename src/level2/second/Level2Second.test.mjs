import { describe, test } from "node:test"
import { Level2Second } from "./Level2Second.mjs"
import { level2Assert } from "../component/Level2TestUtil.mjs"
import assert from "node:assert"

describe("Level2Second", () => {

  test("certain", () => {
    const second = Level2Second.fromString("44")
    level2Assert(second, 44)
  })

  test("uncertain", () => {
    const maybeSecond = Level2Second.fromString("44?")
    level2Assert(maybeSecond, 44, true)
    const maybeSecond1 = Level2Second.fromString("?44")
    level2Assert(maybeSecond1, 44, true, false, true)
  })

  test("approximate", () => {
    const aroundSecond = Level2Second.fromString("44~")
    level2Assert(aroundSecond, 44, false, true)
    const aroundSecond1 = Level2Second.fromString("~44")
    level2Assert(aroundSecond1, 44, false, true, false, true)
  })

  test("uncertain and approximate", () => {
    const maybeAroundSecond = Level2Second.fromString("44%")
    level2Assert(maybeAroundSecond, 44, true, true)
    const maybeAroundSecond1 = Level2Second.fromString("%44")
    level2Assert(maybeAroundSecond1, 44, true, true, true, true)
  })

  describe("unspecified", () => {

    test("month unit", () => {
      const unspecifiedMonthUnit = Level2Second.fromString("0X")
      level2Assert(unspecifiedMonthUnit.start, 0)
      level2Assert(unspecifiedMonthUnit.end, 9)
    })

    test("month decade and unit", () => {
      const unspecifiedMonthUnit = Level2Second.fromString("XX")
      level2Assert(unspecifiedMonthUnit.start, 0)
      level2Assert(unspecifiedMonthUnit.end, 59)
    })
  })

  describe("serialization", () => {

    test("toString()", () => {
      const str = "11"
      const second = Level2Second.fromString(str)
      assert.equal(second.toString(), str)
    })

    test("stringify()", () => {
      const str = "11"
      const second = Level2Second.fromString(str)
      const json = JSON.stringify(second)
      const spec = JSON.parse(json)
      const parsedSecond = new Level2Second(spec)
      assert.ok(parsedSecond.isEqual(second))
    })
  })
})
