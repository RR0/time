import { describe, test } from "node:test"
import Level2Hour from "./Level2Hour.mjs"
import { level2Assert } from "../component/Level2TestUtil.mjs"

describe("Level2Hour", () => {

  test("certain", () => {
    const hour = Level2Hour.fromString("08")
    level2Assert(hour, 8)
  })

  test("uncertain", () => {
    const maybeHour = Level2Hour.fromString("08?")
    level2Assert(maybeHour, 8, true)
    const maybeHour1 = Level2Hour.fromString("?08")
    level2Assert(maybeHour1, 8, true, false, true)
  })

  test("approximate", () => {
    const aroundHour = Level2Hour.fromString("08~")
    level2Assert(aroundHour, 8, false, true)
    const aroundHour1 = Level2Hour.fromString("~08")
    level2Assert(aroundHour1, 8, false, true, false, true)
  })

  test("uncertain and approximate", () => {
    const maybeAroundHour = Level2Hour.fromString("08%")
    level2Assert(maybeAroundHour, 8, true, true)
    const maybeAroundHour1 = Level2Hour.fromString("%08")
    level2Assert(maybeAroundHour1, 8, true, true, true, true)
  })

  describe("unspecified", () => {

    test("unit", () => {
      const unspecifiedHourUnit = Level2Hour.fromString("0X")
      level2Assert(unspecifiedHourUnit.start, 1)
      level2Assert(unspecifiedHourUnit.end, 9)
    })

    test("decade and unit", () => {
      const unspecifiedHourUnit = Level2Hour.fromString("XX")
      level2Assert(unspecifiedHourUnit.start, 1)
      level2Assert(unspecifiedHourUnit.end, 23)
    })
  })
})
