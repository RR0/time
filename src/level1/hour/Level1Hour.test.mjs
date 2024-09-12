import { describe, test } from "node:test"
import { Level1Hour } from "./Level1Hour.mjs"
import { level1Assert } from "../component/Level1TestUtil.mjs"

describe("Level1Hour", () => {

  test("certain", () => {
    const hour = Level1Hour.fromString("08")
    level1Assert(hour, 8)
  })

  test("uncertain", () => {
    const maybeHour = Level1Hour.fromString("08?")
    level1Assert(maybeHour, 8, true)
  })

  test("approximate", () => {
    const aroundHour = Level1Hour.fromString("08~")
    level1Assert(aroundHour, 8, false, true)
  })

  test("uncertain and approximate", () => {
    const maybeAroundHour = Level1Hour.fromString("08%")
    level1Assert(maybeAroundHour, 8, true, true)
  })

  describe("unspecified", () => {

    test("unit", () => {
      const unspecifiedHourUnit = Level1Hour.fromString("0X")
      level1Assert(unspecifiedHourUnit.start, 0)
      level1Assert(unspecifiedHourUnit.end, 9)
    })

    test("decade and unit", () => {
      const unspecifiedHourUnit = Level1Hour.fromString("XX")
      level1Assert(unspecifiedHourUnit.start, 0)
      level1Assert(unspecifiedHourUnit.end, 23)
    })
  })
})
