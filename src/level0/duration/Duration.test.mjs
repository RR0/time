import { describe, test } from "node:test"
import assert from "node:assert"

import Duration from "./Duration.mjs"
import Level0Date from "../date/Level0Date.mjs"
import Level0Day from "../day/Level0Day.mjs"

describe("Duration", () => {

  test("new", () => {
    const threeSeconds = new Duration(3000)
    assert.equal(threeSeconds.millis, 3000)
    assert.equal(threeSeconds.toString(), "P3S")
  })

  test("between", () => {
    const beforeDate = Level0Date.fromString("1985-04-21")
    const twoDays = Duration.between(beforeDate, Level0Date.fromString("1985-04-23"))
    assert.equal(twoDays.millis, 2 * Level0Day.DURATION)
    /* const years = Duration.between(beforeDate, Level0Date.fromString("2001"))
    const expected = ((2001 - 1985) * Level0Year.DURATION) - (4 * 31 * Level0Day.DURATION) - (7 * Level0Day.DURATION)
    assert.equal(years.millis, expected) */
  })
})
