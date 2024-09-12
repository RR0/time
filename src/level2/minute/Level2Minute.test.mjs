import { describe, test } from "node:test"

import { level2Assert } from "../component/Level2TestUtil.mjs"

import { Level2Minute } from "./Level2Minute.mjs"

describe("Level2Minute", () => {

  test("certain", () => {
    const minute = Level2Minute.fromString("56")
    level2Assert(minute, 56)
  })

  test("uncertain", () => {
    const maybeMinute = Level2Minute.fromString("56?")
    level2Assert(maybeMinute, 56, true, false)
    const maybeMinute1 = Level2Minute.fromString("?56")
    level2Assert(maybeMinute1, 56, true, false, true)
  })

  test("approximate", () => {
    const aroundMinute = Level2Minute.fromString("56~")
    level2Assert(aroundMinute, 56, false, true)
    const aroundMinute1 = Level2Minute.fromString("~56")
    level2Assert(aroundMinute1, 56, false, true, false, true)
  })

  test("uncertain and approximate", () => {
    const maybeAroundMinute = Level2Minute.fromString("56%")
    level2Assert(maybeAroundMinute, 56, true, true)
    const maybeAroundMinute1 = Level2Minute.fromString("%56")
    level2Assert(maybeAroundMinute1, 56, true, true, true, true)
  })

  describe("unspecified", () => {

    test("month unit", () => {
      const unspecifiedMonthUnit = Level2Minute.fromString("0X")
      level2Assert(unspecifiedMonthUnit.start, 0)
      level2Assert(unspecifiedMonthUnit.end, 9)
    })

    test("month decade and unit", () => {
      const unspecifiedMonthUnit = Level2Minute.fromString("XX")
      level2Assert(unspecifiedMonthUnit.start, 0)
      level2Assert(unspecifiedMonthUnit.end, 59)
    })
  })
})
