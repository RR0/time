import { describe, test } from "node:test"
import assert from "node:assert"
import { Level0Year } from "./Level0Year.mjs"
import { GregorianCalendar } from "./GregorianCalendar.mjs"

describe("Level0Year Unit", () => {

  test("leap", () => {
    assert.equal(GregorianCalendar.isLeap(1900), false)
    assert.equal(GregorianCalendar.isLeap(2000), true)
    assert.equal(GregorianCalendar.isLeap(new Level0Year(2000)), true)
    assert.equal(GregorianCalendar.isLeap(2008), true)
    assert.equal(GregorianCalendar.isLeap(2018), false)
    assert.equal(GregorianCalendar.isLeap(new Level0Year(2018)), false)
  })
})
